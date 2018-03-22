const idNext = (todos) =>
  todos.reduce(
    (id, todoItem) => id <= todoItem.id ? todoItem.id + 1 : id,
    0
  );

// Given previous state and text string, return next state:
// new item with text at end of todos array.
export const addItem = (state, text) => ({
  ...state,
  todos: [
    ...state.todos,
    {
      id: idNext(state.todos),
      completed: false,
      text,
    },
  ],
});

// Given previous state and id of todo item, return next state:
// delete item which has that id property from todos array.
export const deleteItem = (state, id) => ({
  ...state,
  todos: state.todos.filter((todoItem) => todoItem.id !== id),
});

// Given state and id of todo item, return the object.
export const findItem = (state, id) => state.todos.find((todoItem) => todoItem.id === id);

// Given previous state, id and text of todo item, return next state:
// item has text as value of text property.
export const replaceText = (state, id, text) => ({
  ...state,
  todos: state.todos.map((todoItem) => {
    if (todoItem.id === id) {
      return {
        ...todoItem,
        text,
      };
    }

    return todoItem;
  }),
});

// Given previous state and id of todo item, return next state:
// item has opposite value of completed property.
export const toggleCompleted = (state, id) => ({
  ...state,
  todos: state.todos.map((todoItem) => {
    if (todoItem.id === id) {
      return {
        ...todoItem,
        completed: !todoItem.completed,
      };
    }

    return todoItem;
  }),
});
