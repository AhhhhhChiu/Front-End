# Express中的会话

需要同时安装中间件cookie-parser和express-session

```cmd
npm install --save cookie-parser
npm install --save express-session
```

使用中间件

```js
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')(options));
```

session配置项

```js
// 即上一步use时options的值
options = {
  name: cookieName,
  // session的存储实例
  store: MemoryStor,
  cookie: {
    // session cookie设置项
    httpOnly: true,
    // ...
  },
};
```

设置session

```js
app.get('/login', (req, res) => {
  req.session.isLogin = true;
  res.send('ok');
});
```

使用session
```js
app.get('/books', (req, res) => {
  if (req.session.isLogin) {
    // TODO
    res.send(data);
  } else {
    res.status(401);
    res.send('unauthorized');
  }
});
```
