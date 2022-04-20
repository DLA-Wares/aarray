/**
 * Array with Map functionality and more
 * @param {Array|Object} [data] Initiallisierungsdaten
 */
declare class AArray {
    length: number;
    size: number;
    keySet: any[];
    valueSet: any[];
    constructor(data?: any[] | any | AArray | Map<any, any>);
    /**
     * Extend AArray
     * @param data
     */
    extend(data: any[] | any | AArray | Map<any, any>): this;
    /**
     * Delete item
     * @param key
     */
    delete(key: string | number | any): boolean;
    /**
     * Alias for delete
     * @see delete
     * @param key
     */
    remove(key: string | number | any): boolean;
    /**
     * Generate key
     */
    nextKey(): number;
    /**
     * Elemente durchlaufen
     * @depricated
     * @param {(val: any, key: any, arr: this)} callbackFn Function to execute for each entry in the map
     */
    each(callbackFn: (val: any, key: any) => boolean | void): void;
    /**
     * The forEach() method executes a provided function once per each key/value pair in the AArray object, in insertion order.
     * @param {(val: any, key: any, arr: this)} callbackFn Function to execute for each entry in the map
     * @param [thisArg] Value to use as this when executing callback
     */
    forEach(callbackFn: (val: any, key: any, arr: this) => boolean | void, thisArg?: any): void;
    /**
     * Get item with key
     * @return {{key: any, value: any}|undefined}
     */
    shiftObject(): {
        key: any;
        value: any;
    } | undefined;
    /**
     * get first element
     * @return {any|undefined} The removed element from the array; undefined if the array is empty.
     */
    shift(): any | undefined;
    /**
     * get last element
     * @return {any|undefined} The removed element from the array; undefined if the array is empty.
     */
    pop(): any | undefined;
    /**
     * The slice() method returns a shallow copy of a portion of an array into a new array object
     * selected from start to end (end not included) where start and end represent the index of
     * items in that AArray. The original array will not be modified.
     * @param {number|undefined} start Zero-based index at which to start extraction.
     * @param {number|undefined} end The index of the first element to exclude from the returned array. slice extracts up to but not including end.
     */
    slice(start?: number, end?: number): AArray;
    /**
     * Sortieren nach Value
     * @param {(a:any, b:any)} sortFunc
     */
    sort(sortFunc?: (a: any, b: any) => number): void;
    /**
     * Nach Schlüssel sortieren
     * @param {(a:any, b:any)} sortFunc
     */
    ksort(sortFunc?: (a: any, b: any) => number): void;
    /**
     * reverse the AArray elements order
     */
    reverse(): void;
    /**
     * Schlüssel als ein Array holen
     */
    keys(): any[];
    /**
     * The get() method returns a specified element from a AArray object
     * @param key
     */
    get(key: any): any | undefined;
    /**
     * The set() method adds or updates an element with a specified key and a value to a AArray object.
     * @param key
     * @param value
     */
    set(key: any, value: any): boolean;
    /**
     * Add Element to Array
     * @param {*} value
     * @param {*} [key] Optional
     */
    push(value: any, key?: any): any;
    /**
     * Werte als ein Array holen
     */
    values(): any[];
    toString(): string;
}
declare const _default: (data: any[] | any | AArray | Map<any, any>) => AArray;
export = _default;
