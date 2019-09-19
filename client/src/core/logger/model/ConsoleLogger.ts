import dateFormat from "dateformat";
import { Configuration } from "../../configuration/Configuration";
import { throttleMethod } from "../../throttle";
import { ILogger } from "../api/ILogger";
import { ILogMessage } from "../api/ILogMessage";

export const LOGGED_MESSAGE_LIST: ILogMessage[] = [];
(window as any).LOGGED_MESSAGES = LOGGED_MESSAGE_LIST;

export class ConsoleLogger implements ILogger {
    constructor(
        private readonly _name: string,
        private readonly _isDebug: boolean = Configuration.getConfig<boolean>(
            "DEBUG_ENABLED"
        ) || true,
        private readonly _isTrace: boolean = Configuration.getConfig<boolean>(
            "TRACE_ENABLED"
        ) || false
    ) {}

    public log(message: string, data: any = "") {
        const messageToLog = `[${this.formattedNowDate()}] [INFO]: [${
            this._name
        }] \r\n\t${message}`;
        this.throttledLog(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "INFO",
            message: messageToLog,
            data,
        });
    }
    public debug(message: string, data: any = "[no-data]") {
        this.formattedNowDate();
        if (!this._isDebug) {
            return;
        }
        const messageToLog = `[${this.formattedNowDate()}] [DEBUG]: [${
            this._name
        }] \r\n\t${message}`;
        // tslint:disable-next-line: no-console
        console.info(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "DEBUG",
            message: messageToLog,
            data,
        });
    }
    public error(message: string, data: any = "") {
        const messageToLog = `[${this.formattedNowDate()}] [ERROR]: [${
            this._name
        }] \r\n\t${message}`;
        // tslint:disable-next-line: no-console
        console.error(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "ERROR",
            message: messageToLog,
            data,
        });
    }
    public trace(message: string, data: any = "") {
        if (this._isTrace) {
            const messageToLog = `[${this.formattedNowDate()}] [TRACE]: [${
                this._name
            }] \r\n\t${message}`;
            this.throttledTrace(messageToLog, data);
            LOGGED_MESSAGE_LIST.push({
                level: "TRACE",
                message: messageToLog,
                data,
            });
        }
    }
    @throttleMethod(1000)
    private throttledLog(messageToLog: string, data: any = "") {
        // tslint:disable-next-line: no-console
        console.log(messageToLog, data);
    }
    private throttledTrace(messageToLog: string, data: any = "") {
        // tslint:disable-next-line: no-console
        console.log(messageToLog, data);
        // tslint:disable-next-line: no-console
        console.trace();
    }

    /**
     * 01-14-2019 21:22:45.0123456-06:00
     */
    private formattedNowDate() {
        const now = new Date();
        const formattedOffset = dateFormat(now, "o");
        return (
            dateFormat(now, "mm-dd-yyyy HH:MM:ss.l") +
            formattedOffset.slice(0, 3) +
            ":" +
            formattedOffset.slice(3)
        );
    }
}
