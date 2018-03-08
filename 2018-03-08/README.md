# Asynchronous JavaScript

In *Understanding ECMAScript 6*, Nicholas C. Zakas explains:

> JavaScript engines can execute only one piece of code at a time, so they need to keep track of code that is meant to run.
> That code is kept in a job queue. Job execution runs from the first job in the queue to the last.
> When a user clicks a button, an event like `onClick` is triggered.
> That event might respond to the interaction by adding a new job to the back of the job queue.

## Copy files

To copy JavaScript files to edit during in-class challenges, if current directory is `tts-js-app-dev-2018a`

* Command prompt in Microsoft Windows:

  ```sh
  chdir 2018-03-08
  mkdir copied
  copy *.css copied
  copy *.html copied
  copy *.js copied
  copy db.json copied
  npm install
  ```

* Shell in Linux or Terminal in Apple macOS:

  ```sh
  cd 2018-03-08
  mkdir copied
  cp *.css copied
  cp *.html copied
  cp *.js copied
  cp db.json copied
  npm install
  ```

You will learn about `npm` in Lesson 11. For now, `npm install` means download `json-server` and `eslint` dependencies specified in `package.json` file:

```js
"devDependencies": {
  "json-server": "^0.12.1",
  "eslint": "^4.17.0"
},
```

## Learning objectives

1. Read server code that responds to `GET` and `POST` requests.

2. Read and write requests which apply the REST pattern.

3. Call `fetch` to make `GET`, `PUT`, and `POST` requests.

4. Write promise chains to handle success or failure of `fetch` requests.

5. Rewrite promise chains with `async` and `await` keywords.

## Hypertext Transfer Protocol (HTTP)

In [Hypertext Transfer Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP) (HTTP) a client makes a **request** to a server, and then the server sends a **response**.

A client provides a callback function whenever it makes a request, so it can “listen” for other events on the Web page while it waits for a response from the server.

[HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), also known as verbs, include:

* `GET` requests a representation of the specified resource (for example, a web page)
* `PUT` replaces the specified resource with the request payload (for example, stringified JSON)
* `POST` submits data to the specified resource (for example, inputs from a form)
* `DELETE` deletes the specified resource (for example, an obsolete todo item)

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) indicate whether a request succeeded or failed:

* `200` means **OK** the request succeeded. The message body of the response:

    * to `GET` contains a representation of the requested resource
    * to `PUT` or `POST` contains a resource which describes the result of the action

* `404` means the request failed because the resource is **Not Found**. In REST, the generic part of the “endpoint” might be valid, but the specific resource does not exist.

* `500` means the request failed because of an **Internal Server Error**.

## HTTP module in Node.js

