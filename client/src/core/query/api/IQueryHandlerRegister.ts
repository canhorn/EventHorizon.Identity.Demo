import { IQueryHandler } from "./IQueryHandler";
export abstract class IQueryHandlerRegister {
    public abstract register(handler: new () => IQueryHandler): void;
    public abstract dispose(): void;
}
