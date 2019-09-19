export const throttle = (
  fn: Function,
  threshold: number,
  scope?: any
): ((...argList: any[]) => void) => {
  threshold || (threshold = 250);
  let last = +new Date();
  return function(this: any) {
    const context = scope || this,
      now = +new Date(),
      args = arguments;
    if (last && now > last + threshold) {
      fn.apply(context, args);
      last = now;
    }
  };
};