You will learn about Node.js modules in Lesson 11. For now, `require('http')` returns the built-in [http](https://nodejs.org/dist/latest-v9.x/docs/api/http.html) object. It is not global like `JSON` or `document` objects.

```js
var http = require('http');
```

### 01-http-get-200

The `createServer` method is a virtual constructor which returns a server instance.

Its argument is a function which the server calls whenever it receives a request:

The `req` object has properties to interpret a **request**, including `method` and `url`

The `res` object has properties to build a **response**, including:

* `writeHead` provides a status code and [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
* `end` appends (the rest of) the body and completes the response

In a concise chain like jQuery, call a method of the server instance to “listen” for requests on a specific port (for example, 80 is for requests on the World Wide Web).

```js
var port = parseInt(process.argv[2], 10) || 3000; // can give on command line

http.createServer(function (req, res) {
  console.log(req.method, req.url);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(renderPage());
}).listen(port);

console.info('Created HTTP server to listen on port: ' + port);
```

1. In Command Prompt or Terminal, type `node 01-http-get-200` and then press Enter or Return.
2. In a Web browser, open a new tab, and then type `localhost:3000/` in address bar, and then press Enter or Return to make a request.
3. Edit in address bar to add `unexpected` and then press Enter or Return to make a request.
4. In Command Prompt or Terminal, hold down Ctrl or Control key, and then press C.

Will a volunteer please trace the code and explain the order of lines in the console.

Will another volunteer please suggest a problem with the response to the second request.

### 02-http-get-404

The response depends on the `url` property of the `req` object.

```js
http.createServer(function (req, res) {
  console.log(req.method, req.url);

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(renderPage());
  } else {
    res.writeHead(404);
    res.end('Not Found: ' + req.url);
  }
}).listen(port);
```

1. In Command Prompt or Terminal, type `node 02-http-get-404` and then press Enter or Return.
2. In a Web browser, type `localhost:3000/` in address bar, and then press Enter or Return to make a request. Will a volunteer please trace the code.
3. Edit in address bar to add `unexpected` and then press Enter or Return to make a request. Will a volunteer please trace the code.
4. In Command Prompt or Terminal, hold down Ctrl or Control key, and then press C.

To see a creative `404` response, visit in a Web browser: `https://egghead.io/unexpected`

### 03-http-get-500

Server developers think of `404` as an **external** error, whether someone mistypes in the address bar or a page on the site has an incorrect link.

Write code in a `try` statement with a `catch` block so the server keeps running after an **internal** error.

```js
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
```

1. In Command Prompt or Terminal, type `node 03-http-get-500` and then press Enter or Return.
2. In a Web browser, type `localhost:3000/` in address bar, and then press Enter or Return to make a request. Will a volunteer please trace the code.
3. Edit in address bar to add `unexpected` and then press Enter or Return to make a request. Will a volunteer please trace the code.
4. In Command Prompt or Terminal, hold down Ctrl or Control key, and then press C.

A server keeps a private log of errors, but doesn’t include implemetation details in the public response.

Better late than never, you will learn in Lesson 11 how ESLint can find many errors while you type code, before you run it!

### 04-http-post

A `POST` request has a **stream** with `data` and `end` events, so that the Web server can respond to other requests if the body consists of much text (for example, from a `textarea` element).

```js
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
    } else { … }
  } catch (error) { … }
}).listen(port);
```

1. In Command Prompt or Terminal, type `node 04-http-post` and then press Enter or Return.
2. In a Web browser, type `localhost:3000/` in address bar, and then press Enter or Return to make a request. Will a volunteer please trace the code.
3. Click in the `text of new item` box, type text, and then click the `Add item` button. Will a volunteer please trace the code.
4. Click in the `text of new item` box, type text, and then press Enter or Return. Will a volunteer please trace the code.
5. In Command Prompt or Terminal, hold down Ctrl or Control key, and then press C.

## Representational State Transfer (REST)

To make a long story short, REST is a pattern to **describe** an application programming interface (API) also known as “endpoints” so client-side JavaScript code in a Web page can exchange data with a server:

* If the data is an array of objects, the URL consists of a **plural noun**, like `/todos`
* If the data is an item in an array, the URL has an **index** or **id**, like `/todos/1`
* If the data is an object, the URL consists of a **singular noun**, like `/view`

A more realistic REST API might include `users` as a plural noun and a string as id, like `/users/pedrottimark/todos`

## Fetch

The global [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function makes a request and returns the response as a promise (see next section).

* The default is a `GET` request:

    ```js
    fetch(url)
    ```

* Provide options to make a request with another method and send a “payload” of data as JSON:

    ```js
    fetch(url, {
      method: method, // 'PUT' or 'POST' or 'DELETE'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    ```

## Promise chains in ES2015

A [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a placeholder for the result of an asynchronous operation.

The `fetch` function returns the response as a promise, so you can write each callback function as a separate argument in a **chain** of `then` and `catch` methods.

### 05-fetch-put-todo challenge 1

Here is an example of `then` and `catch` methods for a default `fetch` call:

```js
var getTodos = function (callback) {
  // To get an array of objects, url consists of plural noun:
  fetch('/todos')
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(callback)
    .catch(function (error) {
      console.error('getTodos: ' + error.message);
    });
};
```

The caller of `getTodos` provides a function to receive the `todos` array from the response if and when the request succeeds:

```js
getTodos(function (todos) {
  // Update state of application:
  state = Object.assign({}, state, {
    todos: todos,
  });

  // Update interface of application:
  appendItems(ul, todos, onClickItem);
  updateHeading();
  updateList();
});
```

The `onClickItem` event handler:

* updates the state of the application, as in the previous lesson
* calls `putTodo` to send a `PUT` request which updates the state of the server
* updates interface of the application, as in the previous lesson

```js
var onClickItem = function (index, event) {
  // $(event.currentTarget) wraps the DOM element in a jQuery collection.
  var li = $(event.currentTarget);
  state = logic.toggleCompleted(state, index);
  putTodo(state.todos[index]);
  updateItem(li, state.todos[index]);
  updateHeading(); // display changed state
};
```

In pairs, edit your copied script file as our first **challenge** to implement `putTodo` function which is called from `onClickItem` event handler.

```js
var putTodo = function (todoItem) {
  // TODO url represents item in todos array with id property, for example: /todos/1
  fetch('/todos/' + todoItem.id, {
    // TODO options
    // method is 'PUT'
    // headers and body are as example code under Fetch in README.md
  }).catch(function (error) {
    console.error('putTodo: ' + error.message);
  });
};
```

1. Make sure to edit the `05-fetch-put-todo.js` file in the **copied** subdirectory.
2. After you have saved your changes, in Command Prompt or Terminal: `npm start`
3. In a Web browser, type `localhost:3000/05-fetch-put-todo.html` in address bar, and then press Enter or Return to run the client-side application.
4. In developer tools of the Web browser, look at the Console pane.
5. In your code editor, open the `db.json` file in the **copied** subdirectory, and then look at the `completed` property of one todo todoItem.
6. In the Web browser, click that todo item to toggle its `completed` property.
7. In your code editor, look at the `completed` property that todo item.

You will learn about `npm` in Lesson 11. For now, `npm start` means run command specified in `package.json` file:

```js
"scripts": {
  "start": "json-server --watch ./copied/db.json --static ./copied"
},
```

### 06-fetch-put-view challenge 2

Here is an example of `Promise.all` method whose argument is an array of promises from `fetch` calls to two “endpoints” on the server for the Todo List application. It returns a promise which is fulfilled when **every** promise has been resolved.

```js
var getState = function (callback) {
  Promise.all([
    fetch('/todos').then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }),
    fetch('/view').then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }),
  ]).then(callback)
    .catch(function (error) {
      console.error('getState: ' + error.message);
    });
};
```

The caller of `getState` provides a function to receive an array of data from the response if and when the request succeeds:

```js
getState(function (array) {
  // Update state of application:
  state = {
    todos: array[0],
    view: array[1],
  };

  // Update interface of application:  
  appendItems(ul, state.todos, onClickItem);
  updateHeading();
  updateFilter();
  updateList();
});
```

The `onChangeFilter` event handler:

* updates the state of the application, as in the previous lesson
* calls `putView` to send a `PUT` request which updates the state of the server
* updates interface of the application, as in the previous lesson

```js
var onChangeFilter = function (event) {
  var visibilityFilter = event.target.value;
  state = logic.changeFilter(state, visibilityFilter);
  putView(state.view);
  updateList();
};
```

Change roles for our second **challenge** to implement `putView` function which is called from `onChangeFilter` event handler.

```js
var putView = function (view) {
  // TODO because data is an object, url consists of a singular noun: /view
  fetch(/* url */, {
    // TODO options
    // method is 'PUT'
    // headers and body are as example code under Fetch in README.md
  }).catch(function (error) {
    console.error('putView: ' + error.message);
  });
};
```

1. Make sure to edit the `06-fetch-put-view.js` file in the **copied** subdirectory.
2. After you have saved your changes, in a Web browser, type `localhost:3000/06-fetch-put-view.html` in address bar, and then press Enter or Return to run the client-side application.
5. In your code editor, look at the `view` property at the end of the `db.json` file in the **copied** subdirectory.
6. In the Web browser, click a different radio button in the visibility filter area.
7. In your code editor, look at the `view` property.

### 07-fetch-post challenge 3

The `onSubmitAdder` event handler:

* updates the state of the application, as in the previous lesson
* calls `postTodo` to send a `POST` request which updates the state of the server
* updates interface of the application, as in the previous lesson

```js
var onSubmitAdder = function (event) {
  event.preventDefault(); // do not post form to server
  var index = state.todos.length; // index of new item to be added
  state = logic.addItem(state, inputAdder[0].value); // get the text
  postTodo(state.todos[index]);
  ul.append(renderItem(state.todos[index], index, onClickItem));
  inputAdder[0].value = ''; // clear the text
  updateHeading(); // display changed state
};
```

Change roles for our next **challenge** to implement `postTodo` function which is called from `onSubmitAdder` event handler.

```js
var postTodo = function (todoItem) {
  // TODO to add an object into an array, url consists of plural noun: /todos
  fetch(/* url */, {
    // TODO options
    // method is 'POST'
    // headers and body are as putTodo
  }).catch(function (error) {
    console.error('postTodo: ' + error.message);
  });
};
```

1. Make sure to edit the `07-fetch-post.js` file in the **copied** subdirectory.
2. After you have saved your changes, in a Web browser, type `localhost:3000/07-fetch-post.html` in address bar, and then press Enter or Return to run the client-side application.
5. In your code editor, look at the last todo item in the `db.json` file in the **copied** subdirectory.
6. In the Web browser, type the text of a new item in the input box, and then click **Add item**.
7. In your code editor, look at the added todo item in the `db.json` file.

## Asynchronous functions in ES2017

To read the body of an asynchronous function with promises but without chains or callbacks:

* `async` is a keyword for the function definition
* `await` is for success instead of `then` method of promise
* `catch` block of `try` statement is for failure instead of `catch` method of promise
* asynchronous functions return a promise, regardless of what the return value is within the function

### 08-async-put-todo challenge 4

Change roles for our next **challenge** to convert `putTodo` to an asynchronous function with `async` and `await` keywords.

```js
// TODO add async preceding function
var putTodo = function (todoItem) {
  try {
    // TODO url represents item in todos array with id property, for example: /todos/1
    // TODO add await preceding fetch
    fetch(/* url */, {
      // TODO options
      // method is 'PUT'
      // headers and body are as example code under Fetch in README.md
    });
  } catch (error) {
    console.error('putTodo: ' + error.message);
  }
};
```

1. Make sure to edit the `08-async-put-todo.js` file in the **copied** subdirectory.
2. After you have saved your changes, in Command Prompt or Terminal: `npm start`
3. In a Web browser, type `localhost:3000/08-async-put-todo.html` in address bar, and then press Enter or Return to run the client-side application.
4. In developer tools of the Web browser, look at the Console pane.
5. In your code editor, open the `db.json` file in the **copied** subdirectory, and then look at the `completed` property of one todo todoItem.
6. In the Web browser, click that todo item to toggle its `completed` property.
7. In your code editor, look at the `completed` property that todo item.

### 09-async-put-view challenge 5

Change roles for our next **challenge** to convert `putView` to an asynchronous function with `async` and `await` keywords.

```js
// TODO add async preceding function
var putView = function (view) {
  try {
    // TODO because data is an object, url consists of a singular noun: /view
    // TODO add await preceding fetch
    fetch('/view', {
      // TODO options
      // method is 'PUT'
      // headers and body are as example code under Fetch in README.md
    });
  } catch (error) {
    console.error('putView: ' + error.message);
  }
};
```

1. Make sure to edit the `09-async-put-view.js` file in the **copied** subdirectory.
2. After you have saved your changes, in a Web browser, type `localhost:3000/09-async-put-view.html` in address bar, and then press Enter or Return to run the client-side application.
5. In your code editor, look at the `view` property at the end of the `db.json` file in the **copied** subdirectory.
6. In the Web browser, click a different radio button in the visibility filter area.
7. In your code editor, look at the `view` property.

### 10-async-post challenge 6

Change roles for our next **challenge** to convert `postTodo` to an asynchronous function with `async` and `await` keywords.

```js
// TODO add async preceding function
var postTodo = function (todoItem) {
  try {
    // TODO to add an object into an array, url consists of plural noun: /todos
    // TODO add await preceding fetch
    fetch('/todos', {
      // TODO options
      // method is 'POST'
      // headers and body are as putTodo
    });
  } catch (error) {
    console.error('postTodo: ' + error.message);
  }
};
```

1. Make sure to edit the `10-async-post.js` file in the **copied** subdirectory.
2. After you have saved your changes, in a Web browser, type `localhost:3000/10-async-post.html` in address bar, and then press Enter or Return to run the client-side application.
5. In your code editor, look at the last todo item in the `db.json` file in the **copied** subdirectory.
6. In the Web browser, type the text of a new item in the input box, and then click **Add item**.
7. In your code editor, look at the added todo item in the `db.json` file.

## Learning resources

Here are realistic examples in case you need to read the code of an earlier [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) single-page application:

* For more responsive user experience, client-side JavaScript code makes [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (XHR) to a server for (any type of) data, and then updates the DOM instead of reloading the entire Web page. See `13-xhr-get`

* For XHR as for DOM, jQuery [AJAX](http://api.jquery.com/category/ajax/) methods are more concise. See `14-jquery-get`, `15-jquery-put`, and `16-jquery-post`

Run these example just like the challenges:

1. Type in Command Prompt or Terminal: `npm start`
2. Type in address bar of Web browser: `localhost:3000/13-xhr-get.html` and so on
3. In your code editor, look at `db.json` file in the **copied** subdirectory.

## Homework

Read about [json-server](https://github.com/typicode/json-server) project and [JSONPlaceholder](https://jsonplaceholder.typicode.com) service.

Read chapter about [Promises](https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming) by Nicolas C. Zakas

Read blog article about [async & await](https://davidwalsh.name/async-await) by David Walsh

Add **Delete item** button to each todo item: render it, handle event, update state, call `fetch` to send request.

Optional stretch goal: To **edit** the text of an item, render in a `div` aligned at the right of each `li` element: an **Edit** button which, after you click it, displays a `form` element which contains a text input box and **OK** and **Cancel** buttons. Hints:

* In the `12-logic-homework.js` script file: Write a pure `replaceText` function.
* In the `12-app-homework.js` script file: Render the text of each todo item in a `p` element in the `li` element. Adapt the code for the adder form to an editor form.
* In the `12-app-homework.css` file: Adapt the style for the adder form to an editor form.
