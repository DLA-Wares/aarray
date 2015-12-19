/**
 * Objekt mit Möglichkeiten von einem Array
 * @param {Array|Object} [data] Initiallisierungsdaten
 * @constructor
 */
function AArray(data) {
    if (data) AArray.extend(data);
};

AArray.prototype.exend = function(data) {
    if (data instanceof Array) {
        for(var i=0; i < data.length; i++) this[i] = data[i];
    } 
    else if (data instanceof Array) {
        for (var i in data) this[i] = data[i];
    }
    
    return this;
};

/**
 * Elemente durchlaufen
 * @param {Function({*}, {*})} eachFunction
 */
AArray.prototype.each = function(eachFunction) {
    var keys = this.keys(), key, res;
    while(keys.length > 0) {
        key = keys.shift();
        res = eachFunction.call(this, key, this[key]);
        if (typeof res == 'boolean' && !res) break;
    }
};

/**
 * Ein item mit incl. Key holen
 * @return {{key: {*}, value: {*}}
 */
AArray.prototype.shiftObject = function() {
    var keys = this.keys(), res = null, key = null;
    
    if (keys && keys.length > 0) {
        key = keys.shift();
        if (typeof this[key] != 'undefined') {
            res = {
                key: key,
                value: this[key]
            };
            delete this[key];
        }
    }
    return res;
}

/**
 * Erstes element entfernen
 * @return {*}
 */
AArray.prototype.shift = function() {
    var res = this.shiftObject();
    return res ? res['value'] : null;
};

/**
 * Anzal der Elemente ermitteln
 */
AArray.prototype.length = function() {
    return this.keys().length;
};

/**
 * Sortieren nach Value
 * @param {Function} [func] Vergleichsfunktion
 */
AArray.prototype.sort = function(sortFunc) {
    var sortable = [], keys = this.keys(), key, row;
    if (keys.length > 0) {
	    while(keys.length > 0) {
		    key = keys.shift();
		    sortable.push([key, this[key]]);
		    delete this[key];
	    }

	    sortable.sort(function(a, b) {
		    if (sortFunc instanceof Function) {
			    return sortFunc(a[1], b[1]);
		    }
		    else return a[1] - b[1];
	    });

	    while(sortable.length > 0) {
		    row = sortable.shift();
		    this[row[0]] = row[1];
	    }
    }
};

/**
 * Nach Schlüssel sortieren
 * @param {Function} [func] Vergleichsfunktion
 */
AArray.prototype.ksort = function(func) {
    //if (!func || !(func instanceof Function)) func = ;
    var keysSorted = this.keys().sort(func);
    var key, value;
    while(keysSorted.length > 0) {
        key = keysSorted.shift();
        value = this[key];
        delete this[key];
        this[key] = value;
    }
};

/**
 * Sortierung umkehren
 * @param {Function} [func] Vergleichsfunktion
 */
AArray.prototype.reverse = function() {
    var keys = this.keys(), key, value;
    while(keys.length > 0) {
        key = keys.pop();
        value = this[key];
        delete this[key];
        this[key] = value;
    }
};

/**
 * Schlüssel als ein Array holen
 */
AArray.prototype.keys = function() { return Object.keys(this); };

/**
 * Schlüssel als ein Array holen
 */
AArray.prototype.values = function() { 
    var o = [], keys = this.keys();
    while(keys.length > 0) {
        var i = keys.shift();
        o.push(this[i]);
    }
    return o;
};

module.exports = AArray;
