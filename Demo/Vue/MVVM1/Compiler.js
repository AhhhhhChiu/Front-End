class Compiler {
  constructor(el, data, vm) {
    this.$data = data;
    this.$vm = vm;
    // 放到内存里
    let fragment = this.node2fragment(el);
    // 编译
    this.compile(fragment);
  }

  node2fragment(node) {
    const fragment = document.createDocumentFragment();
    let firstChild;
    while(firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  compile(fragment) {
    [...fragment.childNodes].forEach((node) => {
      if (isElemNode(node)) {
        this.compileElemNode(node, this.$data);
        this.compile(node);
      } else {
        this.compileTextNode(node);
      }
    });
  }

  compileElemNode(node, data) {
    [...node.attributes].forEach((attr) => {
      if (attr.name.startsWith('v-')) {
        getValue(attr.value, data);
        // console.log('compileElemNode', node, attr, attr.value, getValue(attr.value, data));
      }
    })
  }

  compileTextNode(node, data) {
    const reg = new RegExp(/\{\{(.+?)\}\}/);
    const content = node.textContent;
    if (reg.test(content)) {
      console.log()
    }
  }

}