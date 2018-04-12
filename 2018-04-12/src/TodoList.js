import React from 'react';

import TodoItem from './TodoItem';

const isMatching = (text, matching) => text.includes(matching);

// Given filter and list, return an array of items which match the filter.
const itemsFiltered = (list, {completedness, matching}) => {
  if (completedness === 'completed') {
    return list.filter(({completed, text}) => completed && isMatching(text, matching));
  }
  if (completedness === 'uncompleted') {
    return list.filter(({completed, text}) => !completed && isMatching(text, matching));
  }
  if (matching) {
    return list.filter(({text}) => isMatching(text, matching));
  }
  return list; // do not need to copy array
}

const timeCompare = (timeA, timeB) => timeA === timeB ? 0 : timeA > timeB ? -1 : 1;

const itemsSorted = (list, sorting) => {
  if (sorting === 'newerFirst') {
    // Copy array because sort is an impure method.
    return [...list].sort((itemA, itemB) => timeCompare(itemA.timeAdded, itemB.timeAdded));
  }
  return list; // do not need to copy array
}

const itemsView = (list, view) => itemsSorted(itemsFiltered(list, view), view.sorting);

const TodoList = ({list, view, onDeleteItem, onToggleCompleted}) => (
  <ul className="list">
    {
      itemsView(list, view).map((item) => (
        <TodoItem
          key={item.id}
          onDeleteItem={onDeleteItem}
          onToggleCompleted={onToggleCompleted}
          item={item}
        />
      ))
    }
  </ul>
);

export default TodoList;
