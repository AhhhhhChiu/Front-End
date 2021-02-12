const obj = require('./a').obj;
const objChange = require('./a').objChange;
const count = require('./a').count;
const countChange = require('./a').countChange;

console.log(obj);
objChange();
console.log(obj);
console.log(count);
countChange();
console.log(count);

console.log(module);