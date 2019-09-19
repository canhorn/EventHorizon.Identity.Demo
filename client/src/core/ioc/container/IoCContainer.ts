import { Scope } from "../api/Scope";
import { Config } from "./Config";
import { Provider } from "../api/Provider";

/**
 * Internal implementation of IoC Container.
 */
export class IoCContainer {
  public static isBound(source: Function): boolean {
    checkType(source);
    const baseSource = InjectorHanlder.getConstructorFromType(source);
    const config: ConfigImpl | undefined = IoCContainer.bindings.get(
      baseSource
    );
    return !!config;
  }

  public static bind(source: Function): Config {
    checkType(source);
    const baseSource = InjectorHanlder.getConstructorFromType(source);
    let config: ConfigImpl | undefined = IoCContainer.bindings.get(baseSource);
    if (!config) {
      config = new ConfigImpl(baseSource);
      IoCContainer.bindings.set(baseSource, config);
    }
    return config;
  }

  public static get(source: Function) {
    const config: ConfigImpl = IoCContainer.bind(source) as ConfigImpl;
    if (!config.iocprovider) {
      config.to(config.source as FunctionConstructor);
    }
    return config.getInstance();
  }

  public static getType(source: Function): Function {
    checkType(source);
    const baseSource = InjectorHanlder.getConstructorFromType(source);
    const config: ConfigImpl | undefined = IoCContainer.bindings.get(
      baseSource
    );
    if (!config) {
      throw new TypeError(
        `The type ${source.name} hasn't been registered with the IOC Container`
      );
    }
    return config.targetSource || config.source;
  }

  public static injectProperty(
    target: any,
    key: string,
    propertyType: Function
  ) {
    const propKey = `__${key}`;
    Object.defineProperty(target, key, {
      enumerable: true,
      get() {
        return this[propKey]
          ? this[propKey]
          : (this[propKey] = IoCContainer.get(propertyType));
      },
      set(newValue) {
        this[propKey] = newValue;
      }
    });
  }

  public static assertInstantiable(target: any) {
    if (target.__block_Instantiation) {
      throw new TypeError(
        "Can not instantiate Singleton class. " +
          "Ask Container for it, using Container.get"
      );
    }
  }
  private static bindings: Map<FunctionConstructor, ConfigImpl> = new Map<
    FunctionConstructor,
    ConfigImpl
  >();
}

/**
 * Utility function to validate type
 */
function checkType(source: Object) {
  if (!source) {
    throw new TypeError(
      "Invalid type requested to IoC " + "container. Type is not defined."
    );
  }
}

export class ConfigImpl implements Config {
  public source: Function;
  public targetSource!: Function;
  public iocprovider!: Provider;
  public iocscope?: Scope;
  public decoratedConstructor!: FunctionConstructor;
  public paramTypes!: any[];

  constructor(source: Function) {
    this.source = source;
  }

  public to(target: FunctionConstructor) {
    checkType(target);
    const targetSource = InjectorHanlder.getConstructorFromType(target);
    this.targetSource = targetSource;
    if (this.source === targetSource) {
      const configImpl = this;
      this.iocprovider = {
        get: () => {
          const params = configImpl.getParameters();
          if (configImpl.decoratedConstructor) {
            return params
              ? new configImpl.decoratedConstructor(...params)
              : new configImpl.decoratedConstructor();
          }
          return params ? new target(...params) : new target();
        }
      };
    } else {
      this.iocprovider = {
        get: () => {
          return IoCContainer.get(target);
        }
      };
    }
    if (this.iocscope) {
      this.iocscope.reset(this.source);
    }
    return this;
  }

  public provider(provider: Provider) {
    this.iocprovider = provider;
    if (this.iocscope) {
      this.iocscope.reset(this.source);
    }
    return this;
  }

  public scope(scope: Scope) {
    this.iocscope = scope;
    if (scope === Scope.Singleton) {
      (this as any).source.__block_Instantiation = true;
      scope.reset(this.source);
    } else if ((this as any).source.__block_Instantiation) {
      delete (this as any).source.__block_Instantiation;
    }
    return this;
  }

  public withParams(...paramTypes: any[]) {
    this.paramTypes = paramTypes;
    return this;
  }

  public toConstructor(newConstructor: FunctionConstructor) {
    this.decoratedConstructor = newConstructor;
    return this;
  }

  public getInstance() {
    if (!this.iocscope) {
      this.scope(Scope.Local);
    }
    if (!this.iocscope) {
      throw new Error("IocScope was not set correctly.");
    }
    return this.iocscope.resolve(this.iocprovider, this.source);
  }

  private getParameters() {
    if (this.paramTypes) {
      return this.paramTypes.map(paramType => IoCContainer.get(paramType));
    }
    return null;
  }
}

/**
 * Utility class to handle injection behavior on class decorations.
 */
export class InjectorHanlder {
  public static constructorNameRegEx = /function (\w*)/;

  public static decorateConstructor(target: Function) {
    let newConstructor: any;
    // tslint:disable-next-line:class-name
    newConstructor = class ioc_wrapper extends (target as FunctionConstructor) {
      constructor(...args: any[]) {
        super(...args);
        IoCContainer.assertInstantiable(target);
      }
    };
    newConstructor.__parent = target;
    return newConstructor;
  }

  public static hasNamedConstructor(source: Function): boolean {
    if (source.name) {
      return source.name !== "ioc_wrapper";
    } else {
      try {
        const constructorName = source.prototype.constructor
          .toString()
          .match(this.constructorNameRegEx)[1];
        return constructorName && constructorName !== "ioc_wrapper";
      } catch {
        // make linter happy
      }

      return false;
    }
  }

  public static getConstructorFromType(target: Function): FunctionConstructor {
    let typeConstructor: any = target;
    if (this.hasNamedConstructor(typeConstructor)) {
      return typeConstructor as FunctionConstructor;
    }
    typeConstructor = typeConstructor.__parent;
    while (typeConstructor) {
      if (this.hasNamedConstructor(typeConstructor)) {
        return typeConstructor as FunctionConstructor;
      }
      typeConstructor = typeConstructor.__parent;
    }
    throw TypeError(
      "Can not identify the base Type for requested target " + target.toString()
    );
  }
}
