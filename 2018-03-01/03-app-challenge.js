'use strict';

window.renderApp = (function () {

  // Given todos array, return h3 element which includes number of all items.
  //
  // <h3>
  // <span>Todo List: </span>
  // <span class="count all">3</span>
  // <span> items</span>
  // </h3>
  var renderHeading = function (todos) {
    var h3 = document.createElement('h3');

    var spanTodoList = document.createElement('span');
    spanTodoList.innerHTML = 'Todo List: ';
    h3.appendChild(spanTodoList);

    var spanCountAll = document.createElement('span');
    spanCountAll.setAttribute('class', 'count all');
    spanCountAll.innerHTML = todos.length;
    h3.appendChild(spanCountAll);

    var spanItems = document.createElement('span');
    spanItems.innerHTML = ' items';
    h3.appendChild(spanItems);

    return h3;
  };

  // Given todos array, return ul element.
  //
  // <ul class="list">
  // </ul>
  var renderList = function (todos) {
    // TODO initialize ul variable to ul element
    // TODO set class attribute of ul to 'list'

    // TODO call forEach method of todos array with callback function:
    // TODO given todo item object, console.log it

    return ul;
  };

  // renderApp
  //
  // <section class="TodoList">
  // <h3>…</h3>
  // <ul class="list">…</ul>
  // </section>
  return function (state) {
    var h3 = renderHeading(state.todos);
    // TODO initialize ul variable to call renderList with todos property of state

    var section = document.createElement('section');
    section.setAttribute('class', 'TodoList');
    section.appendChild(h3);
    // TODO append ul to section

    return section;
  };

}());
