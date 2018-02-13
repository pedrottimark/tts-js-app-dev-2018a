var todoList = [
  {completed: true, text: 'Distinguish braces in context'},
  {completed: false, text: 'Read parts of a function literal'},
  {completed: false, text: 'Trace effects of a function call'},
];

var logTodoItem = function (todoItem) {
  var completedString = todoItem.completed ? '  completed' : 'uncompleted';
  console.log(completedString + ' ' + todoItem.text);
}

var logTodoItems = function (todoList) {
  for (i = 0; i !== todoList.length; i += 1) {
    logTodoItem(todoList[i]);
  }
}

var toggleCompleted = function (todoItem) {
  return {
    text: todoItem.text,
    completed: !todoItem.completed,
  };
}

// Given todoList as array of todo item objects and subtext, return new array:
// old item, if its text does not contain subtext
// new item whose completed property is toggled, if its text contains subtext
var toggleItems = function (todoList, subtext) {
  var todoListCopy = [];

  for (i = 0; i !== todoList.length; i += 1) {
    var todoItem = todoList[i];
    todoListCopy[i] = todoItem.text.indexOf(subtext) !== -1
      ? toggleCompleted(todoItem)
      : todoItem;
  }

  return todoListCopy;
}

var subtext = process.argv[2];

if (typeof subtext === 'string' && subtext.length !== 0) {
  var todoListCopy = toggleItems(subtext);

  console.log('Original todo list:\n');
  logTodoItems(todoList);
  console.log('\nCopy todo list:\n');
  logTodoItems(todoListCopy);
}
