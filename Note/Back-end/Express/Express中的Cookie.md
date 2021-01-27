# Express中的Cookie

安装中间件cookie-parser

```cmd
npm install --save cookie-parser
```

使用中间件

```js
app.use(require('cookie-parser')(credentials.cookieSecret);
```

然后就可以在任何地方使用或者签名cookie

```js
/*
 * 签名cookie的优先级要大于未签名的cookie
 * 即设置了名为signed_monster的签名cookie后
 * 不可以再设置同名的未签名cookie哦
 */
res.cookie('monster', 'nom nom');
res.cookie('signed_monster', 'nom nom', { signed: true });
```

访问客户端传来的cookie

```js
// 直接点就行
req.<cookie name>
```

删除cookie

```js
res.clearCookie(<cookie name>);
```

配置项

```js
res.cookie(cookieName, cookieValue, {
  // cookie只会分配给该子域名
  domain: 'example.com',
  // 应用这个cookie的路径
  path: '/path',
  // cookie有效时间(ms)
  maxAge: 100000,
  // 是否只能通过https协议访问
  secure: true,
  // 是否只能通过服务器修改cookie
  httpOnly: true,
  // 是否签名
  signed: true,
});
```
