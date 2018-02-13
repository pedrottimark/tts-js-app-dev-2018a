// Given a todo list array and a todo item object,
// return a copy of the array in which item has been added to the end.
function addTodoItem(todoList, todoItem) {
  return todoList.concat(todoItem);
}

var todoList = [
  {completed: true, text: 'Distinguish braces in context'},
  {completed: false, text: 'Read parts of a function literal'},
];

console.log('original length before add: ' + todoList.length);

var todoListCopy = addTodoItem(
  todoList,
  {completed: false, text: 'Trace effects of a function call'}
);

console.log('original length after add:  ' + todoList.length);
console.log('    copy length after add:  ' + todoListCopy.length);
