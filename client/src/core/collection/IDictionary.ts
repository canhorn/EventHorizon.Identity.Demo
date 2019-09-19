// Used internally by dictionary
export interface IDictionaryPair<K, V> {
    key: K;
    value: V;
}

export interface IDictionary<K, V> {
    getValue(key: K): V | undefined;
    setValue(key: K, value: V): V;
    remove(key: K): V | undefined;
    forEach(callback: (key: K, value: V) => any): void;
    containsKey(key: K): boolean;
    clear(): void;
    values(): V[];
}
