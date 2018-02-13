// This is a function declaration.
// Given text as string and optional completed as boolean,
// return todo item as object.
function getTodoItem(text, completed) {
  if (typeof completed !== 'boolean') {
    completed = false; // default is uncompleted
  }

  return {
    text: text,
    completed: completed,
  };
}

// These are function calls.
var todoItem1 = getTodoItem('Distinguish braces in context', true);
var todoItem2 = getTodoItem('Read parts of a function literal', false);
var todoItem3 = getTodoItem('Trace effects of a function call');

// Now you know that this is also a function call :)
console.log([todoItem1, todoItem2, todoItem3]);
