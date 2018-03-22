'use strict';

var idNext = function (todos) {
  return todos.reduce(function (id, todoItem) {
    return id <= todoItem.id ? todoItem.id + 1 : id;
  }, 0);
};

module.exports = {
  // Given previous state and text string, return next state:
  // new item with text at end of todos array.
  addItem: function (state, text) {
    return Object.assign({}, state, {
      todos: state.todos.concat({
        id: idNext(state.todos),
        completed: false,
        text: text,
      }),
    });
  },

  // Given previous state and id of todo item, return next state:
  // delete item which has that id property from todos array.
  deleteItem: function (state, id) {
    return Object.assign({}, state, {
      todos: state.todos.filter(function (todoItem) {
        return todoItem.id !== id;
      }),
    });
  },

  // Given state and id of todo item, return the object.
  findItem: function (state, id) {
    return state.todos.find(function (todoItem) {
      return todoItem.id === id;
    });
  },

  // Given previous state, id and text of todo item, return next state:
  // item has text as value of text property.
  replaceText: function (state, id, text) {
    return Object.assign({}, state, {
      todos: state.todos.map(function (todoItem) {
        if (todoItem.id === id) {
          return Object.assign({}, todoItem, {
            text: text,
          });
        }

        return todoItem;
      }),
    });
  },

  // Given previous state and id of todo item, return next state:
  // item has opposite value of completed property.
  toggleCompleted: function (state, id) {
    return Object.assign({}, state, {
      todos: state.todos.map(function (todoItem) {
        if (todoItem.id === id) {
          return Object.assign({}, todoItem, {
            completed: !todoItem.completed,
          });
        }

        return todoItem;
      }),
    });
  },
};
