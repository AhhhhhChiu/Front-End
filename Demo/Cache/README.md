# TASKSAPI


## 概述

基于express + json读写的todo小程序极简服务端

## 配置

1. 安装node.js，点击[这里](https://nodejs.org/zh-cn/download/)选择合适的node安装包安装
2. 安装express ```npm i express```
3. 启动 ```node index.js```
4. 出现 ```Listening at http://localhost:1234``` 表示正在运行

## 接口

#### 获取todo列表

##### 路径

GET ```http://localhost:1234/tasks```


##### 入参

```json
-
```


##### 出参

```json
{
    "data": [
        {
            "id": "1",
            "content": "Renew password",
            "status": true,
            "isDeleted": false
        },
        {
            "id": "2",
            "content": "Meeting",
            "status": true,
            "isDeleted": false
        },
        {
            "id": "3",
            "content": "Sign up for CET-6",
            "status": false,
            "isDeleted": false
        }
    ],
    "total": 3
}
```

#### 新增todo

##### 路径

POST ```http://localhost:1234/tasks```


##### 入参

```json
{
    "content": "Meeting"
}
```


##### 出参

```json
{
    "data": {
        "id": "50102",
        "content": "Meeting",
        "status": false,
        "isDeleted": false
    },
    "msg": "ok"
}
```

#### 删除todo

##### 路径

DELETE ```http://localhost:1234/tasks/:id```


##### 入参

```json
-
```


##### 出参

```json
{
    "data": null,
    "msg": "ok"
}
```

#### 修改todo

##### 路径

PUT ```http://localhost:1234/tasks/:id```


##### 入参

```json
{
    "content": "Meeting",
    "status": true
}
```


##### 出参

```json
{
    "data": {
        "id": "50102",
        "content": "Meeting",
        "status": true,
        "isDeleted": false
    },
    "msg": "ok"
}
```

## 示例

小程序端点击打钩时的操作

```js
// 点击完成todo
onCheckedTap(event) {
  // 回调函数中的this会丢失
  const that = this;
  // 拿到这条todo的下标
  const index = event.currentTarget.dataset.index;
  const tasks = this.data.tasks;
  // 发请求
  wx.request({
    // 把id拼接到url里
    url: `http://localhost:1234/tasks/${tasks[index].id}`,
    // 修改数据是put请求
    method: 'PUT',
    // 入参
    data: {
      // 改变原先的状态
      status: !tasks[index].status
    },
    // 请求成功的回调函数
    success(res) {
      // 出参
      console.log('success：', res);
      // 修改一下本地的数组
      tasks[index].status = !tasks[index].status;
      that.setData({ tasks });
    }
  })
}
```
