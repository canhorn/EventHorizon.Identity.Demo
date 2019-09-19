import { ICommandType } from "./ICommandType";

export interface ICommand<D, R> {
    type: ICommandType;
    data?: D;
}
