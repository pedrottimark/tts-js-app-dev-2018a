'use strict';

var http = require('http');

// Return markup as string.
var renderPage = function () {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"/><title>03-http-get-500</title></head>',
    '<body>',
    '<form action="/" method="post">',
    '<input type="text" name="textOfNewItem" placeholder="text of new item">',
    '<button type="submit">Add item</button>',
    '</form>',
    '</body>',
    '</html>',
  ].join('');
};

var port = parseInt(process.argv[2], 10) || 3000; // can give on command line

http.createServer(function (req, res) {
  console.log(req.method, req.url);

  try {
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(renderPageX()); // intentional mispelling to throw an error
    } else {
      res.writeHead(404);
      res.end('Not Found: ' + req.url);
    }
  } catch (error) {
    console.error(error.message);

    res.writeHead(500);
    res.end('Server Error');
  }
}).listen(port);

console.info('Created HTTP server to listen on port: ' + port);
