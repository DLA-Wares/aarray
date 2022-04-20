# Sortable associative array

## Changelog
#### 2022-04-20
+ Added function slice
+ Support for nodejs < 6 disabled
+ Typescript
+ object like loop (for (var i in ....))

---

## Dokumentation
### Properties
* length (element count)
* size (alias for length and Map compatibility)

### Functions
* constructor(Object|Array|AArray|Map)
* extend (Object|Array|AArray|Map)
* remove(mixed key)
* Number nextKey() get next available key
* mixed push(mixed value[, mixed key]) key is optional, result is key
* forEach(Function eachFunction(mixed value, mixed, key, AArray context))
* Object shiftObject() Result ist {key:mixed, value:mixed}
* sort([Function f])
* ksort([Function f])
* reverse()
* slice()
* Array keys()
* Array values()
* set(key, value)
* mixed get(key)

## Examples
```javascript
var mydata = new AArray({'c':'3', 'b':'2', 'a':'1'});
for (var i in mydata) {
	console.info(i+':'+mydata[i]);
}
// Output:
// c:3
// b:2
// a:1

mydata.sort();
for (var i in mydata) {
	console.info(i+':'+mydata[i]);
}
// Output:
// a:1
// b:2
// c:3

mydata.ksort();
for (var i in mydata) {
	console.info(i+':'+mydata[i]);
}
// Output:
// a:1
// b:2
// c:3

```

```javascript
var AArray = require("aarray");
var mydata = new AArray();

// assign
mydata['abc'] = 'xyz';
mydata[1] = 'xyz';
var newIndex = mydata.push('xyz');
mydata.push('xyz', 'abc'); // replace first item

// loop
mydata.forEach(function(val, key, context) {
    // do somthing
    // remove item? No problem
    mydata.remove(key) // or delete mydata[key];
});

// loop method 2
for(var key in mydata) {
	console.info(i, mydata[i]);
}
```