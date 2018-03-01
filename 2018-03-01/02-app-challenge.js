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

    // TODO initialize spanCountAll variable to span element
    // TODO set class attribute of spanCountAll to 'count all'
    // TODO assign innerHTML property of spanCountAll to length of todos array
    // TODO append spanCountAll to h3

    // TODO initialize spanItems variable to span element
    // TODO assign innerHTML property of spanItems to ' items'
    // TODO append spanItems to h3

    return h3;
  };

  // renderApp
  //
  // <section class="TodoList">
  // <h3>…</h3>
  // </section>
  return function (state) {
    var h3 = renderHeading(state.todos);

    var section = document.createElement('section');
    section.setAttribute('class', 'TodoList');
    section.appendChild(h3);

    return section;
  };

}());
