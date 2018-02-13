// Given a todo list array and a todo item object,
// add item to the end of array.
var addTodoItem = function (todoList, todoItem) {
  todoList./* TODO array method */(todoItem);
}

var todoList = [
  {completed: true, text: 'Distinguish braces in context'},
  {completed: false, text: 'Read parts of a function literal'},
];

console.log('length before add: ' + todoList.length);

addTodoItem(
  todoList,
  {completed: false, text: 'Trace effects of a function call'}
);

console.log('length after add:  ' + todoList.length);
