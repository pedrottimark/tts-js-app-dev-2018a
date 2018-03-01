'use strict';

window.renderApp = (function () {

  // <h3>
  // <span>Todo List</span>
  // </h3>
  var renderHeading = function () {
    // TODO initialize h3 variable to h3 element

    // TODO initialize spanTodoList variable to span element
    // TODO assign innerHTML property of spanTodoList to 'Todo List'
    // TODO append spanTodoList to h3

    return h3;
  };

  // renderApp
  //
  // <section class="TodoList">
  // <h3>…</h3>
  // </section>
  return function (state) {
    var h3 = renderHeading();

    var section = document.createElement('section');
    // TODO set class attribute of section to 'TodoList'
    section.appendChild(h3);

    return section;
  };

}());
