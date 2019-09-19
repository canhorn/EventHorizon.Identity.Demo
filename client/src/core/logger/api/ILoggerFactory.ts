import { ILogger } from "./ILogger";

export abstract class ILoggerFactory {
  public abstract create(loggerName: string): ILogger;
}
