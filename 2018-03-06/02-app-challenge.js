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
    var h3 = $('<h3/>');

    var spanTodoList = $('<span>Todo List: </span>');
    h3.append(spanTodoList);

    // TODO initialize spanCountAll variable to span element, and then in a chain:
    // TODO set class attribute of spanCountAll to 'count all'
    // TODO call text method of spanCountAll with length of todos array

    // TODO append spanCountAll to h3

    // TODO initialize spanItems variable to '<span> items</span>'
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

    return $('<section class="TodoList"/>').append(h3);
  };

}());
