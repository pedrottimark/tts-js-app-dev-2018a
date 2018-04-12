import React from 'react';

const countUncompleted = (list) => list.reduce(
  (n, {completed}) => completed ? n : n + 1,
  0
);

const Heading = ({id, list}) => (
  <h1>
    <span>Todo List for </span>
    <span className="name">{id}</span>
    <span>: </span>
    <span className="count uncompleted">{countUncompleted(list)}</span>
    <span className="uncompleted"> uncompleted</span>
    <span> / </span>
    <span className="count all">{list.length}</span>
    <span> items</span>
  </h1> 
);

export default Heading;
