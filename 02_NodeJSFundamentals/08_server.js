const http = require('http');

let todos = [
  { id: 1, text: "todo one", done: false },
  { id: 2, text: "todo two", done: false },
  { id: 3, text: "todo three", done: false }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  let body = [];

  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    let status = 404;
    const response = {
      success: false,
      data: null,
      error: null
    };

    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    } else if (method === 'POST' && url === '/todos') {
      const { id, text, done } = JSON.parse(body);

      if (!id || !text || !done) {
        status = 400;
        response.error = 'please add id, text, and done!';
      } else {
        todos.push({ id, text, done });
        status = 201;
        response.success = true;
        response.data = todos;
      }
    }

    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'NodeJS'
    });

    res.end(JSON.stringify({ response }));
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});