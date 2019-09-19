import { isObjectNotDefined } from "../../object/ObjectCheck";
import objectMerge from "../../object/ObjectMerge";

const STATE: {
    totalPublishedEvents: number;
    trackedPublishedEventTypes: {
        [key: string]: number;
    };
    publishedEventsPerSecond: number;
    publishedEventTypes: {
        [key: string]: number;
    };
} = {
    totalPublishedEvents: 0,
    trackedPublishedEventTypes: {},
    publishedEventsPerSecond: 0,
    publishedEventTypes: {},
};

let lastUpdate = Date.now();

export const trackEventPublish = (eventType: string) => {
    const { trackedPublishedEventTypes } = STATE;
    if (isObjectNotDefined(trackedPublishedEventTypes[eventType])) {
        trackedPublishedEventTypes[eventType] = 0;
    }
    trackedPublishedEventTypes[eventType] += 1;

    objectMerge(STATE, {
        totalPublishedEvents: STATE.totalPublishedEvents + 1,
        trackedPublishedEventTypes,
    });
};
export const publishedEventsPerSecond = (): number =>
    STATE.publishedEventsPerSecond;
export const publishedEventTypes = (): { [key: string]: number } =>
    STATE.publishedEventTypes;

export const captureEventTrackingPerSecond = (): void => {
    const thisUpdate = Date.now();
    const lastCheckUpdate = thisUpdate - lastUpdate;
    if (lastCheckUpdate >= 1000) {
        const { totalPublishedEvents, trackedPublishedEventTypes } = STATE;
        objectMerge(STATE, {
            publishedEventsPerSecond:
                totalPublishedEvents / (lastCheckUpdate / 1000),
            totalPublishedEvents: 0,
            publishedEventTypes: Object.assign({}, trackedPublishedEventTypes),
            trackedPublishedEventTypes: {},
        });
        lastUpdate = thisUpdate;
    }
};
