import { IEventHandler } from "./IEventHandler";

export abstract class IEventHandlerRegister {
  public abstract register(handler: new () => IEventHandler): void;
  public abstract dispose(): void;
}
