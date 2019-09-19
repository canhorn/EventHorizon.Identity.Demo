import { Container } from "../model/Container";
import { Scope } from "../api/Scope";

export const createSingletonServiceFactory = (
  bind: Function,
  provider: Function
) =>
  Container.bind(bind)
    .provider({ get: () => provider() })
    .scope(Scope.Singleton);
