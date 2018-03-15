# JavaScript tools, part 2

Good news about tools to build Web applications is minimum configuration if you understand defaults!

## Copy files

To copy JavaScript files to edit during in-class challenges, if current directory is `tts-js-app-dev-2018a`

* Command prompt in Microsoft Windows:

  ```sh
  chdir 2018-03-15

  mkdir db
  copy db.json db

  mkdir dist
  copy index.html dist

  mkdir src
  copy *.css src
  copy *.jpg src
  copy *.js src

  npm install
  ```

* Shell in Linux or Terminal in Apple macOS:

  ```sh
  cd 2018-03-15

  mkdir db
  cp db.json db

  mkdir dist
  cp index.html dist

  mkdir src
  cp *.css src
  cp *.jpg src
  cp *.js src

  npm install
  ```

## Learning objectives

1. Replace global scope in scripts with module export, import, and scope in CommonJS.

2. Replace multiple code, style, and image files with one bundle.

3. Write unit tests for pure functions.

## Review of module scope in CommonJS

### Challenge 1 logic.js

Get together in different pairs than recent lessons for our first **challenge** to replace:

* global scope with module scope
* `window.logic` with `module.exports`

Edit the `logic.js` file that is in the `src` subdirectory:

1. Delete beginning and end of Immediately Invoked Function Expression (IIFE)

    * line at beginning: `window.logic = (function () {`
    * line at end: `}());`

2. To fix the indentation, cut all the lines except `'use strict';` and then paste

3. Replace `return {` with `module.exports = {`

Will a volunteer please explain which parts of this file are public and private.

### Challenge 2 index.js

Change roles for our second **challenge** to replace global variables with `require` calls.

Edit the `index.js` file that is in the `src` subdirectory:

1. Replace the `/* global logic */` comment for ESLint with `var logic = require('./logic');`

2. Add `var jQuery = require('jquery');` above the line that you edited in the previous step

Will a volunteer please explain the difference in meaning between:

* `'./logic'` with period and slash
* `'jquery'` without period and slash

Will another volunteer please:

* Name the file in which `jquery` is specified for the project.

* Explain what the following command does and how to know whether we need to do it:

    ```sh
    npm install --save jquery
    ```

## Module bundling with webpack

Webpack builds a dependency graph [from top down] that includes every module your application needs, then packages all of those modules into one or more bundles.

As a contrast, both `grunt` or `gulp` process files by type [from bottom up].

Node.js “understands” CommonJS modules, but Web browsers do not. This is one of the many problems that **webpack** solves: convert from CommonJS to ordinary JavaScript.

