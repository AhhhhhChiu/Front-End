# 初识Express

Express是一个精简的、灵活的Node.js Web程序框架，为构建单页、多页及混合的Web程序提供了一系列健壮的功能特性。

## 安装

```cmd
npm install express
```

## 创建Express程序

```js
const express = require('express');
const app = express();

const port = 3000;

app.use((_, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

这个时候访问`http://localhost:3000`会发现只有404页，配置一下路由信息，在404处理器前加上（注意顺序）：

```js
app.get('/', (_, res) => {
  res.type('text/plain');
  res.send('Home');
});

app.get('/about', (_, res) => {
  res.type('text/plain');
  res.send('About');
});
```

现在我们只是返回了状态码为200的普通文本（Express默认的状态码是200，不用显式指定）。相较于直接使用http库，Express带来几个变化：

1. 使用res.send()替代res.end()
2. 使用res.type()直接指定头部content-type
3. 使用res.status()指定响应码

## 视图和静态文件

Express靠中间件处理静态文件和视图，static中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过任何特殊处理直接发送到客户端

```js
app.use(express.static(`${__dirname}/public`));
```

