import { Inject } from "../../ioc";
import { IQueryHandler } from "../api/IQueryHandler";
import { IQueryHandlerRegister } from "../api/IQueryHandlerRegister";
import { IQueryService } from "../api/IQueryService";

export class StandardQueryHandlerRegister implements IQueryHandlerRegister {
    private static HANDLERS: IQueryHandler[] = [];

    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}

    public register(handlerTypeConstructor: new () => IQueryHandler): void {
        const handler = new handlerTypeConstructor();
        this._queryService.addListener(handler.type, handler.handle, handler);
        StandardQueryHandlerRegister.HANDLERS.push(handler);
    }
    public dispose(): void {
        StandardQueryHandlerRegister.HANDLERS.forEach(handler => {
            this._queryService.removeListener(
                handler.type,
                handler.handle,
                handler
            );
        });
        StandardQueryHandlerRegister.HANDLERS = [];
    }
}
