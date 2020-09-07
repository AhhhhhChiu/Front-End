class MVVM {
    constructor(options) {
        // 把可用的东西挂在到实例上
        this.$el = options.el;
        this.$data = options.data;

        // 如果有需要编译的模板则开始编译
        if (this.$el) {
            // 数据劫持
            new Observer(this.$data);
            // 用数据和元素进行编译 
            new Compile(this.$el, this);
        }
    }
}