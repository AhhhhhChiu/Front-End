# Ajax

## 一、简介

Ajax (Asynchronous JavaScript + XML) 一种使用现有技术集合的‘新’方法，包括: HTML or XHTML, Cascading Style Sheets, JavaScript, The Document Object Model, XML, XSLT, 以及最重要的 XMLHttpRequest object。一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

## 二、XMLHttpRequest

现代浏览器上写AJAX主要依靠XMLHttpRequest对象（IE浏览器为ActiveX对象）

### 1. 创建XMLHttpRequest实例

``` javascript
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
```

### 2. 配置请求信息

open(method, url, async)

* method：请求的类型；GET 或 POST
* url：文件在服务器上的位置
* async：true（异步）或 false（同步） 注意：post请求一定要设置请求头的格式内容

``` javascript
    // get请求下参数加在url后
    // httpRequest.open("get", "/ashx/myzhuye/Detail.ashx?methodName=GetAllComment&str1=str1&str2=str2", true);

    // post
    httpRequest.open("post", "/ashx/myzhuye/Detail.ashx?methodName=GetAllComment", true);

    // 配置请求头信息
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
```

### 3. 注册回调函数

**readyState**

readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。 readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义

* 0：未初始化 -- 尚未调用. open()方法；
* 1：启动 -- 已经调用. open()方法，但尚未调用. send()方法；
* 2：发送 -- 已经调用. send()方法，但尚未接收到响应；
* 3：接收 -- 已经接收到部分响应数据；
* 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；

**status**

HTTP状态码(status)由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字没有分类的作用。HTTP状态码共分为5种类型：

|分类 | 分类描述|
|---|---|
|1xx信息|服务器收到请求，需要请求者继续执行操作|
|2xx成功|操作被成功接收并处理|
|3xx重定向|需要进一步的操作以完成请求|
|4xx客户端错误|请求包含语法错误或无法完成请求|
|5xx服务器错误|服务器在处理请求的过程中发生了错误|

**注册回调函数**

``` javascript
    // readyState每次改变都会调用onreadystatechange()
    httpRequest.onreadystatechange = function() {
        // 值为4表示可以使用数据
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                // 取得返回的数据
                let data = httpRequest.responseText;
                // do something
            }
        }
    }
```

### 4. 发送请求

``` javascript
    // post请求参数放send里
    httpRequest.send("methodName = GetAllComment&str1=str1&str2=str2");
```

### 5. 获取异步调用返回的数据

### 6. 操作DOM实现局部刷新

## 三、Ajax原理

Ajax的工作原理相当于在用户和服务器之间加了—个中间层(AJAX引擎)，使用户操作与服务器响应异步化。并不是所有的用户请求都提交给服务器。像—些数据验证和数据处理等都交给Ajax引擎自己来做，只有确定需要从服务器读取新数据时再由Ajax引擎代为向服务器提交请求。
