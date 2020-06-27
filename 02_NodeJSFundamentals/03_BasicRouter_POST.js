const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
  'GET': {
    '/': (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>This is router</h1>');
    }
  },
  'POST': {
    '/api/login': (req, res) => {
      let body = '';
      req.on('data', data => {
        body += data;

        // limit size input/upload
        if (body.length > 2097152) {
          res.writeHead(413, { 'Content-Tpye': 'text/html' });
          res.end('error file over 2MB', () => req.connection.destroy());
        }
      });

      req.on('end', () => {
        let params = qs.parse(body);
        let response = JSON.stringify({ username: params['username'], password: params['password'] });
        console.log(response);

        // query a db to see if the user exists
        // if so send a json respons to the spa
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(response);
      });
    }
  },
  'NA': (req, res) => {
    res.writeHead(404);
    res.end('Content Not Found!');
  }
};

const router = (req, res) => {
  let baseURI = url.parse(req.url, true);
  let resolveRoute = routes[req.method][baseURI.pathname];

  if (resolveRoute !== undefined) {
    req.queryParams = baseURI.query;
    resolveRoute(req, res);
  } else {
    routes['NA'](req, res);
  }
};

http.createServer(router).listen(3000, () => {
  console.log("Server running on port 3000")
});