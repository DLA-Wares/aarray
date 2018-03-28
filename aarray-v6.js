/**
 * Objekt mit Möglichkeiten von einem Array
 * @param {Array|Object} [data] Initiallisierungsdaten
 * @constructor
 */
function AArray(data) {
	this.length = 0;
	this.keySet = [];
	this.valueSet = [];

	this.extend = function(data) {
		if (data instanceof Array) for(var i=0; i < data.length; i++) this.set(i, data[i]);
		else if (data && data instanceof Object) {
			for(i in data) this.set(i, data[i]);
		}
		return this;
	};

	this.remove = function(key) { return delete this[key]; };

	this.nextKey = function() {
		var res = 0;
		for(var i = 0; i < this.keySet.length; i++) {
			if (!isNaN(this.keySet[i]) && this.keySet[i].indexOf('.') == -1 && res < parseInt(this.keySet[i])) res = parseInt(this.keySet[i]);
		}
		return res;
	};

	/**
	 * Add Element to Array
	 * @param {*} value
	 * @param {*} [key] Optional
	 */
	this.push = function(value, key) {
		if (typeof key == 'undefined' || key === null) key = this.nextKey();
		this[key] = value;
		return key;
	};

	/**
	 * Elemente durchlaufen
	 * @depricated
	 * @param {Function({*}, {*})} eachFunction
	 */
	this.each = function(eachFunction) {
		var res;
		for(var i=0; i < this.keySet.length; i++) {
			res = eachFunction.call(this, this.keySet[i], this.valueSet[i]);
			if (typeof res == 'boolean' && !res) break;
		}
	};

	/**
	 * Elemente durchlaufen
	 * @param {Function({*}, {*})} eachFunction
	 */
	this.forEach = function(eachFunction) {
		var res;
		for(var i=0; i < this.keySet.length; i++) {
			res = eachFunction.call(this, this.valueSet[i], this.keySet[i]);
			if (typeof res == 'boolean' && !res) break;
		}
	};

	/**
	 * Ein item mit incl. Key holen
	 * @return {{key: {*}, value: {*}}
	 */
	this.shiftObject = function() {
		if (this.keySet.length > 0) return { key: this.keySet.shift(), value: this.valueSet.shift() };
		return null;
	};

	/**
	 * Erstes element entfernen
	 * @return {*}
	 */
	this.shift = function() {
		if (this.keySet.length > 0) {
			this.keySet.shift();
			return this.valueSet.shift();
		}
		return  null;
	};

	/**
	 * Anzal der Elemente ermitteln
	 */
	this.length = function() {
		return this.length;
	};

	/**
	 * Sortieren nach Value
	 * @param {Function} [func] Vergleichsfunktion
	 */
	this.sort = function(sortFunc) {
		var sortable = [], row;
		if (this.keySet.length > 0) {
			while(this.keySet.length > 0) {
				sortable.push([this.keySet.shift(), this.valueSet.shift()]);
			}

			sortable.sort(function(a, b) {
				if (sortFunc instanceof Function) return sortFunc(a[1], b[1]);
				else return a[1] - b[1];
			});

			while(sortable.length > 0) {
				row = sortable.shift();
				this.keySet.push(row[0]);
				this.valueSet.push(row[1]);
			}
		}
	};

	/**
	 * Nach Schlüssel sortieren
	 * @param {Function} [func] Vergleichsfunktion
	 */
	this.ksort = function(sortFunc) {
		var sortable = [], row;
		if (this.keySet.length > 0) {
			while(this.keySet.length > 0) {
				sortable.push([this.keySet.shift(), this.valueSet.shift()]);
			}

			sortable.sort(function(a, b) {
				if (sortFunc instanceof Function) return sortFunc(a[0], b[0]);
				else return a[0] - b[0];
			});

			while(sortable.length > 0) {
				row = sortable.shift();
				this.keySet.push(row[0]);
				this.valueSet.push(row[1]);
			}
		}
	};

	/**
	 * Sortierung umkehren
	 * @param {Function} [func] Vergleichsfunktion
	 */
	this.reverse = function() {
		this.keySet.reverse();
		this.valueSet.reverse();
	};

	/**
	 * Schlüssel als ein Array holen
	 */
	this.keys = function() { return this.keySet; };

	this.get = function(name) {
		if (name == 'toString') return this[name];
		else if (name == 'constructor') return this[name];
		var i = this.keySet.indexOf(name);
		if (i > -1) return this.valueSet[i];
		else return this[name];
	};

	this.set = function(name, value) {
		var i = this.keySet.indexOf(name);
		if (i > -1) {
			this.valueSet[i] = value;
		}
		else {
			var i = this.keySet.push(name)-1;
			this.valueSet[i] = value;
		}
		// define property
		this[name] = null; // Platzhalter damit man mit Objekte wie gewohnt arbeiten kann ;-)
		this.length = this.keySet.length;
		return true;
	};

	/**
	 * Werte als ein Array holen
	 */
	this.values = function() { return this.valueSet; };

	this.toString = function() { return JSON.stringify(this); }

	if (data) this.extend(data);
}

module.exports = function(data) {
	return new Proxy(new AArray(data), {
		deleteProperty: function(target, name) {
			delete target[name];
			var i = target.keySet.indexOf(name);
			if (i > -1) {
				target.keySet.splice(i, 1);
				target.valueSet.splice(i, 1);
			}
			target.length = target.keySet.length;
			return true;
		},
		ownKeys: function (target) {
			return target.keySet;
		},
		get: function(target, name, receiver) {
			return target.get(name);
		},
		set: function(target, name, value, receiver) {
			return target.set(name, value);
		}
	});
};
