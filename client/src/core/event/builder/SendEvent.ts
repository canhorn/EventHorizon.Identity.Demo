import { Inject } from "../../ioc";
import { IEventService } from "../api/IEventService";

export const sendEvent = (
    eventName: string,
    data: any,
    eventService: IEventService = Inject(IEventService)
): void =>
    eventService.publish({
        type: {
            key: eventName,
        },
        data,
    });
