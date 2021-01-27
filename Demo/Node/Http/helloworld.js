const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    console.log("query", query);

    res.writeHead(200, { "Content-Type": "text/html" });
    // 解决中文乱码
    res.write("<head><meta charset='UTF-8'></head>");
    // res.write("你好");

    // 一个简易路由
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            res.write('home');
            break;
        case '/about':
            res.write('about');
            break;
        default:
            res.write('404');
    }

    res.end();
}).listen(3000);

console.log("listening http://127.0.0.1:3000");
