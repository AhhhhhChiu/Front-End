class MVVM {
  constructor(options) {
    // 1. 把参数取出来
    const { el, data } = options;
    this.$data = data;
    this.$vm = options;
    
    // 拿到节点
    this.$el = isElemNode(el) ? el : document.querySelector(el);

    new Compiler(this.$el, this.$data, this.$vm);
  }
}
