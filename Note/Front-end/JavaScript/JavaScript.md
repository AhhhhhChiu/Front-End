# JavaScript

- [数据类型](#数据类型)
- [数组](#数组)
- [对象](#对象)
- [函数](#函数)
- [原型&继承](#原型&继承)
- [类](#类)
- [错误处理](#错误处理)
- [异步](#异步)


## 数据类型

**基本数据类型**：Boolean Null Undefined [Number](#数字类型) BigInt [String](#字符串类型) Symbol

**引用数据类型**：Object

区别：基本数据类型的值存在栈内存中，引用数据类型的值存在堆内存中


**被当做对象的原始类型**

- null/undefined 没有任何方法
- 这些方法通过临时对象工作，但 JavaScript 引擎可以很好地调整，以在内部对其进行优化，因此调用它们并不需要太高的成本。


```js
/*
 * 1. 创建一个包含字符串字面值的特殊对象，并且具有有用的方法
 * 2. 该方法运行并返回一个新的字符串
 * 3. 特殊对象被销毁，只留下原始值（被返回的新字符串）
 */

let str = "Hello";
alert( str.toUpperCase() );
```

### 数字类型

#### 科学计数法

- 1.23e6 = 1.23 * 1000000 = 1230000
- 1.23e-6 = 1.23 / 1000000 = 0.00000123

#### 进制

- 十六进制 0x（例：0xffffff）
- 八进制 0o（例：0o377）
- 二进制 0b（例：0o11111111）

toString(进制)
```js
  const num = 100;
  num.toString(16); // 64
  num.toString(2); // 1100100
  // 也可以这样
  100..toString(16);
  // or
  (100).toString(16);
```

#### 取整

- Math.floor 向下取整 3.1 -> 3
- Math.ceil  向上取整 3.1 -> 4
- Math.round 四舍五入 3.5 -> 4
- Math.trunc 去小数点后内容 3.1 -> 3
- toFixed(小数点后n位) (12.36).toFixed(1) -> 12.4

#### 杂项

**不精确的计算**

IEEE-754数字格式带来的精度问题（PHP，Java，C，Perl，Ruby也会），可以用`+数字.toFixed(位数)`来解决

```js
alert( 1e500 ); // Infinity
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

**isFinite 和 isNaN**

isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN
isFinite(value) 将其参数转换为数字，如果是常规数字而不是NaN/Infinity/-Infinity，则返回 true

**parseInt 和 parseFloat**

使用`+`和`Number()`的数字转换是严格的。如果一个值不完全是一个数字，就会报错。
`parseInt` 和 `parseFloat`可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。

```js
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5
alert( parseInt('12.3') ); // 12，只有整数部分被返回了
alert( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取
alert( parseInt('a123') ); // NaN，第一个符号停止了读取

// 第二个参数 进制
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效
alert( parseInt('2n9c', 36) ); // 123456
```

### 字符串类型

#### 字符串是不可变的

```js
let str = 'hello';
str[0] = 'H'; // 报错
```

#### 改变大小写

`toLowerCase()` 和 `toUpperCase()` 方法可以改变大小写

```js
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

#### 查找子字符串

- str.indexOf, str.lastIndexOf

  ```js
  const str = 'hello world';
  str.indexOf('o'); // 4 找到第一个会停下来
  ```

- includes, startsWith, endsWith

  ```js
  alert( "Midget".includes("id") ); // true
  alert( "Midget".includes("id", 3) ); // false, 从位置 3 开始没有 "id"
  ```

#### 获取子字符串

- slice(start, end)	从 start 到 end（不含 end）	允许负值
- substring(start, end)	start 与 end 之间（包括 start，但不包括 end）	负值代表 0
- substr(start, length)	从 start 开始获取长为 length 的字符串	允许 start 为负值

### 数组

- 添加/删除元素：

  - **push(...items)** —— 向尾端添加元素，
  - **pop()** —— 从尾端提取一个元素，
  - **shift()** —— 从首端提取一个元素，
  - **unshift(...items)** —— 向首端添加元素，
  - **splice(pos, deleteCount, ...items)** —— 从 pos 开始删除 deleteCount 个元素，并插入 items。
  - **slice(start, end)** —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
  - **concat(...items)** —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。

- 搜索元素：
  - **indexOf/lastIndexOf(item, pos)** —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
  - **includes(value)** —— 如果数组有 value，则返回 true，否则返回 false。
  - **find/filter(func)** —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
  - **findIndex** 和 find 类似，但返回索引而不是值。
- 遍历元素：
  - **forEach(func)** —— 对每个元素都调用 func，不返回任何内容。
- 转换数组：
  - **map(func)** —— 根据对每个元素调用 func 的结果创建一个新数组。
  - **sort(func)** —— 对数组进行原位（in-place）排序，然后返回它。
  - **reverse()** —— 原位（in-place）反转数组，然后返回它。
  - **split/join** —— 将字符串转换为数组/将数组转换为字符串并返回。
  - **reduce/reduceRight(func, initial)** —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。
  - **Array.from(arrayLike)** —— 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
  - **Array.of()** 和Array()类似，但参数为一个number时，返回包含该number的数组。`Array.of(1); // [1]`
- 其他：
  - **Array.isArray(arr)** 检查 arr 是否是一个数组。
> 请注意，sort，reverse 和 splice 方法修改的是数组本身。

这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：

arr.some(fn)/arr.every(fn) 检查数组。

与 map 类似，对数组的每个元素调用函数 fn。如果任何/所有结果为 true，则返回 true，否则返回 false。

这两个方法的行为类似于 || 和 && 运算符：如果 fn 返回一个真值，arr.some() 立即返回 true 并停止迭代其余数组项；如果 fn 返回一个假值，arr.every() 立即返回 false 并停止对其余数组项的迭代。

我们可以使用 every 来比较数组：

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
arr.fill(value, start, end) —— 从索引 start 到 end，用重复的 value 填充数组。

arr.copyWithin(target, start, end) —— 将从位置 start 到 end 的所有元素复制到 自身 的 target 位置（覆盖现有元素）。

arr.flat(depth)/arr.flatMap(fn) 从多维数组创建一个新的扁平数组。

arr.of(element0[, element1[, …[, elementN]]]) 基于可变数量的参数创建一个新的 Array 实例，而不需要考虑参数的数量或类型。
