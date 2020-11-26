// 模块写在node_modules/tools/index.js
// 引入时默认找index.js
const tools = require("tools");

// 在模块目录下npm init --yes配置入口
// 可以更改默认文件

tools.printer();
