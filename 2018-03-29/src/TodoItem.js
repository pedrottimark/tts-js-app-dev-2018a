import React from 'react';

const TodoItem = ({todoItem}) => (
  <li className={todoItem.completed ? 'completed' : 'uncompleted'}>
    <div>
      <p>{todoItem.text}</p>
    </div>
  </li>
);

export default TodoItem;
