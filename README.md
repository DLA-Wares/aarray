# Sortable associative array


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
# Properties
* length (element count)

# Functions
* exend(Object)
* remove(mixed key)
* Number nextKey() get next aviable key
* mixed push(mixed value[, mixed key]) key is optional, result is key
* forEach(Function eachFunction(mixed value, mixed, key, aarry context))
* Object shiftObject() Result ist {key:mixed, value:mixed}
* Number length()
* sort([Function f])
* ksort([Function f])
* reverse()
* Array keys()
* Array values()

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
```