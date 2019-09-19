import { ILoggerFactory } from "../api/ILoggerFactory";
import { Inject } from "../../ioc";
import { ILogger } from "../api/ILogger";

export const createLogger = (
  loggerName: string,
  loggerFactory: ILoggerFactory = Inject(ILoggerFactory)
): ILogger => loggerFactory.create(loggerName);
