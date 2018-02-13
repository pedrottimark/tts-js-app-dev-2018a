# Lesson 3: Functions, part 1

## Learn git, part 2

After you use `git clone <URL>` and then change some files, here are steps **before** you copy changes from the GitHub repository to your local repository.

If `git status` reports `Changes not staged for commit` then do any of the following:

* To **discard** changes to specific files: `git checkout -- <file>...`

* To commit changes to **specific** files: `git add <file>...` and then `git commit -m "explain why files changed"`

* To commit changes to **all** files: `git add --all` and then `git commit -m "explain why files changed"`

When `git status` reports `nothing to commit, working tree clean` then type `git pull` to copy changes (for example, a new directory for the current lesson).

## Copy files

To copy JavaScript files to edit during in-class challenges, if current directory is `tts-js-app-dev-2018a`

* Command prompt in Microsoft Windows:

  ```sh
  chdir 2018-02-13
  mkdir copied
  copy *.js copied
  chdir copied
  ```

* Linux or Terminal in Apple macOS:

  ```sh
  cd 2018-02-13
  mkdir copied
  cp *.js copied
  cd copied
  ```

## Example application

For this and many future lessons, we will use a **to-do list** application as an example:

* a to-do list, written as `todo` in JavaScript, is an **array** of…
* …todo items: **objects** which have `completed` and `text` as property keys

```js
var todoList = [
  {completed: true, text: 'Distinguish braces in context'},
  {completed: false, text: 'Read parts of a function literal'},
  {completed: false, text: 'Trace effects of a function call'},
];
```

## Function analogy

You define a function to call in JavaScript for the same reason as a cookbook explains the ingredients and steps to make a pie crust. It is a **common procedure** so various pie recipes can refer to it without repeating it.

You might think of **input** as the amount of ingredients and whether or not to do certain steps:

* single recipe for one pie
* double recipe for two pies
* reduced recipe without top crust for pecan or pumpkin pie

You might think of **output** as:

* the crust in this example
* a **change** to ingredients, also known as a side effect, in an example like sauté

## Learning objectives

1. Distinguish braces in context:

    * statement block from Lesson 1
    * object literal from Lesson 2
    * function literal from Lesson 3

2. Read parts of a function literal:

    * arguments receive input
    * body does work
    * `return` gives output

3. Trace effects of a function call from call into body, and back again.

4. Write functions as expressions or declarations.

5. Write impure functions for mutable data or pure functions for immutable data.

## Function literal

Like an array or an object, a function has a literal notation:

* array: `[ /* items */ ]`
* object: `{ /* properties */ }`
* function: `function ( /* arguments */ ) { /* body */ }`

You have already seen parentheses and braces in some statements:

* `if ( … ) { … }`
* `for ( … ) { … }`
* `switch ( … ) { … }`
* `while ( … ) { … }`

A function **literal** has the following parts:

* arguments, also known as parameters, receive **input**
* body does **work**
* `return` statement in body gives **output**

Let’s identify the parts of the following function literal:

```js
// Given completed as boolean, return the opposite value.

function (completed) { return !completed; }
```

* argument `completed` receives **input**
* body does **work** to compute the opposite value `!completed`
* `return !completed;` gives the opposite value as **output**

Let’s identify the parts of the following function literal:

```js
// Given text as string and optional completed as boolean,
// return todo item as object.

function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  return {
    text: text,
    completed: completed,
  };
}
```

* arguments `text` and `completed` receive **input**
* body does **work** to put argument (or default) values in an object literal
* `return` statement gives the object as **output**

Train your eyes to distinguish the meaning of **braces** in context:

* function literal: `function ( /* arguments */ ) { /* body */ }`
* object literal: `{ /* properties */ }`

Train your eyes to distinguish the meaning of **names** in context:

* function arguments: `text` and `completed`
* object keys: `text` and `completed`

When you **write** code, you do not have to make the names consistent.

When you **read** code, you can understand more quickly if the names are consistent.

## Function call

A function **call**, also known as function invocation, is an expression which has:

* name, for example: `getTodoItem`
* actual arguments in parentheses, for example: `('Distinguish braces in context', true)`

```js
var todoItem = getTodoItem('Distinguish braces in context', true);
```

A `return` statement in the body gives the value of a function call:

Will a volunteer please suggest what is the value if the body has no `return` statement?

Let’s see how a function gets a name so you can call it.

## 01-function-expression

Because a function literal is a value, you can assign it to a variable, and then use the variable name to call the function:

