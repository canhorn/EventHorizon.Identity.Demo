import { Provider } from "../api/Provider";
import { Container } from "../model/Container";

export const createProviderService = (bind: Function, provider: Provider) =>
  Container.bind(bind).provider(provider);
