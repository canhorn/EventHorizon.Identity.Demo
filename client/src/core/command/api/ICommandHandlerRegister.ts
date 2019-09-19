import { ICommandHandler } from "./ICommandHandler";

export abstract class ICommandHandlerRegister {
    public abstract register(handler: new () => ICommandHandler): void;
    public abstract dispose(): void;
}
