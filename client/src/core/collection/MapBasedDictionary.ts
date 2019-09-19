import { IDictionary, IDictionaryPair } from "./IDictionary";

export class MapBasedDictionary<K, V> implements IDictionary<K, V> {
    /**
     * This method will return a Dictionary created from the jsonObj passed in.
     *
     * @static
     * @template V1
     * @param {*} jsonObj
     * @returns {Dictionary<string, V1>}
     *
     * @memberOf Dictionary
     */
    public static fromJSON<V1>(jsonObj: any): IDictionary<string, V1> {
        const dic = new MapBasedDictionary<string, V1>();
        const jsonData = jsonObj.toJSON ? jsonObj.toJSON() : jsonObj;

        for (const i in jsonData) {
            dic.setValue(i, jsonData[i]);
        }
        return dic;
    }

    /**
     * Object holding the key-value pairs.
     * @type {Object}
     * @private
     */
    private map: Map<K, V>;
    // : [key: K] will not work since indices can only by strings in javascript and typescript enforces this.

    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values; each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to unique
     * strings must be provided. Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    constructor() {
        this.map = new Map<K, V>();
    }

    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    public getValue(key: K): V | undefined {
        return this.map.get(key);
    }

    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    public setValue(key: K, value: V): V {
        this.map.set(key, value);
        return value;
    }

    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    public remove(key: K): V | undefined {
        const value = this.map.get(key);
        this.map.delete(key);
        return value;
    }

    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    public keys(): K[] {
        return Array.from(this.map.keys());
    }

    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    public values(): V[] {
        return Array.from(this.map.values());
    }

    public concat(...values: Array<IDictionaryPair<K, V>>): IDictionary<K, V> {
        values.forEach(value => this.setValue(value.key, value.value));
        return this;
    }

    /**
     * Executes the provided function once for each key-value pair
     * present in this dictionary.
     * @param {function(Object,Object):*} callback function to execute, it is
     * invoked with two arguments: key and value. To break the iteration you can
     * optionally return false.
     */
    public forEach(callback: (key: K, value: V) => any): void {
        this.map.forEach((value, key) => {
            const ret = callback(key, value);
        });
    }

    /**
     * Returns true if this dictionary contains a mapping for the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary contains a mapping for the
     * specified key.
     */
    public containsKey(key: K): boolean {
        return this.map.has(key);
    }

    /**
     * Removes all mappings from this dictionary.
     * @this {collections.Dictionary}
     */
    public clear() {
        this.map.clear();
    }

    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    public size(): number {
        return this.map.size;
    }

    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    public isEmpty(): boolean {
        return this.map.size <= 0;
    }

    /**
     * This is the override for JSON.stringify to display a JSON representation of a Dictionary.
     *
     * @returns {*}
     *
     * @memberOf Dictionary
     */
    public toJSON(): any {
        const jsonObj: any = {};

        this.forEach((key: any, value) => {
            jsonObj[key] = value;
        });

        return jsonObj;
    }

    public first() {
        return this.getValue(this.keys()[0]);
    }
}
