'use strict';

// Given object with property keys received from server,
// return object which has:
// * renamed property keys for client application
var TodoState = function (state) {
  this.filterText = state.visibilityFilter;
  this.todoList = state.todos;
};

var getTodoState = function (state) {
  return new TodoState(state);
};

var receivedString = [
  '{',
  '"visibilityFilter":"completed",',
  '"todos":[',
  '{"completed":true,"text":"Encapsulate object creation in virtual constructors."},',
  '{"completed":false,"text":"Read and write constructor functions."},',
  '{"completed":false,"text":"Call constructor functions with `new` to create instances of objects."}',
  ']',
  '}',
].join('');

var parsedObject = JSON.parse(receivedString);
var todoState = getTodoState(parsedObject);

console.log('receivedString\n', receivedString);
console.log('\nparsedObject\n', parsedObject);
console.log('\ntodoState\n', todoState);
