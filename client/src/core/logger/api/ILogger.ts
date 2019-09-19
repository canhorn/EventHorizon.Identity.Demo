export abstract class ILogger {
  public abstract log(message: string, data?: any): void;
  public abstract debug(message: string, data?: any): void;
  public abstract error(message: string, data?: any): void;
  public abstract trace(message: string, data?: any): void;
}
