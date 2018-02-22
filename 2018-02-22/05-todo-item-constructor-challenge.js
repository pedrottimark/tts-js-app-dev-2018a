'use strict';

/*
var getTodoItem = function (text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  return {
    text: text,
    completed: completed,
  };
};
*/

// Given text as string and optional completed as boolean,
// return todo item as object.
// TODO write the TodoItem constructor function :)


var todoItem1 = new TodoItem('Encapsulate object creation in virtual constructors.', true);
var todoItem2 = new TodoItem('Read and write constructor functions.', false);
var todoItem3 = new TodoItem('Call constructor functions with `new` to create instances of objects.');

console.log(todoItem1);
console.log(todoItem2);
console.log(todoItem3);
