"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Array with Map functionality and more
 * @param {Array|Object} [data] Initiallisierungsdaten
 */
var AArray = /** @class */ (function () {
    function AArray(data) {
        this.length = 0; // Virtual defined in Proxy
        this.size = 0; // Virtual defined in Proxy
        this.keySet = [];
        this.valueSet = [];
        if (data)
            this.extend(data);
    }
    /**
     * Extend AArray
     * @param data
     */
    AArray.prototype.extend = function (data) {
        var i, _this = this;
        if (data) {
            if (data instanceof Array) {
                for (i = 0; i < data.length; i++)
                    this.set(i, data[i]);
            }
            else if (data instanceof Object) {
                for (i in data)
                    this.set(i, data[i]);
            }
            else if (data instanceof AArray || data instanceof Map) {
                this.forEach(function (val, key) {
                    _this.set(key, val);
                });
            }
        }
        return this;
    };
    /**
     * Delete item
     * @param key
     */
    AArray.prototype.delete = function (key) {
        var i = this.keySet.indexOf(key);
        if (i > -1) {
            this.keySet.splice(i, 1);
            this.valueSet.splice(i, 1);
        }
        return true;
    };
    /**
     * Alias for delete
     * @see delete
     * @param key
     */
    AArray.prototype.remove = function (key) { return this.delete(key); };
    /**
     * Generate key
     */
    AArray.prototype.nextKey = function () {
        var res = 0;
        for (var i = 0; i < this.keySet.length; i++) {
            if (!isNaN(this.keySet[i]) && this.keySet[i].indexOf('.') == -1 && res < parseInt(this.keySet[i]))
                res = parseInt(this.keySet[i]);
        }
        return res;
    };
    /**
     * Elemente durchlaufen
     * @depricated
     * @param {(val: any, key: any, arr: this)} callbackFn Function to execute for each entry in the map
     */
    AArray.prototype.each = function (callbackFn) {
        var res;
        for (var i = 0; i < this.keySet.length; i++) {
            res = callbackFn.call(this, this.keySet[i], this.valueSet[i]);
            if (typeof res == 'boolean' && !res)
                break;
        }
    };
    /**
     * The forEach() method executes a provided function once per each key/value pair in the AArray object, in insertion order.
     * @param {(val: any, key: any, arr: this)} callbackFn Function to execute for each entry in the map
     * @param [thisArg] Value to use as this when executing callback
     */
    AArray.prototype.forEach = function (callbackFn, thisArg) {
        var res;
        for (var i = 0; i < this.keySet.length; i++) {
            res = callbackFn.call((thisArg || this), this.valueSet[i], this.keySet[i], this);
            if (typeof res == 'boolean' && !res)
                break;
        }
    };
    /**
     * Get item with key
     * @return {{key: any, value: any}|undefined}
     */
    AArray.prototype.shiftObject = function () {
        var res = undefined;
        if (this.keySet.length > 0)
            res = { key: this.keySet.shift(), value: this.valueSet.shift() };
        return res;
    };
    /**
     * get first element
     * @return {any|undefined} The removed element from the array; undefined if the array is empty.
     */
    AArray.prototype.shift = function () {
        var res = undefined;
        if (this.keySet.length > 0) {
            this.keySet.shift();
            res = this.valueSet.shift();
        }
        return res;
    };
    /**
     * get last element
     * @return {any|undefined} The removed element from the array; undefined if the array is empty.
     */
    AArray.prototype.pop = function () {
        var res = undefined;
        if (this.keySet.length > 0) {
            this.keySet.pop();
            res = this.valueSet.pop();
        }
        return res;
    };
    /**
     * The slice() method returns a shallow copy of a portion of an array into a new array object
     * selected from start to end (end not included) where start and end represent the index of
     * items in that AArray. The original array will not be modified.
     * @param {number|undefined} start Zero-based index at which to start extraction.
     * @param {number|undefined} end The index of the first element to exclude from the returned array. slice extracts up to but not including end.
     */
    AArray.prototype.slice = function (start, end) {
        var res = new (require('../'))();
        var kset = this.keySet.slice(start, end);
        for (var i = 0; i < kset.length; i++) {
            res.set(kset[i], this.valueSet[i]);
        }
        return res;
    };
    /**
     * Sortieren nach Value
     * @param {(a:any, b:any)} sortFunc
     */
    AArray.prototype.sort = function (sortFunc) {
        var sortable = [], row;
        if (this.keySet.length > 0) {
            while (this.keySet.length > 0) {
                sortable.push([this.keySet.shift(), this.valueSet.shift()]);
            }
            if (!sortFunc)
                sortFunc = function (a, b) {
                    if (a[1] < b[1])
                        return -1;
                    if (a[1] > b[1])
                        return 1;
                    return 0;
                };
            sortable.sort(sortFunc);
            while (sortable.length > 0) {
                row = sortable.shift();
                if (row) {
                    this.keySet.push(row[0]);
                    this.valueSet.push(row[1]);
                }
            }
        }
    };
    /**
     * Nach Schlüssel sortieren
     * @param {(a:any, b:any)} sortFunc
     */
    AArray.prototype.ksort = function (sortFunc) {
        var sortable = [], row;
        if (this.keySet.length > 0) {
            if (!sortFunc)
                sortFunc = function (a, b) {
                    if (a[0] < b[0])
                        return -1;
                    if (a[0] > b[0])
                        return 1;
                    return 0;
                };
            while (this.keySet.length > 0) {
                sortable.push([this.keySet.shift(), this.valueSet.shift()]);
            }
            sortable.sort(sortFunc);
            while (sortable.length > 0) {
                row = sortable.shift();
                if (row) {
                    this.keySet.push(row[0]);
                    this.valueSet.push(row[1]);
                }
            }
        }
    };
    /**
     * reverse the AArray elements order
     */
    AArray.prototype.reverse = function () {
        this.keySet.reverse();
        this.valueSet.reverse();
    };
    /**
     * Schlüssel als ein Array holen
     */
    AArray.prototype.keys = function () { return __spreadArray([], this.keySet, true); };
    ;
    /**
     * The get() method returns a specified element from a AArray object
     * @param key
     */
    AArray.prototype.get = function (key) {
        var i = this.keySet.indexOf(key);
        if (i > -1)
            return this.valueSet[i];
        else
            return undefined;
    };
    /**
     * The set() method adds or updates an element with a specified key and a value to a AArray object.
     * @param key
     * @param value
     */
    AArray.prototype.set = function (key, value) {
        var i = this.keySet.indexOf(key);
        if (i > -1) {
            this.valueSet[i] = value;
        }
        else {
            var i = this.keySet.push(key) - 1;
            this.valueSet[i] = value;
        }
        return true;
    };
    /**
     * Add Element to Array
     * @param {*} value
     * @param {*} [key] Optional
     */
    AArray.prototype.push = function (value, key) {
        if (typeof key == 'undefined' || key === null)
            key = this.nextKey();
        this.set(key, value);
        return key;
    };
    /**
     * Werte als ein Array holen
     */
    AArray.prototype.values = function () { return __spreadArray([], this.valueSet, true); };
    AArray.prototype.toString = function () {
        var res = [];
        this.forEach(function (val, key) {
            if (val && typeof val == 'object')
                val = val + '';
            res.push({ key: key, value: val });
        });
        return JSON.stringify(res);
    };
    return AArray;
}());
module.exports = function (data) {
    return new Proxy(new AArray(data), {
        deleteProperty: function (target, name) {
            return target.delete(name);
        },
        ownKeys: function (target) {
            return target.keys();
        },
        getOwnPropertyDescriptor: function (target, name) {
            var res = {
                enumerable: true,
                configurable: true,
            };
            // @ts-ignore
            if (AArray.prototype[name])
                res.enumerable = false;
            return res;
        },
        get: function (target, name, receiver) {
            if (name == 'length' || name == 'size')
                return target.keySet.length;
            // @ts-ignore
            if (AArray.prototype[name])
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // @ts-ignore
                    return target[name].apply(target, args);
                };
            return target.get(name);
        },
        set: function (target, name, value, receiver) {
            return target.set(name, value);
        }
    });
};
//# sourceMappingURL=aarray.js.map