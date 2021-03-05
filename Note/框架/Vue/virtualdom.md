## Virtual DOM

虚拟 dom 其实就是用 js 去模拟真正的 dom，比如现在有一个 div 标签

```html
<div class="a" id="b">我是内容</div>
```

用 js 去描述它

```js
const div = {
    tag: "div", // 元素标签
    attrs: {
        // 属性
        class: "a",
        id: "b",
    },
    text: "我是内容", // 文本内容
    children: [], // 子元素
};
```

vue 也提供了一个 VNode 类，大概长这样

```js
// 源码位置：src/core/vdom/vnode.js

export default class VNode {
    constructor(
        tag?: string,
        data?: VNodeData,
        children?: ?Array<VNode>,
        text?: string,
        elm?: Node,
        context?: Component,
        componentOptions?: VNodeComponentOptions,
        asyncFactory?: Function
    ) {
        this.tag = tag; /*当前节点的标签名*/
        this.data = data; /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
        this.children = children; /*当前节点的子节点，是一个数组*/
        this.text = text; /*当前节点的文本*/
        this.elm = elm; /*当前虚拟节点对应的真实dom节点*/
        this.ns = undefined; /*当前节点的名字空间*/
        this.context = context; /*当前组件节点对应的Vue实例*/
        this.fnContext = undefined; /*函数式组件对应的Vue实例*/
        this.fnOptions = undefined;
        this.fnScopeId = undefined;
        this.key =
            data && data.key; /*节点的key属性，被当作节点的标志，用以优化*/
        this.componentOptions = componentOptions; /*组件的option选项*/
        this.componentInstance = undefined; /*当前节点对应的组件的实例*/
        this.parent = undefined; /*当前节点的父节点*/
        this.raw = false; /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
        this.isStatic = false; /*静态节点标志*/
        this.isRootInsert = true; /*是否作为跟节点插入*/
        this.isComment = false; /*是否为注释节点*/
        this.isCloned = false; /*是否为克隆节点*/
        this.isOnce = false; /*是否有v-once指令*/
        this.asyncFactory = asyncFactory;
        this.asyncMeta = undefined;
        this.isAsyncPlaceholder = false;
    }

    get child(): Component | void {
        return this.componentInstance;
    }
}
```


