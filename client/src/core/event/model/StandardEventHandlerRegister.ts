import { Inject } from "../../ioc";
import { IEventHandlerRegister } from "../api/IEventHandlerRegister";
import { IEventHandler } from "../api/IEventHandler";
import { IEventService } from "../api/IEventService";

export class StandardEventHandlerRegister implements IEventHandlerRegister {
  private static HANDLERS: IEventHandler[] = [];

  constructor(
    private readonly _eventService: IEventService = Inject(IEventService)
  ) {}

  public register(handler: new () => IEventHandler): void {
    const eventHandler = new handler();
    this._eventService.on(eventHandler.type, eventHandler.handle, eventHandler);
    StandardEventHandlerRegister.HANDLERS.push(eventHandler);
  }
  public dispose(): void {
    StandardEventHandlerRegister.HANDLERS.forEach(handler => {
      this._eventService.off(handler.type, handler.handle, handler);
    });
    StandardEventHandlerRegister.HANDLERS = [];
  }
}
