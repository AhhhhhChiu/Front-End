class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        // 把旧值存起来
        this.oldVal = this.get();
    }

    getVal(vm, exp) {
        let val = vm.$data;
        exp = exp.split(".");
        exp.forEach(elem => {
            val = val[elem];
        })
        return val;
    }

    get() {
        return this.getVal(this.vm, this.exp);
    }

    update() {
        let newVal = this.get();
        let oldVal = this.oldVal;
        // 比较旧值新值 不同则回调cb
        newVal !== oldVal && this.cb(newVal);
    }
}