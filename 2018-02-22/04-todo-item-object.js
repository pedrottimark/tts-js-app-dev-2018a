'use strict';

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

var todoItem1 = getTodoItem('Encapsulate object creation in virtual constructors.', true);
var todoItem2 = getTodoItem('Read and write constructor functions.', false);
var todoItem3 = getTodoItem('Call constructor functions with `new` to create instances of objects.');

console.log(todoItem1);
console.log(todoItem2);
console.log(todoItem3);
