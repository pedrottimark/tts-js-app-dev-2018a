'use strict';

var http = require('http');

// Initialize state of application.
var todos = [
  {completed: true, text: 'Did that'},
  {completed: false, text: 'Do this'},
];

// Given previous array and text string,
// return next array which has at end a new todo item with text.
var addItem = function (todos, text) {
  return todos.concat({
    completed: false,
    text: text,
  });
};

// Given todo item as object, return markup as string.
var renderItem = function (todoItem) {
  return '<li completed="' +
    (todoItem.completed ? 'completed' : 'uncompleted') +
    '">' +
    todoItem.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
    '</li>';
};

// Given todo items as array, return markup as string.
var renderPage = function (todoItems) {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"/><title>04-http-post</title></head>',
    '<body>',
    '<ul>' + todoItems.map(renderItem).join('') + '</ul>',
    '<form action="/" method="post">',
    '<input type="text" name="textOfNewItem" placeholder="text of new item">',
    '<button type="submit">Add item</button>',
    '</form>',
    '</body>',
    '</html>',
  ].join('');
};

// Given URL-encoded string, return minimally decoded string.
var decode = function (string) {
  return string.replace(/\+/g, ' ').replace(/%2B/g, '+');
};

var port = parseInt(process.argv[2], 10) || 3000; // can give on command line

http.createServer(function (req, res) {
  console.log(req.method, req.url);
  var body = '';

  try {
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(renderPage(todos));
    } else if (req.url === '/' && req.method === 'POST') {
      req.on('data', function (chunk) {
        console.info('Called function for data event');

        body += chunk;
      });
      req.on('end', function () {
        console.info('Called function for end event');
        console.info('Posted:\n' + body);

        todos = addItem(todos, decode(body.replace('textOfNewItem=', '')));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(renderPage(todos)); // display page with new todo item
      });

      console.info('Added callback functions for data and end events');
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
