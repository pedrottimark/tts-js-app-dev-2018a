'use strict';

window.renderApp = (function () {

  // <h3>
  // <span>Todo List</span>
  // </h3>
  var renderHeading = function () {
    // TODO initialize h3 variable to h3 element

    // TODO initialize spanTodoList variable to span element with fixed text 'Todo List'
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

    // TODO add to section markup a fixed class attribute of 'TodoList'
    return $('<section/>').append(h3);
  };

}());
