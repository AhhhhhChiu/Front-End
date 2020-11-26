# 怎么使用Flow呢

Facebook团队开发的JavaScript的静态类型检查工具

## 安装

初始化项目
```
npm init
```
安装flow
```
npm install --save-dev flow-bin 
```
在package.json文件中添加
```json
"scripts": {
    "flow": "flow"
}
```

## 启动
创建.flowconfig配置文件
```
npm run flow init
```
类型检查
```
npm run flow check
```
或者这个增量检查比较快
```
npm run flow
```
在需要检查的文件加上
```js
//@flow
```
或者
```js
/*@flow*/
```