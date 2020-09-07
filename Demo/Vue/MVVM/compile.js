class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            // 成功获取元素 开始编译
            // 1、把DOM移入内存中 fragment 
            let fragment = this.node2fragment(this.el);
            // 2、编译 => 提取v-model和{{}}
            this.compile(fragment);
            // 3、塞回去
            this.el.append(fragment);
        }
    }

    /** 核心方法 */
    // 编译元素节点
    compileElement(node) {
        let attrs = node.attributes;
        // 遍历特性
        Array.from(attrs).forEach(attr => {
            let attrName = attr.name;
            // 是不是v-开头
            if (this.isDirective(attrName)) {
                let exp = attr.value;
                let type = attrName.slice(2);
                // 使用编译工具
                CompileUtil[type](node, this.vm, exp);
            }
        })
    }
    // 编译文本节点
    compileText(node) {
        let exp = node.textContent;
        let reg = /\{\{([^}]+)\}\}/;
        if (reg.test(exp)) {
            // 使用编译工具
            CompileUtil["text"](node, this.vm, exp);
        }
    }
    // 编译
    compile(fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 元素节点
                this.compileElement(node);
                // 递归
                this.compile(node);
            } else {
                // 文本节点
                this.compileText(node);
            }
        })
    }
    // 把DOM移入内存中 fragment 
    node2fragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.append(firstChild);
        }
        return fragment;
    }
    /** 辅助方法 */
    // 是不是v-开头
    isDirective(name) {
        return name.includes("v-");
    }
    // 是不是元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}

CompileUtil = {
    getVal(vm, exp) {
        let val = vm.$data;
        exp = exp.split(".");
        exp.forEach(elem => {
            val = val[elem];
        })
        return val;
    },
    getTextVal(vm, exp) {
        return exp.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1]);
        })
    },
    text(node, vm, exp) {
        let updateFn = this.updater['textUpdater'];
        let val = this.getTextVal(vm, exp);
        exp.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newVal) => {
                // updateFn && updateFn(node, this.getTextVal(vm, newVal));
            })
        })
        updateFn && updateFn(node, val);
    },
    model(node, vm, exp) {
        let updateFn = this.updater['modelUpdater'];
        new Watcher(vm, exp, (newVal) => {
            updateFn && updateFn(node, newVal);
        })
        updateFn && updateFn(node, this.getVal(vm, exp));
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}