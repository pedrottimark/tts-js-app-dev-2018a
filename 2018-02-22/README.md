# Lesson 6: Functions and objects

You will learn one of the ways to combine **functions** and **objects** in fluent JavaScript:

* **state** as data properties in instances of objects
* **behavior** as function properties in the `prototype` of a constructor

## Learning objectives

1. Encapsulate object creation in virtual constructors.

2. Read and write constructor functions.

3. Call constructor functions with `new` to create instances of objects.

4. Read and write `this` to refer to the instance in constructor and methods.

5. Rewrite functions as methods on the `prototype` of a constructor function.

## Constructor and prototype, part 1

### 01-todo-state-closure

In software, **encapsulate** means hide details which might change.

For example, a **virtual constructor** function encapsulates how to create object instances.

A [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) is the combination of a function and the lexical environment within which that function was declared.

The “lexical environment” means you can **read** the code to understand the **scope** of names.

In the following example, a **closure** combines:

* a `filterCompleted` function
* its lexical environment which includes the `filterText` and `todoList` variables

```js
// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
// * method to filter “visible” todo items
var getTodoState = function (state) {
  var filterText = state.visibilityFilter;
  var todoList = state.todos;

  // Return a new array of todo items which match the completed filter.
  var filterCompleted = function () {
    return todoList.filter(function (todoItem) {
      if (filterText === 'completed') {
        return todoItem.completed;
      }
      if (filterText === 'uncompleted') {
        return !todoItem.completed;
      }
      return true;
    });
  };

  return {
    filterText: filterText,
    todoList: todoList,
    filterCompleted: filterCompleted,
  };
};
```

This is an effective (but not well known) way to construct one or a few instances.

Will three volunteers please explain what you remember from Lesson 5 about:

* `filter` method
* `map` method
* `reduce` method

### 02-todo-state-constructor

To replace the preceding `getTodoState` function with a **constructor** function:

* Change the **name** to `TodoState` which begins with **upper case** letter.
* Keep the same **arguments** and any statements in body for default values.
* Replace variable declarations with **assignment statements** to properties of `this` keyword.
* Omit the `return` statement, because return is implied when you call it with `new` keyword.
* Write a **virtual constructor** function which returns an instance created by calling the `TodoState` constructor function with `new` keyword.

```js
// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
var TodoState = function (state) {
  this.filterText = state.visibilityFilter;
  this.todoList = state.todos;
};

var getTodoState = function (state) {
  return new TodoState(state);
}
```

### 03-todo-state-prototype

To replace the preceding `filterCompleted` method of an object instance with a method on the `prototype` of the `TodoList` constructor function:

* Replace variable declaration with **assignment statements** to a property of `TodoList.prototype` object.
* Replace variables the innermost scope of closure with properties of `this` keyword, which refers to the current instance.

```js
TodoState.prototype.filterCompleted = function () {
  var filterText = this.filterText;

  return this.todoList.filter(function (todoItem) {
    if (filterText === 'completed') {
      return todoItem.completed;
    }
    if (filterText === 'uncompleted') {
      return !todoItem.completed;
    }
    return true;
  });
};
```

### 04-todo-item-object

Here is a virtual constructor function which returns an object literal:

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

### 05-todo-item-constructor-challenge

In pairs, edit your copied JavaScript file as our first **challenge** to write a `TodoItem` constructor function:

* It has the same arguments as the preceding `getTodoItem` function.
* From body from preceding `getTodoItem` function in comment, copy and paste the `if` statement.
* Instead of returning object literal, assign `text` and `completed` to properties of `this` keyword.

### 06-todo-item-virtual-constructor-challenge

Change roles for our second **challenge** to write a `getTodoItem` virtual constructor function which returns an instance created by calling the `TodoItem` constructor function with `new` keyword.

## Compare pure functions and impure methods

### 07-replace-text-pure-challenge

Change roles for our next **challenge** to write a pure `replaceText` function which returns a new object literal.

```js
// Given todo item as object and text as string,
// return a new object whose text property has the argument value.
```

### 08-toggle-completed-pure-challenge

Change roles for our next **challenge** to write a pure `toggleCompleted` function which returns a new object literal.

```js
// Given todo item as object,
// return a new object whose completed property has the opposite value.
```

### 09-replace-text-prototype-challenge

Change roles for our next **challenge** to write a `replaceText` method on the prototype of the `TodoItem` constructor function.

```js
// Given text as string, replace that property value of todo item instance.
```

### 10-toggle-completed-prototype-challenge

Change roles for our next **challenge** to write a `toggleCompleted` method on the prototype of the `TodoItem` constructor function.

```js
// Assign opposite value to completed property of todo item instance.
```

## Constructor and prototype, part 2

### 11-todo-state-constructor-challenge

Change roles for our next **challenge** to use Array `map` method with application-specific callback function which returns an instance created by calling the `TodoItem` constructor function with `new` keyword.

```js
// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
// * method to filter “visible” todo items
var TodoState = function (state) {
  this.filterText = state.visibilityFilter;
  this.todoList = state.todos.map(function (item) {
    // TODO return todo item instance
  });
};
```

### 12-todo-state-prototype-challenge

Change roles for our next **challenge** to use Array `reduce` method with application-specific callback function which counts the number of `TodoItem` instances which match the filter criterion.

```js
TodoState.prototype.countCompleted = function () {
  var filterText = this.filterText;

  return this.todoList.reduce(function (n, todoItem) {
    if (filterText === 'completed') {
      if (todoItem.completed) {
        return /* TODO */;
      }
      return /* TODO */;
    }

    if (filterText === 'uncompleted') {
      if (!todoItem.completed) {
        return /* TODO */;
      }
      return /* TODO */;
    }

    return n + 1;
  });
};
```

## Homework

* From this lesson: review the example code (especially in-class challenges)
* From this lesson: if we ran out of time for some files, run examples or complete challenges
* [Read sample](https://leanpub.com/oopinjavascript/read_sample) chapter about Primitive and Reference Types from *The Principles of Object-Oriented JavaScript* by Nicholas C. Zakas
