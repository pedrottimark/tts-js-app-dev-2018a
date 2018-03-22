const idNext = function (todos) {
  return todos.reduce(function (id, todoItem) {
    return id <= todoItem.id
      ? todoItem.id + 1 // greater than id of current item
      : id; // is greater than id of any item so far
  }, 0);
};

// Given array of todo item objects,
// return object instance with impure methods.
const State = function (name, todos) {
  this.name = name;
  this.todos = todos;
};

// Given text string,
// push new item with text at end of todos array.
State.prototype.addItem = function (text) {
  this.todos.push({
    id: idNext(this.todos),
    completed: false,
    text,
  });
};

// Given id of todo item,
// delete item which has that id property.
State.prototype.deleteItem = function (id) {
  this.todos = this.todos.filter(function (todoItem) {
    return todoItem.id !== id;
  });
};

// Given id of todo item, return the object.
State.prototype.findItem = function (id) {
  return this.todos.find(function (todoItem) {
    return todoItem.id === id;
  });
};

// Given id and text of todo item,
// item has text as value of text property.
State.prototype.replaceText = function (id, text) {
  this.todos.forEach(function (todoItem) {
    if (todoItem.id === id) {
      todoItem.text = text;
    }
  });
};

// Given id of todo item,
// item has opposite value of completed property.
State.prototype.toggleCompleted = function (id) {
  this.todos.forEach(function (todoItem) {
    if (todoItem.id === id) {
      todoItem.completed = !todoItem.completed;
    }
  });
};

export default function (name, todos) {
  return new State(name, todos);
}
