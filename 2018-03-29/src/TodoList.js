import React from 'react';

import TodoItem from './TodoItem';

// Given filter and todos, return an array of items which match the filter.
const todosFiltered = (completedness, todos) => {
  if (completedness === 'completed') {
    return todos.filter(({completed}) => completed);
  }
  if (completedness === 'uncompleted') {
    return todos.filter(({completed}) => !completed);
  }
  return todos;
}

const TodoList = ({completedness, todos}) => (
  <ul className="list">
    {
      todosFiltered(completedness, todos).map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
        />
      ))
    }
  </ul>
);

export default TodoList;
