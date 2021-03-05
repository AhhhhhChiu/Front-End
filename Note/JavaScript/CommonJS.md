# CommonJS

## 作用域与global对象

Node 应用由模块组成，采用 CommonJS 模块规范。commonjs是规范，nodejs是实现，他们的关系类似于es和js的关系。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。如果想要对其他文件可见，可以定义为`global`的属性（不推荐），它相当于浏览器中的`window`。

```js
global.a = 1;
```

## module对象

Node内部提供一个Module构建函数。所有模块都是Module的实例。

- [module.exports](#exports)
- [module.id](#id)
- [module.filename](#filename)
- [module.loaded](#loaded)
- [module.path](#path)
- [module.paths](#paths)
- [module.parent](#parent)
- [module.children](#children)

<h3 id="exports">module.exports</h3>

exports可以说是最常用到的属性了，表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。

```js
// a.js
module.exports = {
  count: 1,
};

// b.js
const count = require('./a').count;
```

也可以直接暴露一个函数，这样就可以在读取的时候直接调用

```js
// a.js
module.exports = () => {
  return true;
};

// b.js
console.log(require('./a')());
```

读取到的变量是浅拷贝

```js
// a.js
const obj = {
  a: 1,
};
const objChange = () => {
  obj.a = 2;
};
let count = 1;
const countChange = () => {
  count += 1;
};
module.exports = {
  obj,
  objChange,
  count,
  countChange,
};



//b.js
const obj = require('./a').obj;
const objChange = require('./a').objChange;
const count = require('./a').count;
const countChange = require('./a').countChange;

console.log(obj); // { a: 1 }
objChange();
console.log(obj); // { a: 2 }
console.log(count); // 1
countChange();
console.log(count); // 1
```

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令`let exports = module.exports;`，这时候不能直接给exports赋值，因为这样等于切断了exports与module.exports的联系，只能`exports.xxx = xxx;`这样。

<h3 id="id">module.id</h3>

模块的识别符，通常是带有绝对路径的模块文件名。

```js
// a.js
console.log(module.id); // .
```

<h3 id="filename">module.filename</h3>

模块的文件名，带有绝对路径。

```js
// a.js
console.log(module.filename); // /Users/haidaibuyaoqiandema/workspace/Front-end/Demo/Node/d.js
```

<h3 id="loaded">module.loaded</h3>

返回一个布尔值，表示模块是否已经完成加载。

<h3 id="path">module.path</h3>

模块当前文件夹的绝对路径。

```js
// a.js
console.log(module.path); // /Users/haidaibuyaoqiandema/workspace/Front-end/Demo/Node
```

<h3 id="paths">module.paths</h3>

返回一个数组，模块的搜索路径。

```js
// 海带不要钱的吗 我本机的用户名o(￣▽￣)ｄ
module.paths = [
  '/Users/haidaibuyaoqiandema/workspace/Front-end/Demo/Node/node_modules',
  '/Users/haidaibuyaoqiandema/workspace/Front-end/Demo/node_modules',
  '/Users/haidaibuyaoqiandema/workspace/Front-end/node_modules',
  '/Users/haidaibuyaoqiandema/workspace/node_modules',
  '/Users/haidaibuyaoqiandema/node_modules',
  '/Users/node_modules',
  '/node_modules',
];
```

<h3 id="parent">module.parent</h3>

返回一个对象，表示调用该模块的模块。如果通过node xxx.js直接执行这个模块，则parent值为null。可以通过这个值判断该文件是否为入口文件。

```js
if (!module.parent) {
    // ran with `node something.js`
    app.listen(8088, function() {
        console.log('app listening on port 8088');
    })
} else {
    // used with `require('/.something.js')`
    module.exports = app;
}
```

<h3 id="children">module.children</h3>

 返回一个Module数组，表示该模块要用到的其他模块。

## require

### 基本使用

读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

### 加载规则


