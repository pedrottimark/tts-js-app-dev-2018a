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

// Given todo item as object,
// return a new object whose completed property has the opposite value.
// TODO write the toggleCompleted function :)

var todoItem4 = getTodoItem('Read and write `this` to refer to the instance in constructor and methods.', true);
var todoItem5 = getTodoItem('Rewrite functions as methods on the `prototype` of a constructor function.', false);

console.log('original:\n', todoItem4);
console.log('toggled:\n', toggleCompleted(todoItem4));

console.log('\noriginal:\n', todoItem5);
console.log('toggled:\n', toggleCompleted(todoItem5));
