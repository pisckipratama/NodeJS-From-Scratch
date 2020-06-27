const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
let mimes = {
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.gif': 'text/gif',
  '.jpg': 'text/jpg',
  '.png': 'text/jpg'
};

const webServer = (req, res) => {
  let baseURI = url.parse(req.url);
  let filePath = `${__dirname}${baseURI.pathname == '/' ? '/index.htm' : baseURI.pathname}`;

  // check if the reqest file
  fs.access(filePath, fs.F_OK, error => {
    if (!error) {
      // read and serve the file over response
      fs.readFile(filePath, (error, content) => {
        if (!error) {
          let contentType = mimes[path.extname(filePath)];
          res.writeHead(200, {'Content-Type': contentType});
          res.end(content, 'utf-8');
        } else {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Server Error</h1>');
        }
      })
    } else {
      // server a 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Content not found</h1>');
    }
  });
};

http.createServer(webServer).listen(3000, () => {
  console.log('server running on port 3000');
});