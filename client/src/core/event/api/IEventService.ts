import { IEvent } from "./IEvent";
import { IEventType } from "./IEventType";

export abstract class IEventService {
    public abstract publish(event: IEvent): void;
    public abstract on(
        type: IEventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService;
    public abstract off(
        type: IEventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService;
}
