const http = require('http');

let todos = [
  { id: 1, text: "todo one", done: false },
  { id: 2, text: "todo two", done: false },
  { id: 3, text: "todo three", done: false }
];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'NodeJS'
  });

  let body = [];
  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body)
  })
  res.end(JSON.stringify({
    success: true,
    data: todos
  }));
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});