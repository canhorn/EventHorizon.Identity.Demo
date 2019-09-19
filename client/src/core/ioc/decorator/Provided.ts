import { IoCContainer } from "../container/IoCContainer";
import { Provider } from "../api/Provider";

/**
 * A decorator to tell the container that this class should instantiated by the given [[Provider]].
 * For example:
 *
 * ```
 * @ Provided({get: () => { return new PersonDAO(); }})
 * class PersonDAO {
 * }
 * ```
 *
 * Is the same that use:
 *
 * ```
 * Container.bind(PersonDAO).provider({get: () => { return new PersonDAO(); }});
 * ```
 * @param provider The provider that will handle instantiations for this class.
 */
export function Provided(provider: Provider) {
  return function(target: Function) {
    IoCContainer.bind(target).provider(provider);
  };
}
