# Lesson 14: ECMAScript 2015, part 2

ECMAScript 2015 is also known as ES2015 or ES6. What does the name mean?

* **ECMA**Script is the **ideal** language that is published as a standard.
* **Java**Script is the **actual** language in specific versions of Node.js or browsers.

Goal for many improvements in ES2015:

* Communicate your meaning more **declaratively** and less imperatively.
* In other words, you describe **what** to do instead of tell how to do it.

Concise notations help you separate:

* **Generic** patterns, which you learn better and better by repetition.
* **Specific** details, which you must understand quickly in each application.

## Learning objectives

1. Rewrite CommonJS modules as ECMAScript modules.

2. Delete redundant names in object literals via initializer shorthand.

3. Rewrite multiple occurrences of dot notation as object destructuring.

4. Rewrite multiple occurrences of bracket notation as array destructuring.

5. Replace array methods with `...` spread operator for pure update.

6. Replace `Object.assign` with `...` spread operator for pure update.

7. Move constructor and prototype functions into the class body.

## Copy files

To copy JavaScript files to edit during in-class challenges, if current directory is `tts-js-app-dev-2018a`

* Command prompt in Microsoft Windows:

  ```sh
  chdir 2018-03-22

  copy logic-prototype.js logic-class.js

  mkdir db
  copy db.json db

  mkdir dist
  copy index.html dist

  mkdir src
  copy index.css src
  copy index.js src
  copy logic.js src
  copy off.jpg src
  ```

* Shell in Linux or Terminal in Apple macOS:

  ```sh
  cd 2018-03-22

  cp logic-prototype.js logic-class.js

  mkdir db
  cp db.json db

  mkdir dist
  cp index.html dist

  mkdir src
  cp index.css src
  cp index.js src
  cp logic.js src
  cp off.jpg src
  ```

And then:

1. `npm install`
2. `npm start`
3. In a second Command Prompt, Shell, or Terminal window: `npm run build`
4. In a Web browser, open a new tab, type `localhost:3000/index.html` in address bar, and then press Enter or Return. The `db.json` file has names of returning doers: `lesson10`, `lesson12`, `lesson14`
5. In developer tools of browser tab, open Console pane.

When you built the application, did you see `WARNING in asset size limit`? I replaced `file-loader` with `url-loader` in `webpack.config.js` file for this lesson. It was a step backward, because unlike the video, the image file is large JPEG instead of small SVG. As homework you will search for information about `webpack` plugins to reduce size of production bundle, especially from images.

To check your work after challenges, see `index-completed.js` and `logic-completed.js` in `2018-03-22` directory.

## ECMAScript modules

ECMAScript module files run in strict mode without a `'use strict';` directive.

The `export` and `import` keywords are easier to read than CommonJS modules.

Webpack converts either modules to classic JavaScript that runs in browsers.

Here are some patterns for modules. Of course, exported values are not limited to functions.

| CommonJS | ECMAScript |
| :--- | :--- |
| `module.exports = function (…) { … };` | `export default function (…) { … };` |
| `var oneOrManyThings = require('./exporter')`; | `import oneThing from './exporter';` |
| `module.exports.key1 = function (…) { … };` | `export const key1 = function (…) { … };` |
| `module.exports.key2 = function (…) { … };` | `export const key2 = function (…) { … };` |
| `var key1 = manyThings.key1;` | |
| `var key2 = manyThings.key2;` | `import {key1, key2} from './exporter';` |

### Challenge 1 export

Work in pairs and **both** edit your `logic.js` files in `src` subdirectory:

1. Delete `'use strict';` at the beginning.

2. Delete `module.exports = {` near the beginning and delete `};` at the end

3. To export by name, follow the pattern for each of the five public functions:

    * Replace `addItem: function (state, text) {` with `export const addItem = function (state, text) {`
    * Replace `},` with `};`

4. If your editor displays indentation problems and can fix them, select `Fix all indent problems`

