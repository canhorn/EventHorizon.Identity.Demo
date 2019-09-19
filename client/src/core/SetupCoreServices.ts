import { ICommandHandlerRegister, ICommandService } from "./command";
import { CommandHandlerRegister } from "./command/model/CommandHandlerRegister";
import { CommandService } from "./command/model/CommandService";
import { IEventHandlerRegister, IEventService } from "./event";
import { StandardEventHandlerRegister } from "./event/model/StandardEventHandlerRegister";
import { StandardEventService } from "./event/model/StandardEventService";
import { IGuid } from "./guid/IGuid";
import { GuidImpl } from "./guid/impl/GuidImpl";
import { setDefaultResourceBundle } from "./i18n/I18nServices";
import { IIndexPool } from "./index/IIndexPool";
import { IndexPool } from "./index/impl/IndexPool";
import { createSingletonService } from "./ioc";
import { createSingletonServiceFactory } from "./ioc/create/CreateSingletonServiceFactory";
import { ILoggerFactory } from "./logger";
import { StandardLoggerFactory } from "./logger/factory/StandardLoggerFactory";
import { IQueryHandlerRegister, IQueryService } from "./query";
import { StandardQueryHandlerRegister } from "./query/model/StandardQueryHandlerRegister";
import { StandardQueryService } from "./query/model/StandardQueryService";
import { ISystemWindow } from "./window";
import { SystemWindow } from "./window/model/SystemWindow";

let initialized: boolean = false;

export const setupCoreServices = () => {
    if (initialized) {
        return;
    }

    createSingletonServiceFactory(
        ISystemWindow,
        () => new SystemWindow(window)
    );
    createSingletonService(ILoggerFactory, StandardLoggerFactory);
    createSingletonService(IIndexPool, IndexPool);
    createSingletonService(IGuid, GuidImpl);
    createSingletonService(IEventService, StandardEventService);
    createSingletonService(ICommandService, CommandService);
    createSingletonService(IQueryService, StandardQueryService);

    createSingletonService(IEventHandlerRegister, StandardEventHandlerRegister);
    createSingletonService(ICommandHandlerRegister, CommandHandlerRegister);
    createSingletonService(IQueryHandlerRegister, StandardQueryHandlerRegister);

    setDefaultResourceBundle();

    initialized = true;
};
