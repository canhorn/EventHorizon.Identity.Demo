import { autobind } from "../../autobind";
import { ILogger } from "../../logger";
import { createLogger } from "../../logger/create/CreateLogger";
import { getPublishedEventList } from "../published/PublishedEventTracker";

export const checkForEventsPerSecond = () => {
    new EventPerSecondChecker();
};

class EventPerSecondChecker {
    private lastCheckCount = getPublishedEventList().length;

    constructor(
        private readonly _logger: ILogger = createLogger(
            "EventPreSecondChecker"
        )
    ) {
        // setInterval(this.checkEventsPerSecond, 1000);
        // setInterval(this.analyzeEventsPerSecond, 5000);
    }

    @autobind
    public checkEventsPerSecond() {
        this._logger.debug(
            `Events per Second: ${getPublishedEventList().length -
                this.lastCheckCount}`
        );

        this.lastCheckCount = getPublishedEventList().length;
    }
    @autobind
    public analyzeEventsPerSecond() {
        this._logger.debug(
            "Events per Second Data",
            getPublishedEventList()
                .slice(
                    getPublishedEventList().length -
                        (getPublishedEventList().length - this.lastCheckCount)
                )
                .map(a => a.type.key)
        );
    }
}
