var aarray = require("aarray");

console.info(aarray.prototype);

// performece test
var testArray = new aarray();
for(var i = 10000; i >= 0; i--) testArray[i] = 'item'+i;
// foreach test
var ts = new Date().getTime();
testArray.forEach(function(val, key, context) {
    // ignore
});
console.info("forEach done:"+(new Date().getTime()-ts)+'ms');
// ksort test
ts = new Date().getTime();
testArray.ksort();
console.info("ksort done:"+(new Date().getTime()-ts)+'ms');
// reverse test
ts = new Date().getTime();
testArray.reverse();
console.info("ksort done:"+(new Date().getTime()-ts)+'ms');
