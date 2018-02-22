'use strict';

var TodoItem = function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  this.text = text;
  this.completed = completed;
};

// Assign opposite value to completed property of todo item instance.
// TODO write toggleCompleted method on prototype of TodoItem

// Given text as string and optional completed as boolean,
// return todo item as object.
var getTodoItem = function (text, completed) {
  return new TodoItem(text, completed);
};

var todoItem4 = getTodoItem('Read and write `this` to refer to the instance in constructor and methods.', true);
var todoItem5 = getTodoItem('Rewrite functions as methods on the `prototype` of a constructor function.', false);

console.log('Before toggleCompleted:\n');
console.log(todoItem4);
console.log(todoItem5);

todoItem4.toggleCompleted();
todoItem5.toggleCompleted();

console.log('\nAfter toggleCompleted:\n');
console.log(todoItem4);
console.log(todoItem5);
