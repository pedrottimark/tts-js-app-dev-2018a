'use strict';

var TodoItem = function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  this.text = text;
  this.completed = completed;
};

// Given text as string and optional completed as boolean,
// return todo item as object.
// TODO write the getTodoItem virtual constructor function :)

var todoItem1 = getTodoItem('Encapsulate object creation in virtual constructors.');
var todoItem2 = getTodoItem('Read and write constructor functions.');
var todoItem3 = getTodoItem('Call constructor functions with `new` to create instances of objects.');

console.log(todoItem1);
console.log(todoItem2);
console.log(todoItem3);
