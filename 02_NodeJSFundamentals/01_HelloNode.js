const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html"});
  res.end("<h2>Hello NodeJS</h2>");
}).listen(3000, () => console.log('server running on port 3000'));