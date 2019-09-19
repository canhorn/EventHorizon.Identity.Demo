import { IEvent } from "../api/IEvent";

export const createEvent = (event: string, data?: any): IEvent => ({
  type: {
    key: event
  },
  data
});