Let’s watch [Webpack from First Principles](https://youtu.be/WQue1AN93YU) by Glen Maddern (14 minutes)

### Challenge 3 script elements in index.html

Change roles for our next **challenge** to bundle the JavaScript code into one file.

In the `index.html` file that is in the `dist` subdirectory:

1. Delete the first two `script` elements
2. In the last `script` element, replace `index.js` with `bundle.js`

In a Command Prompt or Terminal window:

1. Type `npm run build` and then press Enter or Return.
2. Type `npm start &` and then press Enter or Return. Notice the number. Type `kill -9 nnnn` to stop the server. If `&` causes an error in Command Prompt, then open another Command Prompt window, type `npm start` and then press Enter or Return.

In a Web browser, open a new tab, type `localhost:3000/index.html` in address bar, and then press Enter or Return to make a request.

* Notice that the page has **no** style.
* In the Command Prompt, Terminal, or Shell window, notice response code **404** for the `index.css` file.

Will a volunteer please say where `json-server` looks for but does not find the `index.css` file?

Will another volunteer please name the file in the project which includes npm scripts?

Will another volunteer please explain what the following command does and how to know whether we need to do it:

```sh
npm install --save-dev webpack webpack-cli
```

### Challenge 4 link element in index.html

Change roles for our next **challenge** to include style and image files in the bundle.

1. In the `index.html` file that is in the `dist` subdirectory, delete the `<link rel="stylesheet" href="index.css"/>` element.

2. In the `index.js` file that is in the `src` subdirectory, add `require('./index.css');` following the assignments to required modules.

3. In a Command Prompt or Terminal window, type `npm run build` and then press Enter or Return.

4. In a Web browser, refresh the `localhost:3000/index.html` tab. Notice that the page has style.

5. In the `Name of returning doer` box, type `lesson12` and then click the `Log on` button.

6. Toggle or add or delete some items, and then click the `Log off` button.

7. In the `Name of new doer` box, type your GitHub user name, and then click `Sign up` button.

8. Add some items and toggle some of them as completed.

Will a volunteer suggest which file in the `dist` or `src` subdirectory might refer to the image file?

Let’s look at the `webpack.config.js` file.

If the loaders were not already under `devDependencies` in the `package.json` file, here are the commands that we would need to run to install them:

```sh
npm install --save-dev file-loader
npm install --save-dev style-loader css-loader
```

* [file-loader](https://www.npmjs.com/package/file-loader) instructs webpack to emit the required object as file and to return its public URL. By default the filename of the resulting file is the MD5 hash of the file's contents with the original extension of the required resource.
* [style-loader](https://www.npmjs.com/package/style-loader) adds CSS to the DOM by injecting a `style` element
* [css-loader](https://www.npmjs.com/package/css-loader) interprets `@import` and `url()` like `require` and will resolve them.

## Delightful testing with Jest

* Build confidence that JavaScript code works correctly.
* Balance cost and benefit.
* Minimize rework on tests if you refactor code.

### Challenge 5 add.test.js

Change roles for our next **challenge** to write tests for `addItem` method.

1. Edit `add.test.js` file that is in the `src` subdirectory according to the TODO comments. Look at `addItem` method in `logic.js` file.
2. In a Command Prompt or Terminal window, type `npm test -- add` and then press Enter or Return.
3. Replace one `toEqual` with `toBe` assertion in `add.text.js` file, and then rerun the test.
4. Undo the preceding change, and then rerun the test.

### Challenge 6 delete.test.js

Change roles for our next **challenge** to write tests for `deleteItem` method.

1. Edit `delete.test.js` file that is in the `src` subdirectory according to the TODO comments. You will need to look at `deleteItem` method in `logic.js` file.
2. In a Command Prompt or Terminal window, type `npm test -- delete` and then press Enter or Return.

### Challenge 7 find.test.js

Change roles for our next **challenge** to write tests for `findItem` method.

1. Edit `find.test.js` file that is in the `src` subdirectory according to the TODO comments. You will need to look at `findItem` method in `logic.js` file and briefly read the one sentence description of array [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method.
2. In a Command Prompt or Terminal window, type `npm test -- find` and then press Enter or Return.
3. Read the description of [toBe](https://facebook.github.io/jest/docs/en/expect.html#tobevalue) and [toEqual](https://facebook.github.io/jest/docs/en/expect.html#toequalvalue) assertions.

Will a volunteer please explain why these tests call `toBe` instead of `toEqual` assertions?

### Challenge 8 replace.test.js

Change roles for our next **challenge** to write tests for `replaceText` method.

1. Edit `replace.test.js` file that is in the `src` subdirectory according to the TODO comments. You will need to look at `replaceText` method in `logic.js` file.
2. In a Command Prompt or Terminal window, type `npm test -- replace` and then press Enter or Return.

### Challenge 9 toggle.test.js

Change roles for our next **challenge** to write tests for `toggleCompleted` method.

1. Edit `toggle.test.js` file that is in the `src` subdirectory according to the TODO comments. You will need to look at `replaceText` method in `logic.js` file.
2. In a Command Prompt or Terminal window, type `npm test -- toggle` and then press Enter or Return.
3. In a Command Prompt or Terminal window, type `npm test` and then press Enter or Return.

## Review of asynchronous functions

The `async` and `await` keywords in ES2017 describe asynchronous functions with promises in sequential steps, but without chains or callbacks.

* `async` is a keyword for the function definition
* `await` is for success instead of `then` method of promise
* `catch` block of `try` statement is for failure instead of `catch` method of promise
* asynchronous functions return a promise, regardless of what the return value is within the function

### Challenge 10 getDoers

Change roles for our next **challenge** to replace promise chain with `async` and `await` in the `index.js` file that is in the `src` subdirectory.

```js
var getDoer = function (id, callbackSuccess, callbackFailure) {
  // To get an array of objects, url consists of plural noun:
  fetch('/doers/' + id)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(callbackSuccess)
    .catch();
};
```

1. Add `async` preceding the `function` definition that is assigned to `getDoer`
2. Replace `fetch('/doers/' + id)` with `var response = await fetch('/doers/' + id);`
3. Add an empty line preceding the first `then` method call
4. Cut `if` statement out of first `then` method call, and then paste it on line preceding empty line
5. Cut `response.json();` out of first `then` method call and paste it as `var doer = await response.json();` on line preceding empty line
6. Cut `callbackSuccess` out of second `then` method call and paste it as `callbackSuccess(doer);` on line preceding empty line
7. Delete the two `then` method calls
8. Cut the lines preceding the empty line
9. Add `try {} catch (error) {}` preceding the empty line, and then paste the lines that you cut inside the `try` block braces.
10. Cut `callbackFailure` and out of `catch` method call, and then paste it as `callbackFailure(error);` inside the `catch` block braces.
11. Delete the `catch` method call and the empty line

### Challenge 11 putDoer

Change roles for our next **challenge** to replace promise chain with `async` and `await` in the `index.js` file that is in the `src` subdirectory.

```js
var putDoer = function (doer, callbackSuccess, callbackFailure) {
  // To put item in array of objects, url consists of plural noun, and then id:
  fetch('/doers/' + doer.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doer),
  }).then(callbackSuccess)
    .catch(callbackFailure);
};
```

The procedure is shorter than challenge 10 because only one `then` method call. Another difference is the argument `callbackSuccess(response);`

### Challenge 12 postDoer

Change roles for our next **challenge** to replace promise chain with `async` and `await` in the `index.js` file that is in the `src` subdirectory.

```js
var postDoer = function (doer, callbackSuccess, callbackFailure) {
  // To add an object to an array, url consists of plural noun:
  fetch('/doers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doer),
  }).then(callbackSuccess)
    .catch(callbackFailure);
};
```

The procedure is shorter than challenge 10 because only one `then` method call. Another difference is the argument `callbackSuccess(response);`

## Homework

1. Watch again [Webpack from First Principles](https://youtu.be/WQue1AN93YU) by Glen Maddern (14 minutes)

2. Read some documentation pages about Webpack:

    * [Getting Started](https://webpack.js.org/guides/get-started/)
    * [Entry Points](https://webpack.js.org/concepts/entry-points/)
    * [Output](https://webpack.js.org/concepts/output/)
    * [Loaders](https://webpack.js.org/concepts/loaders/)
    * [Plugins](https://webpack.js.org/concepts/plugins/)

3. Watch [Write tests. Not too many. Mostly integration.](https://www.youtube.com/watch?v=Fha2bVoC8SE) by Kent C. Dodds (17 minutes)

4. Watch [Jest Snapshots and Beyond](https://www.youtube.com/watch?v=HAuXJVI_bUs) by Rogelio Guzman (26 minutes)

5. Visit some documentation pages about Jest:

    * Scan [Expect](https://facebook.github.io/jest/docs/en/expect.html) to see the assertions
    * Read [Testing Asynchronous Code](https://facebook.github.io/jest/docs/en/asynchronous.html)
    * Skim [An Async Example](https://facebook.github.io/jest/docs/en/tutorial-async.html)

6. To improve the resources for previous Lesson 10 about asynchronous JavaScript, search for an article about “offline first” development, and then if it seems helpful, paste a link into our Slack channel. Here is an example that I found: [How we built Watsi Coverage without stable electricity, WiFi, or email](http://blog.watsi.org/engineering-challenges/)

7. To get a head start in ECMAScript 2015, read the chapter about [Sets and Maps](https://leanpub.com/understandinges6/read#leanpub-auto-sets-and-maps) by Nicolas C. Zakas
