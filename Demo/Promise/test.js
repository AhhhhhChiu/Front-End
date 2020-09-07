const MyPromise = require("./MyPromise.js");

new MyPromise((resolve, reject) => {
    resolve(1)
}).then(res => {
    console.log(res);
    return new MyPromise((success, fail) => {
        fail(2);
    });
}).then(value => {

}, reason => {
    console.log(reason);
})