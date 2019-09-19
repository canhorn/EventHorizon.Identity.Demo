import { IEventType } from "./IEventType";

export abstract class IEventHandler {
  public abstract type: IEventType;
  public abstract handle: (data: any) => void;
}
