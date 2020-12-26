/**
 * Created by AhChiu on 2020/11/25
 */

const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === "options") res.send(200);
    //让options尝试请求快速结束
    else next();
});

app.get("/", (req, res) => {
    res.header('cache-control', 'max-age=5');
    const tasks = fs.readFileSync('./data.json').toString();
    res.json({
        data: JSON.parse(tasks),
    });
});

const port = 1234;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
