# Lesson 9: jQuery

> Write less, do more.
> Find something, do something.

```js
// Find element whose id attribute is root, and then set its text.
jQuery('#root').text('Hello, jQuery!');
```

## Copy files

To copy JavaScript files to edit during in-class challenges, if current directory is `tts-js-app-dev-2018a`

* Command prompt in Microsoft Windows:

  ```sh
  chdir 2018-03-06
  mkdir copied
  copy *.css copied
  copy *.html copied
  copy *.js copied
  chdir copied
  ```

* Shell in Linux or Terminal in Apple macOS:

  ```sh
  cd 2018-03-06
  mkdir copied
  cp *.css copied
  cp *.html copied
  cp *.js copied
  cd copied
  ```

## jQuery function

The `jQuery` function is a virtual constructor. `$` is a more concise nickname for it.

The **type** of argument determines **what** it does:

* `$(markupString)` **creates** elements: `$('<li/>')` or `$('<input type="text"/>')`
* `$(selectorString)` **finds** elements: `$('#root')` or `$('li')` or `$('.completed')`
* `$(element)` **wraps** a DOM element: `$(event.target)` or `$(this)`
* `$(function () {…})` calls function after DOM is ready for JavaScript code to execute.

It always returns an [array-like object](https://learn.jquery.com/using-jquery-core/jquery-object/) that **wraps** a collection of DOM elements:

* It has `length` property.
* It refers to items by integer index.
* It has an intuitive [API](http://api.jquery.com/) with many methods for [manipulation](http://api.jquery.com/category/manipulation/), [events](http://api.jquery.com/category/events/), and [traversing](http://api.jquery.com/category/traversing/)

Although the jQuery collections contain one DOM element in this lesson, unlike DOM methods:

* jQuery methods do not throw an error if the collection is empty (that is, contains zero elements).
* jQuery methods are called with an invisible implied loop if the collection has multiple elements.

## Convert DOM methods and properties to jQuery

Your challenges come from Todo List application as in the last lesson, this time in jQuery:

| DOM | jQuery |
| :--- | :--- |
| `document.createElement('ul')` | `$('<ul/>')` |
| `ul.setAttribute('class', 'list')` | `ul.attr('class', 'list')` |
| `ul.appendChild(li)` | `ul.append(li)` |
| `li.innerHTML = escapeHTML(text)` | `li.text(text)` |
| `li.addEventListener('click', onClickItem)` | `li.on('click', onClickItem)` |
| `document.querySelector('#root')` | `$('#root')` |
| `form.querySelector('input')` | `form.find('input')` |

To get or set **properties** of a DOM element, you can refer to the DOM element by its index `[0]` in the jQuery collection:

| DOM | jQuery |
| :--- | :--- |
| `ul.className = …;` | `ul[0].className = …;` |
| `var text = inputAdder.value;` | `var text = inputAdder[0].value;` |
| `inputAdder.value = '';` | `inputAdder[0].value = '';` |

## Primary learning objectives

1. Render **markup** from data, also known as the state of the application:

    * Call `$(markupString)` to create elements.
    * Call `attr` and `append` methods of jQuery collections.
    * Assign text (safely) with `text` method of jQuery collections.

2. Add **interactive** behavior to rendered markup:

    * Write a callback function for each event.
    * If an event changes the state, we recommend that a callback function call a **logic** function.
    * If a state change affects another element, we recommend that a callback function call an **update** function.
    * Read and write `currentTarget` and `target` properties of event object.
    * Read and write `preventDefault` method of event object, especially in forms or links.
    * Call `on` method of jQuery collection to register a callback function for an event.

3. Call `find` method with a selector string argument to find a descendant element in the tree structure. If you know CSS selectors, then you have a big head start on [jQuery selectors](http://api.jquery.com/category/selectors/)

## Secondary learning objectives

1. To export values from scripts, assign properties of global `window` object.

2. Read Immediately Invoked Function Expression (IIFE) to **encapsulate** details.

3. Read and write `Object.assign` to update object properties in a pure function.

## Render markup from data

### Create element and set attributes

As the global `document` object has `createElement` method, given markup of an element as lower case string, the `$` function returns a jQuery collection which contains an instance of the element type.

As arrays have various methods, jQuery collections have an `attr` method whose arguments are name and value.

Will two volunteers please each explain one `renderRadio` function call in the following comment:

* from arguments which receive **input**,
* through body which does **work**,
* to `return` which gives **output** illustrated in the line following the call

```js
// renderRadio('visibility', 'uncompleted', 'uncompleted')
// <input type="radio" name="visibility" value="uncompleted" checked="checked"/>
//
// renderRadio('visibility', 'completed', 'uncompleted')
// <input type="radio" name="visibility" value="completed"/>
var renderRadio = function (name, value, visibilityFilter) {
  var input = $('<input/>');

  input.attr('type', 'radio');
  input.attr('name', name);
  input.attr('value', value);

  if (value === visibilityFilter) {
    input.attr('checked', 'checked');
  }

  return input;
};
```

### Append child element to parent element

As arrays have a `push` method, jQuery collections have an `append` method.

Will a volunteer please explain the `renderFilter` function call in the following comment:

* from arguments which receive **input**,
* through body which does **work**,
* to `return` which gives **output** illustrated in the line following the call

```js
// renderFilter('uncompleted')
// <form class="visibility">
// <input type="radio" name="visibility" value="all"/>
// <input type="radio" name="visibility" value="uncompleted" checked="checked"/>
// <input type="radio" name="visibility" value="completed"/>
// </form>
var renderFilter = function (visibilityFilter) {
  var name = 'visibility';

  // You can call in a chain any method that returns a jQuery collection!
  return $('<form/>')
    .attr('class', name)
    .append(renderRadio(name, 'all', visibilityFilter))
    .append(renderRadio(name, 'uncompleted', visibilityFilter))
    .append(renderRadio(name, 'completed', visibilityFilter));
};
```

### Replace content of element

Especially if an element has text content only, call its `text` method.

```js
// <label>uncompleted</label>
var label = $('<label/>').text('uncompleted');
```

If instead of depending on data, the text is fixed, include it in the markup string:

```js
var label = $('<label>uncompleted</label');
```

### Append child text to parent element

If an element has mixed content of elements and text, you can call `createTextNode` method of global `document` object.

Will a volunteer please explain how the code creates the element in the comment:

```js
// <label><input type="radio" name="visibility" value="all"/>all</label>
var label = $('<label/>').append(
  renderRadio('visibility', 'all', visibilityFilter),
  document.createTextNode('all')
);
```

### 01-app-challenge renderHeading

In pairs, edit your copied script file as our first **challenge** to render a heading using:

* `$(markupString)` version of jQuery function call
* `text` method of jQuery collection; or if text is fixed, include it in the markup string
* `append` method of jQuery collection
* `attr` method of jQuery collection; or if attribute is fixed, include it in the markup string

To see the result, open `01-index.html` in a browser window.

### 02-app-challenge renderHeading

Change roles for our second **challenge** to render a heading from data, also known as the **state** of the application.

To see the result, open `02-index.html` in a browser window.

### 03-app-challenge renderList

Change roles for our next **challenge** to render an empty todo list.

To see the result, open `03-index.html` in a browser window, and then in developer tools:

* Look at the Console pane.
* Look at the Inspector pane.

### 04-app-challenge renderItem

Change roles for our next **challenge** to render a todo item from data.

To see the result, open `04-index.html` in a browser window.

This example illustrates that jQuery protects against a **security** problem:

1. Notice no formatting in the second word of each item in the browser window.

2. Open the Inspector pane in developer tools to see no `strong` or `code` child element of each `li` parent element.

3. Open the `index.js` file to see that the `text` properties of the todo item objects contain markup.

### 05-app renderFilter

The `05-app.js` script file has `renderRadio` and `renderFilter` functions which volunteers have already explained, and also illustrates two secondary learning objectives:

* To export the `renderApp` function, assign to `renderApp` property of global `window` object, because assignment to an undeclared variable throws an error in strict mode.

* Immediately Invoked Function Expression (IIFE) encapsulates **private** functions and returns the public function.

In future lessons, you will learn clearer ways to divide and conquer complexity with **modules**.

Will a brave volunteer please explain the following function expression which is immediately called:

* from (no) arguments which receive **input**,
* through body which does **work**,
* to `return` which gives **output**

```js
'use strict';

window.renderApp = (function () {

  var renderHeading = function (todos) { … };
  var renderRadio = function (name, value, visibilityFilter) { … };
  var renderFilter = function (visibilityFilter) { … };
  var renderItem = function (todoItem) { … };
  var renderList = function (todos) { … };

  // renderApp
  return function (state) {
    var h3 = renderHeading(state.todos);
    var formFilter = renderFilter(state.visibilityFilter);
    var ul = renderList(state.todos);

    return $('<section class="TodoList"/>').append(h3, formFilter, ul);
  };

}());
```

The `index.js` file calls `$` with a function argument to solve two problems:

* Call the function **after** the DOM is ready for JavaScript code to execute.
* Encapsulate **private** variables in the closure.

```js
'use strict';

$(function () {
  var receivedString = [
    '{',
    '"visibilityFilter":"all",',
    '"todos":[',
    '{"completed":true,"text":"Render <strong>markup</strong> from data"},',
    '{"completed":false,"text":"Add <strong>interactive</strong> behavior to rendered markup"},',
    '{"completed":false,"text":"Call <code>find</code> method with selector string"}',
    ']',
    '}',
  ].join('');

  var state = JSON.parse(receivedString);

  $('#root').append(renderApp(state, logic));
});
```

## Add interactive behavior to rendered markup

### 06-app onChangeFilter

**Action**: Click a radio input in the visibility filter form.

**Reaction**: Display only the relevant todo items, because `app.css` has rule not to display irrelevant items according to class attributes of `ul` and `li` elements.

The following code illustrates a primary learning objective:

* Write a callback function for an event: `onChangeFilter` function for `change` event of `input` element.

* If an event changes the state, we recommend that a callback function call a **logic** function: `logic.changeFilter(state, visibilityFilter)`

* If a state change affects another element, we recommend that a callback function call an **update** function: `updateList()`

* The `target` property of `event` object refers to the element to which the callback is added (see below).

* The `value` property of an `input` element corresponds to its `value` attribute.

Will a volunteer please explain why the element variables:

* are declared above the function definitions
* are assigned below the function definitions

```js
var h3;
var formFilter;
var ul;

var updateList = function () {
  ul[0].className = state.visibilityFilter + ' list'; // ul[0] is DOM element
};

var onChangeFilter = function (event) {
  var visibilityFilter = event.target.value;
  state = logic.changeFilter(state, visibilityFilter);
  updateList();
};

h3 = renderHeading(state.todos);
formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
ul = renderList(state.todos);

updateList(); // display initial state
```

To export functions from `logic.js` script file, assign to `logic` property of global `window` object:

```js
'use strict';

window.logic = {

  // Given previous state and visibilityFilter string, return next state.
  changeFilter: function (state, visibilityFilter) {
    return Object.assign({}, state, {
      visibilityFilter: visibilityFilter,
    });
  },

};
```

The preceding pure `changeFilter` function illustrates a secondary learning objective: call [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to update object properties.

It merges **into the first** object argument all of the properties in the other object arguments.

* For a **pure** update into a new object, the first argument is an **empty** object literal.
* For an **impure** update into an object, the first argument in a **variable**.

If more than one object has a property, the **last** object which has the property is the winner:

* the `visibilityFilter` property in the third object literal argument
* replaces the `visibilityFilter`  property in the second `state` argument

Call `on` method of jQuery collection which contains element at which the event occurs:

```js
var renderRadio = function (name, value, visibilityFilter, onChangeFilter) {
  var input = $('input')
    .on('change', onChangeFilter);
    // …
};

var renderFilter = function (visibilityFilter, onChangeFilter) {
  var name = 'visibility';
  return $('<form/>')
    .attr('class', name)
    .append(
      renderRadio(name, 'all', visibilityFilter, onChangeFilter).
      renderRadio(name, 'uncompleted', visibilityFilter, onChangeFilter),
      renderRadio(name, 'completed', visibilityFilter, onChangeFilter)
    );
};

var onChangeFilter = function (event) {
  // …
};

formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
```

### 07-app-challenge updateItem

Change roles for our next **challenge** to refactor code so you Don’t Repeat Yourself:

1. Preceding the `renderItem` function, write a `updateItem` function:

    * its arguments are `li` as element and `todoItem` as object
    * into its body, paste the following two lines which you cut from `renderItem`

        ```js
        li.attr('class', todoItem.completed ? 'completed' : 'uncompleted');
        li.text(todoItem.text);
        ```

2. Call the `updateItem` function where you cut the two lines from `renderItem`

To see the result, open `07-index.html` in a browser window.

### 08-app-challenge onClickItem

**Action**: Click a todo item.

**Reaction**: Toggle `completed` property, and then display in list:

* If visibility filter is `all` whether item is uncompleted or completed.
* If visibility filter is not `all` the toggled item disappears.

Change roles for our next **challenge** to add interactive behavior:

1. Following `onChangeFilter` write a `onClickItem` callback function for `click` event of `li` element.

    * its arguments are `index` as integer and `event` as object
    * paste into its body the following calls to logic and update functions:

        ```js
        state = logic.toggleCompleted(state, index);
        // $(event.currentTarget) wraps the DOM element in a jQuery collection.
        updateItem($(event.currentTarget), state.todos[index]);
        ```

2. Add `onClickItem` as a second argument:

    * in `renderList` function call
    * in `renderList` function definition

3. Add `index` as second argument in callback function of `forEach` method in `renderList` function body.

4. Add `index` and `onClickItem` as second and third arguments:

    * in `renderItem` function call in `renderList` function body
    * in `renderItem` function definition

5. Paste `.on('click', onClickItem.bind(null, index));` as a chained method call following the `$('<li/>')` call in `renderItem` function body.

The [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) method returns a new function that, when called, has its `this` keyword set to the first argument, and any other bound arguments precede the arguments when the new function is called. In this example, we bind the index so the callback function instance “knows” which todo item has been clicked.

To see the result, open `08-index.html` in a browser window.

Will a volunteer please explain how did `updateItem` function that you wrote in the preceding challenge keep the code DRY in this challenge.

### 09-app-challenge onSubmitAdder

**Action**:

1. Click in adder input box which follows the list of todo items.

2. Type the text of a new item.

3. Do one of the following:

    * Press **enter** or **return** key.
    * Click **Add item** button.

**Reaction**: If visibility filter is `all` or `uncompleted` display new item at end of list.

Change roles for our next **challenge** to add interactive behavior:

1. Write body of `renderAdder` function according to comments.

2. In two new lines following `var ul;` add variable declaration for:

    * `formAdder`
    * `inputAdder`

3. Following `onClickItem` paste the following `onSubmitAdder` callback function for `submit` event of `form` element.

    ```js
    var onSubmitAdder = function (event) {
      event.preventDefault(); // do not post form to server
      var index = state.todos.length; // index of new item to be added
      state = logic.addItem(state, inputAdder[0].value); // get the text
      ul.append(renderItem(state.todos[index], index, onClickItem));
      inputAdder[0].value = ''; // clear the text
    };
    ```

4. In two new lines following `ul = renderList(state.todos, onClickItem);` add assignment statements:

    * `formAdder = renderAdder(onSubmitAdder);`
    * `inputAdder = formAdder.find('input');`

5. Add `formAdder` as another argument to `append` method call for `section`

To see the result, open `09-index.html` in a browser window.

Notice that the application now displays an incorrect count of all items after you add any items. The next challenge will fix this problem.

Will two volunteers please each explain one of the following:

* Why does the order matter to initialize `index` before calling `addItem` in `onSubmitAdder` callback function?

* Why is `'input'` the selector to find the element assigned to `inputAdder` and what difference does it make to call `find` method of `formAdder` jQuery collection instead of global `$` jQuery object.

### 10-app-challenge updateHeading

Change roles for our next **challenge** to display in heading the (correct) number of uncompleted and all items:

1. In two new lines following `var h3;` add variable declaration for:

    * `spanCountUncompleted`
    * `spanCountAll`

2. Preceding `updateList` add a function declaration for `updateHeading` whose body has assignment statements:

    * Call the `text` method of `spanCountAll` with the expression `state.todos.length`

    * Call the `text` method of `spanCountUncompleted` with the return value:

        ```js
        state.todos.reduce(function (n, todoItem) {
          if (!todoItem.completed) {
            return n + 1; // one more item is uncompleted
          }

          return n;
        }, 0)
        ```

3. In two new lines following `h3 = renderHeading(state.todos)` add assignment statements:

    * `spanCountUncompleted = h3.find('.count.uncompleted');`
    * `spanCountAll = h3.find('.count.all');`

4. In two new lines preceding `updateList()` add:

    * a comment `// Display initial state.`
    * a function call `updateHeading();`

5. Compare the preceding steps to the revised version of `renderHeading` function.

To see the result, open `10-index.html` in a browser window.

Will three volunteers please each explain one of the following:

* How does callback function of `reduce` method count the number of uncompleted items?

* What is a reason **not** to write `state.todos.filter(…).length` to count the number of uncompleted items?

* What do `'.count.uncompleted'` and `'.count.all'` selectors mean?

## Homework

1. From this lesson: review the in-class challenges

2. From this lesson: if we ran out of time, complete the challenges

3. See if you can improve the application so it renders **two** do lists on the same page:

In the `12-index-homework.js` script file:

* Assign `state2` variable to an object literal which has `visibilityFilter` and `todos` properties. In the array value of `todos` property, write a few object literals for your personal todo list.

* Append to the `root` element the child that is returned when you call call `renderApp` with `state2`.

In the `12-app-homework.css` file, add and edit one or more style rules to display the two lists side-by-side. Hint, either of the following:

* [Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
* [Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

Optional stretch goal: To **edit** the text of an item, render in a `div` aligned at the right of each `li` element: an **Edit** button which, after you click it, displays a `form` element which contains a text input box and **OK** and **Cancel** buttons. Hints:

* In the `12-logic-homework.js` script file: Write a pure `replaceText` function.
* In the `12-app-homework.js` script file: Render the text of each todo item in a `p` element in the `li` element. Adapt the code for the adder form to an editor form.
* In the `12-app-homework.css` file: Adapt the style for the adder form to an editor form.
