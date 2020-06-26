const http = require('http');
const url = require('url');

let routes = {
  'GET': {
    '/': (req, res) =>{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('<h1>This is router</h1>');
    }
  },
  'POST': {

  },
  'NA': (req, res) => {
    res.writeHead(404);
    res.end('Content Not Found!');
  }
};

const router = (req, res) => {
  let baseURI = url.parse(req.url, true);
  let resolveRoute = routes[req.method];
};

http.createServer(router).listen(3000, () => console.log("Server running on port 3000"));