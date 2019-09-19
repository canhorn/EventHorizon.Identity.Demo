export const objectMergeNew = <T, S>(target: T, source: S): T =>
    Object.assign({}, target, source);
