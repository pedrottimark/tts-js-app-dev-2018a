'use strict';

var TodoState = function (state) {
  this.filterText = state.visibilityFilter;
  this.todoList = state.todos;
};

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
console.log('\ntodoState.filterCompleted()\n', todoState.filterCompleted());
