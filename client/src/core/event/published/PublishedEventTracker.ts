import { IEvent } from "../api/IEvent";

const PUBLISHED_EVENT_LIST: IEvent[] = [];
(window as any).PUBLISHED_EVENT_LIST = PUBLISHED_EVENT_LIST;

export const addPublishedEvent = (event: IEvent): void => {
  PUBLISHED_EVENT_LIST.push(event);
};
export const getPublishedEventList = (): IEvent[] => PUBLISHED_EVENT_LIST;
