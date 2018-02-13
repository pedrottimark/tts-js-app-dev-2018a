var logTodoItem = function (todoItem) {
  // TODO The completedString variable is either:
  //      '  completed' if completed property is true
  //      'uncompleted' if completed property is false
  console.log(completedString + ' ' + todoItem.text);
}

logTodoItem({text: 'Distinguish braces in context', completed: true});
logTodoItem({text: 'Read parts of a function literal', completed: false});
logTodoItem({text: 'Trace effects of a function call', completed: false});
