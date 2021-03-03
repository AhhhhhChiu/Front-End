const http = require('http');

http.createServer((req, res) => {
  const code = parseInt(req.url.split('/')[1]);
  if (code === 301) {
    res.writeHead(302, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Location': 'https://baidu.com',
    });
    res.end();
  }
}).listen(3000);

console.log('Server is running on http://localhost:3000/');
