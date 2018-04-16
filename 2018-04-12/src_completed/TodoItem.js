import React from 'react';

const daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
const dayOfWeek = (time) => daysOfWeek[(new Date(time)).getDay()];

const TodoItem = ({item: {completed, id, text, timeAdded}, onDeleteItem, onToggleCompleted}) => (
  <li className={completed ? 'completed' : 'uncompleted'}>
    <div>
      <p onClick={onToggleCompleted.bind(null, id)}>
        <svg viewBox="0 0 12 9">
          <title>{completed ? 'done' : 'not done'}</title>
          {
            completed
              ? <polyline points="1 5 4 8 11 1" fill="none" stroke="currentColor" strokeWidth="2"/>
              : <rect x="2" y="4" width="4" height="4" fill="currentColor" stroke="none"/>
          }
        </svg>
        {text}
      </p>
      <time dateTime={timeAdded}>
        <span>{timeAdded.slice(0, 10)}</span>
        <span>{dayOfWeek(timeAdded)}</span>
      </time>
      <button onClick={onDeleteItem.bind(null, id)}>Delete</button>
    </div>
  </li>
);

export default TodoItem;
