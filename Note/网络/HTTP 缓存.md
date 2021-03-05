# 前端缓存

前端缓存里分为[HTTP缓存](#HTTP缓存)和[浏览器缓存](#浏览器缓存)两部分

## HTTP缓存

### 概述

http缓存指的是: 当客户端向服务器请求资源时，会先抵达浏览器缓存，如果浏览器有“要请求资源”的副本，就可以直接从浏览器缓存中提取而不是从原始服务器中提取这个资源。

常见的http缓存只能缓存get请求响应的资源，对于其他类型的响应则无能为力，所以后续说的请求缓存都是指GET请求。

http缓存都是从第二次请求开始的。第一次请求资源时，服务器返回资源，并在respone header头中回传资源的缓存参数；第二次请求时，浏览器判断这些请求参数，命中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否命中协商缓存，命中则返回304，否则服务器会返回新的资源。

```sequence
participant Client as Client
participant Cache as Cache
participant Server as Server

Client->Cache: 请求数据
Cache->Client: 没有缓存或缓存失效
Client->Server: 请求数据
Server->Client: 返回数据和缓存规则
Client->Cache: 存入数据和缓存规则
```

### 强缓存


不管哪种缓存，在第一次请求的时候是没有缓存的，这个时候服务器会返回数据和相应的缓存规则（存在header中）。强缓存主要由 `Cache-Control` 控制，历史原因还有 `Expires` 和 `Pragma`

|字段|可选值|备注|优先级|
|-|-|-|-|
|Pragma|no-cache: 不直接使用|http1.0|1|
|Cache-Control|no-cache: 不直接使用<br>no-store: 不使用任何缓存<br>public: 共享缓存<br>private: 仅客户端缓存<br>max-age: 缓存时长(s)|http1.1|2|
|Expires|GMT时间|http1.0+|3|

```sequence
title: 缓存命中
participant Client as Client
participant Cache as Cache
participant Server as Server

Client->Cache: 请求数据
Note over Cache: 判断max-age
Cache->Client: 有缓存且新鲜
```

```sequence
title: 缓存未命中
participant Client as Client
participant Cache as Cache
participant Server as Server

Client->Cache: 请求数据
Cache->Client: 没有缓存或缓存失效
Client->Server: 请求数据
Server->Client: 返回数据和缓存规则
Client->Cache: 存入数据和缓存规则
```

## 浏览器缓存
