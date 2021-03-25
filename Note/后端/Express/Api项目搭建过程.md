# express-api 项目搭建

## 安装

全局安装express生成器、sequelize-auto、mysql
```cmd
npm install -g express-generator
npm install -g sequelize-auto
```

创建一个空文件夹，在文件夹目录下打开终端，生成express程序
```cmd
express
```

安装依赖
```cmd
npm install
```

启动入口改成app.js
```js
// app.js

// 1. 指定端口
const port = 3000;
// 2. 监听端口
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// module.exports = app;
```

安装其他依赖
```cmd
npm install sequelize body-parser cors mysql2 --save
```

在app.js里配置
```js
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

可以直接删除bin目录，使用nodemon可以热更新
```cmd
npm install -g nodemon
nodemon ./app.js
```

看到下面这个表示ok
```cmd
[nodemon] starting `node ./app.js`
Server is running on http://localhost:3000
```

## Models

先用mysql建表，命令行/图形化界面都可以，然后用sequelize-auto生成sequelize的Models
```cmd
sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -l lang
sequelize-auto -h 127.0.0.1 -d confession_wall -u root -x root -p 3306 -l es6
```

在models文件夹下新建index.js文件，配置数据库连接
```js
const Sequelize = require('sequelize');

// db user password options
const sequelize = new Sequelize('confession_wall', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {
  Sequelize,
  sequelize,
  ...require('./init-models')(sequelize),
};

module.exports = db;
```

app.js中加入
```js
const db = require("./models");
db.sequelize.sync();
```

写一个接口测试一下
```js
// controllers -> users.controller.js

const User = require('../models').user;
exports.findAll = (_, res) => {
  User.findAll().then((data) => {
    res.send(data);
  });
};

// routers -> users.js

const router = require('express').Router();
const controller = require('../controllers/user.controller');
router.get('/', controller.findAll);
module.exports = router;

// app.js

app.use('/users', indexRouter);
```

先在表里新建几条测试数据，用postman请求一下`http://localhost:3000/users`，有数据就是跑通上了。
