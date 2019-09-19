import { Inject } from "../../ioc";
import { ICommandHandler } from "../api/ICommandHandler";
import { ICommandHandlerRegister } from "../api/ICommandHandlerRegister";
import { ICommandService } from "../api/ICommandService";

export class CommandHandlerRegister implements ICommandHandlerRegister {
    private static HANDLERS: ICommandHandler[] = [];

    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}

    public register(handler: new () => ICommandHandler): void {
        const commandHandler = new handler();
        this._commandService.addListener(
            commandHandler.type,
            commandHandler.handle,
            commandHandler
        );
        CommandHandlerRegister.HANDLERS.push(commandHandler);
    }
    public dispose(): void {
        CommandHandlerRegister.HANDLERS.forEach(handler => {
            this._commandService.removeListener(
                handler.type,
                handler.handle,
                handler
            );
        });
        CommandHandlerRegister.HANDLERS = [];
    }
}
