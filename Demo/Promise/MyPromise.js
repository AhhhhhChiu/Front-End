// 手写一个Promise

class MyPromise {

    constructor(executor) {
        // 不要相信用户的输入 需要参数校验
        if (typeof executor !== "function") {
            throw TypeError(`Promise resolver ${executor} is not a function`);
        }

        // 初始化值
        this.initValue();
        // 更改this指向
        this.initBind();

        try {
            // 执行
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    // 初始化值
    initValue() {
        // 状态
        this.state = MyPromise.PENDING;
        // 终值
        this.value = null;
        // 拒绝原因
        this.reason = null;

        // 如果传入的executor是异步的(比如传入一个settimeout)
        // 那executor里的回调会被加入消息队列不会立即执行
        // 会直接跳到then() 而then()里判断到state不是fulfilled也不是rejected
        // 会导致then()里的回调不会被执行

        // 具体：executor => 异步稍后执行 => then() => 因为executor没执行所以state没改变 then()也不执行
        // => 异步时间到了返回去执行executor的回调 => 此时只改变了state而没有执行then()

        // 所以需要添加两个回调数组 当发生异步直接then()的时候 先把需要执行的函数塞到数组里
        // 等状态改变的时候循环执行数组里的函数
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
    }

    // 更改this指向
    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    // 成功后执行的函数
    resolve(value) {
        // promise的状态是不可逆的
        // 所以仅当状态为pending时可以继续
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.FULFILLED;
            this.value = value;
            // 当executor异步
            this.onFulfilledCallbacks.forEach(fn => fn(this.value));
        }
    }

    // 失败后执行的函数
    reject(reason) {
        // promise的状态是不可逆的
        // 所以仅当状态为pending时可以继续
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECTED;
            this.reason = reason;
            // 当executor异步
            this.onRejectedCallbacks.forEach(fn => fn(this.reason));
        }
    }

    then(onFulfilled, onRejected) {
        // 参数校验
        // 规范中说明
        // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
        // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
        if (typeof onFulfilled !== "function") {
            onFulfilled = function (value) {
                return value;
            }
        }

        if (typeof onRejected !== "function") {
            onRejected = function (reason) {
                throw reason;
            }
        }

        // 因为promise/a+规范规定promise的状态是单向改变的
        // 所以实现链式调用需要返回新的实例而不是本身

        // 这里我的理解是需要返回一个promise对象的同时
        // 不要影响代码的正确执行

        let promise2 = new MyPromise((resolve, reject) => {

            if (this.state === MyPromise.FULFILLED) {
                // 异步实现
                // queueMicrotask(() => {
                //     onFulfilled(this.value);
                // })
                setTimeout(() => {
                    try {
                        // 其实这里就是把当前then()的返回结果作为链条下一节的参数
                        const x = onFulfilled(this.value);
                        // 直接resolve会有问题 需要进行一些处理
                        // resolve(x);
                        // 调用封装好的静态方法resolvePromise()
                        MyPromise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        // 有问题则拒绝执行 抛出异常
                        reject(e);
                    }
                }, 0);
            }

            if (this.state === MyPromise.REJECTED) {
                // 异步实现
                // queueMicrotask(() => {
                //     onRejected(this.reason);
                // })
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        MyPromise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            // 当executor异步 直接then()时
            if (this.state === MyPromise.PENDING) {

                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(value);
                            MyPromise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(reason);
                            MyPromise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });

            }
        })

        return promise2;
    }
}

// 避免因为拼写导致错误
MyPromise.PENDING = "pending";
MyPromise.FULFILLED = "fulfilled";
MyPromise.REJECTED = "rejected";
MyPromise.resolvePromise = function (promise2, x, resolve, reject) {
    // return的x不能是promise2本身 否则会出现下面的循环调用问题
    // let p1 = new Promise(resolve => resolve(1));
    // let p2 = p1.then(_ => p2);
    // Promises/A+规范
    // 提到如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (promise2 === x) {
        reject(new TypeError("Chaining cycle detected for promise"));
    }

    // 反复调用则忽略
    let called = false;
    if (x instanceof MyPromise) {
        // x为promise 直接then()
        x.then(value => {
            MyPromise.resolvePromise(promise2, value, resolve, reject);
        }, reason => { reject(reason); });
    } else if (x && (typeof x === "object" || typeof x === "function")) {
        // x为对象或函数
        try {
            const then = x.then;
            if (typeof then === "function") {
                if (called) return;
                called = true;
                then.call(x, value => {
                    MyPromise.resolvePromise(promise2, value, resolve, reject);
                }, reason => { reject(reason); })
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

module.exports = MyPromise;