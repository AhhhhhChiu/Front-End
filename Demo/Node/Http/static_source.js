const http = require('http');
const fs = require('fs');

// 访问静态资源
const serveStaticFile = (res, path, contentType) => {
  fs.readFile(`${__dirname}${path}`, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  serveStaticFile(res, path, 'text/html');
}).listen(3000);

console.log('Server running on http://localhost:3000');