5. If your editor does not fix indentation of comments, fix them yourself

### Challenge 2 import

Work in pairs and **both** edit your `index.js` files in `src` subdirectory:

1. Delete `'use strict';` at the beginning.

2. To import a default export, replace `var jQuery = require('jquery');` with `import jQuery from 'jquery';`

3. To import named exports, replace `var logic = require('./logic');` with `import {addItem, deleteItem, findItem, toggleCompleted} from './logic';`

4. In 4 occurrences, find and replace `logic.` with nothing, because you imported the functions by name.

5. To import the style for webpack, replace `require('./index.css');` with `import './index.css';`

6. In your second Command Prompt, Shell, or Terminal window: `npm run build`

7. Refresh your Web browser tab.

## Improved object and array literals

With **object** literal notation, set and get values when variable name is same as property key:

| classic JavaScript | ECMAScript 2015 |
| :--- | :--- |
| `var todoItem = {text: text};` | `const todoItem = {text};` |
| `var text = todoItem.text;` | `const {text} = todoItem;` |

With **array** literal notation, get items by name instead of by index.

The table below contrasts assignment statements in body of callback function for `then` method of promise chain:

```js
Promise.all([
  fetch('/todos').then(…),
  fetch('/view').then(…),
]).then(function (results) {/* see table below */})
  .catch(function (error) {/* do something */});
```

| classic JavaScript | ECMAScript 2015 |
| :--- | :--- |
| `var todos = results[0];` | |
| `var view = results[1];` | `const [todos, view] = results;` |

Will a volunteer please suggest what is the value in a destructuring assignment statement if the object does not have a property with the key or if the array does not have an item at the index.

After you have finished editing files **for each** of the following challenges:

1. In your second Command Prompt, Shell, or Terminal window: `npm run build`

2. Refresh your Web browser tab.

Lesson 20 will demonstrate immediate feedback after you save changes to code via “hot reloading” in `webpack` with `create-react-app` and `redux` packages.

### Challenge 3 initializer shorthand

Work in pairs and **both** edit your files.

1. In `logic.js` file in `src` subdirectory, replace `text: text` with `text`

    * in `addItem` function
    * in `replaceText` function

2. In `index.js` file in `src` subdirectory, find `renderRadio` function, and then:

    * replace `name: name` with `name`
    * replace `value: value` with `value`

### Challenge 4 object destructuring

Work in pairs and **both** edit your `index.js` files in `src` subdirectory:

1. Replace dot notation with object destructuring assignment statement:

    ```js
    var updateItem = function (li, todoItem) {
      const {completed, text} = todoItem;
      li.attr('class', completed ? 'completed' : 'uncompleted');
      li.find('p').text(text);
    };
    ```

2. Rebuild and refresh.

3. Move object destructuring from assignment statement to function argument:

    ```js
    var updateItem = function (li, {completed, text}) {
      li.attr('class', completed ? 'completed' : 'uncompleted');
      li.find('p').text(text);
    };
    ```

4. Rebuild and refresh.

By the way, `import` with named exports looks like object destructuring, but technically it isn’t.

### Example of array destructuring

With array destructuring and initializer shorthand, you can understand application-specific details more quickly in this function call from Lesson 10 Asynchronous JavaScript:

```js
// Update state of application after successful requests.
getState(function ([todos, view])) {
  state = {
    todos,
    view,
  };
  // Update interface of application.
})
```

### Challenge 5 array spread

In a [new] literal array, `...` spread operator means “spread out” the items of an [existing] array.

Analogy: like “spread out” cards in a hand

The array literal implies that the result is a new array for a pure update.

| classic JavaScript | ECMAScript 2015 |
| --- | --- |
| `[].concat(hearts, diamonds, clubs, spades)` | `[...hearts, ...diamonds, ...clubs, ...spades]` |
| `cards.concat()` or `cards.slice()` | `[...cards]` |
| `todos.concat(todoItem)` | `[...todos, todoItem]` |

