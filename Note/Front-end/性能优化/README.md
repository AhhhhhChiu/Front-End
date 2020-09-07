## 性能优化

#### 一、浏览器渲染流程

##### 1、构建DOM树、CSSOM树、Render树

##### 1.1 DOM树

- 拿到html(字节流数据)
- 解析成字符(\<html>\<body>这些)
- 按照W3C标准进行标签语义解析 生成令牌(Tokens)
- 生成标记结构
- 生成DOM树

优化：

- 标签语义化 -- 越接近标准标签解析会越快
- 避免深层次嵌套 -- 生成DOM树时会减少递归

##### 1.2 CSSOM树

- 拿到所有CSS文件(style、link、@import...也是字节流数据)
- 过程和DOM树生成差不多
- 。。。

优化：

- 避免冗长选择器(.box a 和 a 后者更快，选择器渲染是右到左)
- 使用CSS预编译器时慎用层级嵌套

##### 1.3 总结流程

- 构建DOM树
- 构建CSSOM树
- 融合生成Render树
- 回流
- 绘制

![browser](../images/browser.png "browser")

优化：

- CSS放在顶部优先下载(HTTP可以多请求并发)
  - link异步请求 @import同步请求 style和html一起不额外请求
  - 样式少用style，多用link，避免@import
  - CSS放顶部可以在并发下载的同时构建DOM树
- 避免阻塞的JS加载(构建DOM树的时候遇到JS会默认阻塞)
  - 放到底部
  - 使用defer(异步拿到js最后编译-建议使用)和async(异步拿到js拿到就编译-js无依赖时用)
![deferandasync](./../images/deferandasync.png "deferandasync")
- 回流和重绘的优化 [戳这里](./../浏览器/浏览器渲染原理.md)

##### 2、网络交互层面上的优化

##### 2.1 DNS

DNS解析会花费20~120ms

- DNS预解析

```html
<!-- 打开和关闭DNS预读取 -->
<meta http-equiv="x-dns-prefetch-control" content="off">
<!-- 强制查询特定主机名 -->
<link rel="dns-prefetch" href="//hm.baidu.com">
```

##### 2.2 减少HTTP请求次数和请求资源大小

- 资源(CSS、js)合并压缩
- 尽量使用字体图片而不是矢量图
- 图片可以用Base64
- GZIP(一般的文件能压缩60%+)
- 图片懒加载
- 音视频走流文件
- CDN资源
- 数据延迟分批加载

##### 2.3 减少HTTP请求次数和请求资源大小

