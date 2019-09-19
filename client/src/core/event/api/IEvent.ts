import { IEventType } from "./IEventType";

export abstract class IEvent {
  public abstract type: IEventType;
  public abstract data?: any;
}
