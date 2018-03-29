import React from 'react';

const countUncompleted = (todos) => todos.reduce(
  (n, {completed}) => completed ? n : n + 1,
  0
);

const Heading = ({id, todos}) => (
  <h1>
    <span>Todo List for </span>
    <span className="name">{id}</span>
    <span>: </span>
    <span className="count uncompleted">{countUncompleted(todos)}</span>
    <span className="uncompleted"> uncompleted</span>
    <span> / </span>
    <span className="count all">{todos.length}</span>
    <span> items</span>
  </h1> 
);

export default Heading;
