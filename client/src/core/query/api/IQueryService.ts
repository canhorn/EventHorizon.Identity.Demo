import { IQuery } from "./IQuery";
import { IQueryResult } from "./IQueryResult";
export abstract class IQueryService {
    public abstract query<D, R>(event: IQuery<D, R>): IQueryResult<R>;
    public abstract addListener(
        queryType: string,
        queryListener: (data?: any) => IQueryResult<any>,
        context: any
    ): IQueryService;
    public abstract removeListener(
        queryType: string,
        queryListener: (data?: any) => IQueryResult<any>,
        context: any
    ): IQueryService;
}
