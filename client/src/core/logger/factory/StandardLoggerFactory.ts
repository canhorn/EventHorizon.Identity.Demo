import { ILogger } from "../api/ILogger";
import { ILoggerFactory } from "../api/ILoggerFactory";
import { ConsoleLogger } from "../model/ConsoleLogger";

export class StandardLoggerFactory implements ILoggerFactory {
  public create(loggerName: string): ILogger {
    return new ConsoleLogger(loggerName);
  }
}
