import { ICommandResult } from "./ICommandResult";

export abstract class ICommandListener {
    public abstract function: (data: any) => ICommandResult<any>;
    public abstract context: object;
}
