import { Container } from "../model/Container";

export const createService = (bind: Function, to: Object) =>
  Container.bind(bind).to(to);
