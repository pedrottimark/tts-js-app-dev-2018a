var todoList = [
  {completed: true, text: 'Distinguish braces in context'},
  {completed: false, text: 'Read parts of a function literal'},
  {completed: false, text: 'Trace effects of a function call'},
];

var logTodoItem = function (todoItem) {
  var completedString = todoItem.completed ? '  completed' : 'uncompleted';
  console.log(completedString + ' ' + todoItem.text);
}

var toggleCompleted = function (todoItem) {
  todoItem.completed = !todoItem.completed;
}

var subtext = process.argv[2];

if (typeof subtext === 'string' && subtext.length !== 0) {
  for (i = 0; i !== todoList.length; i += 1) {
    var todoItem = todoList[i];
    if (todoItem.text.indexOf(subtext) !== -1) {
      toggleCompleted(todoItem);
      logTodoItem(todoItem);
    }
  }
}
