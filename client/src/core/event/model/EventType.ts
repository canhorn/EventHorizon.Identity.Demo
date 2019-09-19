import { IEventType } from "../api/IEventType";

export class EventType implements IEventType {
  constructor(public key: string) {}
}
