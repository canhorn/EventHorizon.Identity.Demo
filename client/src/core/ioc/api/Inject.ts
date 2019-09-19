import { Container } from "../model/Container";

export const Inject = <T>(bind: Function): T => Container.get<T>(bind);
