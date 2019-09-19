import { Scope } from "../api/Scope";
import { Container } from "../model/Container";

export const createSingletonService = (bind: Function, to: Object) =>
  Container.bind(bind)
    .to(to)
    .scope(Scope.Singleton);
