class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (data && typeof data === "object") {
            // 把对象转为数组然后循环
            Object.keys(data).forEach(key => {
                // 劫持
                this.defineReactive(data, key, data[key]);
                // 递归劫持
                this.observe(data[key]);
            })
        }
    }

    defineReactive(obj, key, val) {
        let that = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                
                return val;
            },
            set(newVal) {
                that.observe(newVal);
                newVal !== val && (val = newVal);
            },
        })
    }
}