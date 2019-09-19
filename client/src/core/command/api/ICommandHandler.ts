import { ICommandResult } from "./ICommandResult";
import { ICommandType } from "./ICommandType";

export abstract class ICommandHandler {
    public abstract type: ICommandType;
    public abstract handle: (data: any) => ICommandResult<any>;
}
