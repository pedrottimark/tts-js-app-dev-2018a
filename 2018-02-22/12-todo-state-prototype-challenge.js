'use strict';

var TodoItem = function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  this.text = text;
  this.completed = completed;
};

// Given text as string, replace that property value of todo item instance.
TodoItem.prototype.replaceText = function (text) {
  this.text = text;
};

// Assign opposite value to completed property of todo item instance.
TodoItem.prototype.toggleCompleted = function () {
  this.completed = !this.completed;
};

// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
// * method to filter “visible” todo items
var TodoState = function (state) {
  this.filterText = state.visibilityFilter;
  this.todoList = state.todos.map(function (item) {
    return new TodoItem(item.text, item.completed);
  });
};

TodoState.prototype.addItem = function (text, completed) {
  this.todoList.push(new TodoItem(text, completed));
};

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

// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
// * method to filter “visible” todo items
var getTodoState = function (state) {
  return new TodoState(state);
};

var receivedString = [
  '{',
  '"visibilityFilter":"completed",',
  '"todos":[',
  '{"completed":false,"text":"Encapsulate object creation in virtual constructors."},',
  '{"completed":false,"text":"Read and write constructor functions."},',
  '{"completed":false,"text":"Call constructor functions with `new` to create instances of objects."},',
  '{"completed":true,"text":"Read and write `this` to refer to the instance in constructor and methods."},',
  '{"completed":true,"text":"Rewrite functions as methods on the `prototype` of a constructor function."}',
  ']',
  '}',
].join('');

var parsedObject = JSON.parse(receivedString);
var todoState = getTodoState(parsedObject);

console.log('receivedString\n', receivedString);
console.log('\nparsedObject\n', parsedObject);
console.log('\ntodoState\n', todoState);
console.log('\ncountCompleted', todoState.countCompleted());
