import { Container } from "../model/Container";
import { Provider } from "../api/Provider";
import { Scope } from "../api/Scope";

export const createSingletonProviderService = (
  bind: Function,
  provider: Provider
) =>
  Container.bind(bind)
    .provider(provider)
    .scope(Scope.Singleton);
