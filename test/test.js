var aarray = require("../");

var testArray = new aarray({test2:'xyz', test1: 'abc'});

testArray['abc'] = '123';
testArray['abc'] = '987';
console.info(testArray.toString());
//delete testArray['abc'];
testArray.sort();

var test2Array = testArray.slice(0, 1);

console.info(testArray.size);

for(var i in testArray) {
	console.info(i, testArray[i]);
}

/*
for(var i = 10000; i >= 0; i--) testArray.set(i, 'item'+i);
// foreach test
var ts = new Date().getTime();
testArray.forEach(function(val, key, context) {
    // ignore
});

console.info(testArray);

console.info("forEach done:"+(new Date().getTime()-ts)+'ms');
// ksort test
ts = new Date().getTime();
testArray.ksort();
console.info("ksort done:"+(new Date().getTime()-ts)+'ms');
// reverse test
ts = new Date().getTime();
testArray.reverse();
console.info("ksort done:"+(new Date().getTime()-ts)+'ms');
/**/