Work in pairs and **both** edit your `logic.js` files in `src` subdirectory.

1. In `addItem` function, cut the object literal argument of `state.todos.concat()`

2. Edit and paste to replace that array method call with the following:

    ```js
    todos: [
      ...state.todos,
      {
        id: idNext(state.todos),
        completed: false,
        text,
      }
    ]
    ```

We still recommend array methods with callback functions, like `filter`, `map`, and `reduce`

### Challenge 6 object spread

ECMAScript 2018 includes `...` spread operator for pure update to object properties. It works in Node.js 8.6.0, Firefox 55, Chrome 60, Safari 11.1, but not Edge 17.

The last value for a repeated key is the winner:

| ECMAScript 2015 | ECMAScript 2018 |
| --- | --- |
| `Object.assign({}, object, {key: value})` | `{...object, key: value}` |

Work in pairs and **both** edit your `logic.js` files in `src` subdirectory.

1. Replace `Object.assign` with object literal and `...` spread operator in functions:

    * `addItem`
    * `deleteItem`
    * `replaceText` has 2 occurrences
    * `toggleCompleted` has 2 occurrences

2. After you have rebuilt and refreshed, sign up as a new doer, and then test the following:

    * Add a new item.
    * Add another new item.
    * Click the first item to toggle its `completed` property.
    * Click `uncompleted` and then `completed` radio buttons.
    * Delete the completed item.
    * Click `all` radio button.

3. Make sure that the data is correct in `db.json` file in `db` subdirectory

## Challenge 7 class

The constructor and methods of a class run in strict mode without a `'use strict';` directive.

In this challenge, you edit an impure version of logic similar to Lesson 6. Because the Todo List application does not use this version, you do not need to rebuild and refresh. Instead, as an example of how unit tests increase your confidence to refactor code, you run the tests in `logic.test.js` before and after you make the changes.

Work in pairs and **both** edit your `logic-class.js` files in `2018-03-22` subdirectory.

1. In your second Command Prompt, Shell, or Terminal window: `npm test`

2. Add a class declaration preceding the constructor function:

    ```js
    class State {
    }
    ```

3. Move constructor function into the class body:

    * Replace `const State = function (name, todos) {` with `constructor (name, todos) {`

    * Delete `;` at end of former assignment statement

    * Cut constructor function, and then paste inside class body

    * Cut its comment, and then paste it inside class body (separate paste work better in Code editor)

4. Move the 5 prototype methods into the class body. For example:

    * Replace `State.prototype.addItem = function (text) {` with `addItem(text) {`

    * Delete `;` at end of former assignment statement

    * Cut `addItem` method, and then paste inside class body

    * Cut its comment, and then paste it inside class body (separate paste work better in Code editor)

5. In your second Command Prompt, Shell, or Terminal window: `npm test`

Here are the commands that I used to install Jest and Babel in `package.json` file:

```sh
npm install --save-dev jest
npm install --save-dev babel-jest babel-core babel-plugin-transform-es2015-modules-commonjs
```

For more information how to set up Jest:

