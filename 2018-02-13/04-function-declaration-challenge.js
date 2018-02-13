function logTodoItem(todoItem) {
  var completedString = todoItem.completed ? '  completed' : 'uncompleted';
  console.log(completedString + ' ' + todoItem.text);
};

function logTodoItems(todoList) {
  for (/* TODO initialize variable; test condition; increment variable */) {
    logTodoItem(/* TODO current item in array */);
  }
};

logTodoItems(
  [
    {completed: true, text: 'Distinguish braces in context'},
    {completed: false, text: 'Read parts of a function literal'},
    {completed: false, text: 'Trace effects of a function call'},
  ]
);
