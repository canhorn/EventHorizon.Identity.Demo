import { ICommand } from "./ICommand";
import { ICommandResult } from "./ICommandResult";
import { ICommandType } from "./ICommandType";

export abstract class ICommandService {
    public abstract send<D, R>(event: ICommand<D, R>): ICommandResult<R>;
    public abstract addListener(
        commandType: ICommandType,
        commandListener: (data: any) => ICommandResult<any>,
        context: any
    ): ICommandService;
    public abstract removeListener(
        commandType: ICommandType,
        commandListener: (data: any) => ICommandResult<any>,
        context: any
    ): ICommandService;
}