```js
// Given text as string and optional completed as boolean,
// return todo item as object.
var getTodoItem = function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  return {
    text: text,
    completed: completed,
  };
};
```

Will three volunteers please trace the effects of one of the following function calls from the call into the function body, and back again:

```js
var todoItem1 = getTodoItem('Distinguish braces in context', true);
var todoItem2 = getTodoItem('Read parts of a function literal', false);
var todoItem3 = getTodoItem('Trace effects of a function call');
```

If a function call receives a function literal as an actual argument, that argument is known as a **callback** function. In Lesson 5 next week, you will learn to write application-specific callback functions for generic array methods like `filter`, `map`, `reduce`, and `forEach`.

## 02-function-declaration

A name is a required part of a function **declaration**:

```js
// Given text as string and optional completed as boolean,
// return todo item as object.
function getTodoItem(text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  return {
    text: text,
    completed: completed,
  };
}
```

## 03-function-expression-challenge

In different pairs than the last lesson, please edit your copy of the JavaScript file as our first **challenge**.

Using what you learned in both lessons last week, assign to the `completedString` variable:

* a value which depends on…
* …a property of an object, which is the value of the argument

```js
var logTodoItem = function (todoItem) {
  // TODO The completedString variable is either:
  //      '  completed' if completed property is true
  //      'uncompleted' if completed property is false
  console.log(completedString + ' ' + todoItem.text);
}
```

## 04-function-declaration-challenge

Change roles for our second **challenge** to write:

* three parts of a `for` loop
* argument of a function call

```js
function logTodoItems(todoList) {
  for (/* TODO initialize variable; test condition; increment variable */) {
    logTodoItem(/* TODO current item in array */);
  }
};
```

## 05-add-item-impure-challenge

Change roles for our next **challenge** to fill in an array method to add an item to the end.

```js
// Given a todo list array and a todo item object,
// add item to the end of array.
var addTodoItem = function (todoList, todoItem) {
  todoList./* TODO array method */(todoItem);
}
```

A function is known as **impure** if it changes, also known as **mutates**, one or more of its arguments.

A function which has no `return` statement is usually impure.

In this example, the impure function changes an array argument to give output.

Therefore, the `todoList` array is known as **mutable** data.

## 06-add-item-pure

```js
// Given a todo list array and a todo item object,
// return a copy of the array in which item has been added to the end.
function addTodoItem(todoList, todoItem) {
  return todoList.concat(todoItem);
}
```

A function is known as **pure** if:

* Given the same arguments, it always returns the same value.
* It does not changes any of its arguments.
* It does not cause any side effects, including API calls, for example: `console.log(…)`

In this example, the pure function returns a new array.

Therefore, the `todoList` array is known as **immutable** data.

## 07-toggle-item-impure

Will a volunteer please trace an example of a function call:

```js
var toggleCompleted = function (todoItem) {
  todoItem.completed = !todoItem.completed;
}
```

Will another volunteer please explain why the preceding function is **impure**.

## 08-toggle-item-pure-challenge

Change roles for our next **challenge** to return an object literal from a pure `toggleCompleted` function:

```js
var toggleCompleted = function (todoItem) {
  // TODO use literal notation to return a new object:
  //      its text property has same value as todoItem
  //      its completed property has opposite boolean value as todoItem
}
```

Will a challenge pair please volunteer:

* Pilot: write your function on the board and trace an example of a function call
* Navigator: explain why the function is **pure**

## 09-toggle-items-pure

After you write a pure function to return a new **object** whose `completed` property has the opposite boolean value, you can write a pure function to return a new **array** in which a new object replaces the old object.

After y’all have had a few minutes to run and discuss the example code, will another challenge pair please volunteer:

* One trace an example of a function call.
* Other explain why the function is pure.

```js
// Given todoList as array of todo item objects and subtext, return new array:
// old item, if its text does not include subtext
// new item whose completed property is toggled, if its text includes subtext
var toggleItems = function (todoList, subtext) {
  var todoListCopy = [];

  for (i = 0; i !== todoList.length; i += 1) {
    var todoItem = todoList[i];
    todoListCopy[i] = todoItem.text.indexOf(subtext) !== -1
      ? toggleCompleted(todoItem)
      : todoItem;
  }

  return todoListCopy;
}
```

## Homework

* From this lesson: review the example code (especially in-class challenges)
* From this lesson: if we ran out of time for some files, run examples or complete challenges
* From last lesson: because we ran out of time for some files, run examples or complete challenges
