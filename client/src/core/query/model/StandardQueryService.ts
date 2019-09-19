import { Dictionary } from "../../collection/Dictionary";
import { IDictionary } from "../../collection/IDictionary";
import { Inject } from "../../ioc/api/Inject";
import { createLogger, ILogger } from "../../logger";
import { ISystemWindow } from "../../window";
import { IQuery } from "../api/IQuery";
import { IQueryListener } from "../api/IQueryListener";
import { IQueryResult } from "../api/IQueryResult";
import { IQueryService } from "../api/IQueryService";

const SENT_QUERY_LIST: Array<IQuery<any, any>> = [];

export class StandardQueryService implements IQueryService {
    private static QUERY_LISTENER_LIST: IDictionary<
        string,
        IQueryListener
    > = new Dictionary<string, IQueryListener>();

    constructor(
        private readonly _logger: ILogger = createLogger(
            "StandardQueryService"
        ),
        window: ISystemWindow = Inject(ISystemWindow)
    ) {
        window.setProp("SENT_QUERY_LIST", SENT_QUERY_LIST);
    }

    public query<D, R>(query: IQuery<D, R>): IQueryResult<R> {
        SENT_QUERY_LIST.push(query);
        const listener = StandardQueryService.QUERY_LISTENER_LIST.getValue(
            query.type
        );
        if (listener) {
            return listener.function.call<object, [any], {}>(
                listener.context,
                query.data
            ) as IQueryResult<R>;
        }
        this._logger.error("Query listener was not found.", query);
        return {
            success: false,
            result: (undefined as unknown) as R,
            errorCode: "query_listener_not_found",
        };
    }

    public addListener(
        type: string,
        listenerFunction: <T>(data: any) => IQueryResult<T>,
        context: any
    ): IQueryService {
        StandardQueryService.QUERY_LISTENER_LIST.setValue(type, {
            function: listenerFunction,
            context,
        });

        return this;
    }

    public removeListener(
        type: string,
        listenerFunction: <T>(data: any) => IQueryResult<T>,
        context: any
    ): IQueryService {
        const listener = StandardQueryService.QUERY_LISTENER_LIST.getValue(
            type
        );
        if (
            listener &&
            listener.function === listenerFunction &&
            listener.context === context
        ) {
            StandardQueryService.QUERY_LISTENER_LIST.remove(type);
        }
        return this;
    }
}
