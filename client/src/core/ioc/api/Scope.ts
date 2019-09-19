import { Provider } from "./Provider";
import { InjectorHanlder } from "../container/IoCContainer";

/**
 * Class responsible to handle the scope of the instances created by the Container
 */
export abstract class Scope {
  /**
   * A reference to the LocalScope. Local Scope return a new instance for each dependency resolution requested.
   * This is the default scope.
   */
  // tslint:disable-next-line:variable-name
  public static Local: Scope;
  /**
   * A reference to the SingletonScope. Singleton Scope return the same instance for any
   * dependency resolution requested.
   */
  // tslint:disable-next-line:variable-name
  public static Singleton: Scope;

  /**
   * Method called when the Container needs to resolve a dependency. It should return the instance that will
   * be returned by the Container.
   * @param provider The provider associated with the current bind. Used to create new instances when necessary.
   * @param source The source type of this bind.
   * @return the resolved instance.
   */
  public abstract resolve(provider: Provider, source: Function): any;

  /**
   * Called by the IoC Container when some configuration is changed on the Container binding.
   * @param source The source type that has its configuration changed.
   */
  public reset(source: Function) {
    // Do nothing
  }
}

/**
 * Default [[Scope]] that always create a new instace for any dependency resolution request
 */
class LocalScope extends Scope {
  public resolve(provider: Provider, source: Function) {
    return provider.get();
  }
}

Scope.Local = new LocalScope();

/**
 * Scope that create only a single instace to handle all dependency resolution requests.
 */
class SingletonScope extends Scope {
  private static instances: Map<Function, any> = new Map<Function, any>();

  public resolve(provider: Provider, source: any) {
    let instance: any = SingletonScope.instances.get(source);
    if (!instance) {
      source.__block_Instantiation = false;
      instance = provider.get();
      source.__block_Instantiation = true;
      SingletonScope.instances.set(source, instance);
    }
    return instance;
  }

  public reset(source: Function) {
    SingletonScope.instances.delete(
      InjectorHanlder.getConstructorFromType(source)
    );
  }
}

Scope.Singleton = new SingletonScope();
