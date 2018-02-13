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
  // TODO use literal notation to return a new object:
  //      its text property has same value as todoItem
  //      its completed property has opposite boolean value as todoItem
}

var subtext = process.argv[2];

if (typeof subtext === 'string' && subtext.length !== 0) {
  // Toggle completed for every todo item whose text contains subtext.
  for (i = 0; i !== todoList.length; i += 1) {
    var todoItem = todoList[i];
    if (todoItem.text.indexOf(subtext) !== -1) {
      var todoItemCopy = toggleCompleted(todoItem);
      console.log('\nOriginal item and toggle copy:')
      logTodoItem(todoItem);
      logTodoItem(todoItemCopy);
    }
  }
}
