import {
  InjectorHanlder,
  IoCContainer,
  ConfigImpl
} from "../container/IoCContainer";

/**
 * A decorator to tell the container that this class should its instantiation always handled by the Container.
 *
 * An AutoWired class will have its constructor overriden to always delegate its instantiation to the IoC Container.
 * So, if you write:
 *
 * ```
 * @ AutoWired
 * class PersonService {
 *   @ Inject
 *   personDAO: PersonDAO;
 * }
 * ```
 *
 * Any PersonService instance will be created by the IoC Container, even when a direct call to its constructor is called:
 *
 * ```
 * let PersonService = new PersonService(); // will be returned by Container, and all internal dependencies resolved.
 * ```
 *
 * It is the same that use:
 *
 * ```
 * Container.bind(PersonService);
 * let personService: PersonService = Container.get(PersonService);
 * ```
 */
export function AutoWired(target: Function) {
  // <T extends {new(...args:any[]):{}}>(target:T) {
  const newConstructor = InjectorHanlder.decorateConstructor(target);
  const config: ConfigImpl = IoCContainer.bind(target) as ConfigImpl;
  config.toConstructor(newConstructor);
  return newConstructor;
}
