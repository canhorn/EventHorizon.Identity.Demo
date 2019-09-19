import { throttle } from "../impl/Throttle";

export function throttleMethod(threshold: number) {
  return function(
    this: any,
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = throttle(function(this: any) {
      return method.apply(this, arguments);
    }, threshold);
  };
}
