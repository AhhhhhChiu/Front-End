const express = require('express');

// 创建一个express程序
const app = express();

const port = 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', (_, res) => {
  res.type('text/plain');
  res.send('Home');
});

app.get('/about', (_, res) => {
  res.type('text/plain');
  res.send('About');
});

app.get('/headers', (req, res) => {
  res.set('Content-Type','text/plain');
  let headers = '';
  Object.keys(req.headers).forEach((key) => {
    headers = `${headers}${key}: ${req.headers[key]}\n`;
  });
  res.send(headers);
});

app.use((_, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});