* [Getting Started](https://facebook.github.io/jest/docs/en/getting-started.html)
* [Using Babel](https://facebook.github.io/jest/docs/en/getting-started.html#using-babel)

## Review of ECMAScript 2015, part 1

Practice what you learned in Lesson 13.

After you have finished editing files **for each** of the following challenges:

1. In your second Command Prompt, Shell, or Terminal window: `npm run build`

2. Refresh your Web browser tab.

### Challenge 8 template literal

Work in pairs and **both** edit your `index.js` files in `src` subdirectory.

1. In `getDoer` function, rewrite `fetch('/doers/' + id.replace(/\W/g, ''))`

2. In `putDoer` function, rewrite `fetch('/doers/' + doer.id, { … })`

3. In `updateFilter` function, rewrite `find('input[value="' + visibilityFilter + '"]')`

The first step limits **untrusted** input to safe characters. Of course, alphanumeric characters are an unrealistic limit in applications for a global audience.

The regular expression `\W` to remove invalid characters is opposite to `\w` to allow valid characters in the `input` elements which have attributes:

* `pattern="\\w+"`
* `title="one or more alphanumeric characters including underscore"`

For more information, see:

* [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

### Challenge 9 let

Work in pairs and **both** edit your `index.js` files in `src` subdirectory.

1. Rewrite `var state = null;` with `let`

2. Rewrite `var visibilityFilter = 'all';` with `let`

3. Rewrite `var h1;` and the following 12 assignment statements with `let`

Will a volunteer please suggest how to know whether the assignment statements in steps 1 and 2 can be rewritten as `const` or must be rewritten as `let`

Will another volunteer please suggest how to know that the assignment statements in step 3 cannot be rewritten as `const` and must be rewritten as `let`

### Challenge 10 const

Work in pairs and **both** edit your files in `src` subdirectory.

1. In `index.js` file, rewrite the rest of `var` declarations with `const`

2. In `logic.js` file, rewrite the only `var` declaration with `const`

### Challenge 11 arrow function

Before you rewrite a classic function as an arrow function, decide which pattern to follow:

* implicit return: `(/* arguments */) => value`
* implicit return of object literal: `(/* arguments */) => ({/* properties */})`
* explicit return: `(/* arguments */) { /* statements */ return value; }`
* no return: `(/* arguments */) => { /* statements */ }`

Work in pairs and **both** edit your `logic.js` files in `src` subdirectory.

1. For `idNext`

    * rewrite as implicit return

    * rewrite the callback function of `reduce` method as implicit return

2. For `addItem` rewrite as implicit return of object literal (in parentheses because object literal looks like a function body)

3. For `deleteItem` rewrite similar to step 2, and then also rewrite callback function of `filter` method as implicit return

4. For `findItem` rewrite similar to step 2, and then also rewrite callback function of `find` method as implicit return

5. For `replaceText` rewrite similar to step 2, and then also rewrite callback method of `map` method as explicit return

6. For `toggleCompleted` rewrite similar to step 2, and then also rewrite callback method of `map` method as explicit return

### Challenge 12 arrow functions

Work in pairs and **both** edit your `index.js` files in `src` subdirectory.

For example:

* rewrite `renderRadio` and `renderFilter` as explicit return
* rewrite `updateItem` and `appendItems` as no return

Will a volunteer please describe what you did with the `async` function definitions?

Will another volunteer please describe what you did the the callback functions in `getDoer`, `putDoer`, and `postDoer` function calls?

## Resources

1. Reminder when you forget something you knew: [Learn ES2015](https://babeljs.io/learn-es2015/) at babeljs.io
2. Depth when you need to know more: [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read) by Nicholas C. Zakas
3. News you can use: [2ality – JavaScript and more](http://2ality.com/) blog by Dr. Axel Rauschmayer

## Homework

1. Find example of rest arguments in [Learn ES2015](https://babeljs.io/learn-es2015/) at babeljs.io
2. Read [Destructuring for Easier Data Access](https://leanpub.com/understandinges6/read#leanpub-auto-destructuring-for-easier-data-access) by Nicholas C. Zakas
3. Read [JavaScript’s a mess – and that’s a good thing](http://2ality.com/2018/02/js-backward-compatibility.html) by Dr. Axel Rauschmayer
4. View [Read and write arrow functions](https://speakerdeck.com/pedrottimark/arrow-functions-columbia-front-end) by pedrottimark
5. View [Understand spread operators](https://speakerdeck.com/pedrottimark/understand-spread-operators-cltjs) by pedrottimark
6. Read unit tests in the `logic-class.test.js` file
7. Search for information about `webpack` plugins to reduce size of production bundle, especially from images.
