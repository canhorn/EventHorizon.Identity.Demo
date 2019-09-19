import { ICommandType } from "../api/ICommandType";

export class CommandType implements ICommandType {
    constructor(public key: string) {}
}
