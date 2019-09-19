import { debugEnabled } from "../../debugging/DebuggingActions";
import { ILogger } from "../../logger";
import { createLogger } from "../../logger/create/CreateLogger";
import { IEvent } from "../api/IEvent";
import { IEventListener } from "../api/IEventListener";
import { IEventService } from "../api/IEventService";
import { IEventType } from "../api/IEventType";
import { trackEventPublish } from "../tracking/EventTrackingState";

export class StandardEventService implements IEventService {
    private _eventListenerList: Map<string, IEventListener[]> = new Map<
        string,
        IEventListener[]
    >();

    constructor(
        private readonly _logger: ILogger = createLogger("StandardEventService")
    ) {}

    public publish(event: IEvent): void {
        const eventListeners =
            this._eventListenerList.get(event.type.key) || [];
        const len = eventListeners.length;
        for (let index = 0; index < len; index++) {
            const listener = eventListeners[index];
            try {
                listener.function.call(listener.context, event.data);
                trackEventPublish(event.type.key);
            } catch (ex) {
                this._logger.error("Listener failed", ex);
            }
        }
    }

    public on(
        type: IEventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService {
        const listenerList = this._eventListenerList.get(type.key) || [];
        listenerList.push({
            function: eventListener,
            context,
        });
        this._eventListenerList.set(type.key, listenerList);

        return this;
    }

    public off(
        type: IEventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService {
        this._eventListenerList.set(
            type.key,
            (this._eventListenerList.get(type.key) || []).filter(
                listener =>
                    listener.function !== eventListener ||
                    listener.context !== context
            )
        );
        return this;
    }
    private _eventTrackingFunction: (type: string) => void = () => {
        // noop
    };
}
