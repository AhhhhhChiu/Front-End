# Event Loop

Event Loop是一个执行模式，浏览器和Node对该模型的实现均有不同。浏览器的在h5规范中有定义，而Node中的事件循环是基于libuv实现的。

在JavaScript中，任务分为宏任务（MacroTask）和微任务（MicroTask）。常见的宏任务有setTimeout、setInterval、setImmediate（IE）、I/O、UI Rendering。微任务有Process. nextTick（Node）、Promise、MutationObserver、Object. observe(废弃)。

## 过程

1. 按顺序执行全局JavaScript，同步代码压入调用栈，执行完毕后弹出，异步代码按类型放到宏任务队列或者微任务队列里。

2. 全局代码执行完后调用栈空，这时先执行微任务队列里的任务，注意：**此时如果产生新的微任务，则继续执行微任务直到微任务队列为空。**

3. 此时微任务队列和调用栈均为空，取宏任务队列的队首任务执行。

4. 执行完毕后又去查看微任务队列（回到第2步），等微任务队列为空后再取一个宏任务，如此循环直到所有任务执行完毕。

也就是说顺序是这样的：

```同步代码 -> 清空微任务队列 -> 执行一个宏任务 -> 清空微任务队列 -> 执行一个宏任务 -> ... ```

## 举例

在这里选用setTimeout代表宏任务而promise代表微任务

``` js
function func1 () {
  console.log(1);
}

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

new Promise((resolve, reject) => {
  console.log(4);
  resolve(5);
}).then((number) => {
  console.log(number);
  Promise.resolve().then(() => {
    console.log(6);
  })
})

setTimeout(() => {
  console.log(7);
})

console.log(8);
func1();
```
## 分析

1. 执行全局JavaScript代码，遇到func1声明先不管
2. 遇到setTimeout()时把函数塞到宏任务队列里。下一步

    - 现在宏任务队列是这样的: ```[ 第一个setTimeout()里的代码 ]```

3. new Promise直接把console.log(4)压入调用栈打印 **4** 后弹出，把resolve(5)塞进微任务队列。下一步

    - 微任务队列：```[ resolve(5) ]``` （有的文章说是执行resolve，然后把then里的内容塞进队列，这里存疑，不过感觉分析出来的结果是一样的）

4. 又是一个setTimeout()

    - 现在的宏任务队列：```[ 第一个setTimeout()里的代码, 第二个setTimeout()里的代码 ]```

5. console.log(8)压入调用栈打印 **8** 后弹出

6. func1() -> console.log(1)压入调用栈打印 **1** 后弹出

7. 执行到最后一行JavaScript，同时调用栈为空，此时先到微任务队列的取队首任务执行，也就是```resolve(5)```

    - resolve(5)出队，此时微任务队列长这样：```[]```
    - console.log(number)压入调用栈打印 **5** 后弹出
    - 此时产生一个新的微任务resolve(6)压入微任务队列，此时微任务队列长这样```[ resolve(6) ]```

8. 本来清空微任务队列后应该去查看宏任务队列的，但由于执行微任务的过程中产生了新的微任务，所以继续取微任务队列队首执行，
    
    - resolve(6)出队，此时微任务队列长这样：```[]```
    - 将console.log(6)压入调用栈打印 **6** 后弹出

9. 现在微任务队列为空，则取宏任务队首执行

    - 第一个setTimeout出队，此时宏任务队列长这样：```[ 第二个setTimeout()里的代码 ]```
    - console.log(2)压入调用栈打印 **2** 后弹出
    - 产生新的微任务入队，此时微任务队列：```[ resolve(3) ]```

10. 执行完一个宏任务后查看微任务是否为空，不为空则先清空微任务

    - 取微任务队列队首执行，此时微任务队列：```[]```
    - console.log(3)压入调用栈打印 **3** 后弹出

11. 微任务队列为空，取宏任务队首执行

    - 第二个setTimeout出队，此时宏任务队列长这样：```[]```
    - console.log(7)压入调用栈打印 **7** 后弹出

12. 此时调用栈、宏任务队列、微任务队列均为空，执行完毕。

打印顺序为：

```
    4 8 1 5 6 2 3 7
```

## 总结

1. 调用栈为空后先清空微任务队列
2. 每执行完一个宏任务都要清空微任务队列
3. 清空微任务队列的过程中产生新的微任务需要继续执行直到微任务队列为空
4. new Promise()里的函数会立即执行，resolve才会压入微任务队列
