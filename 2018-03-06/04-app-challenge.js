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
    // You can call in a chain any method that returns a jQuery collection!
    return $('<h3/>').append(
      $('<span>Todo List: </span>'),
      $('<span/>').attr('class', 'count all').text(todos.length),
      $('<span> items</span>')
    );
  };

  // Given todo object, return li element.
  //
  // renderItem({completed: true, text: 'Done that'})
  // <li class="completed">Done that</li>
  //
  // renderItem({completed: false, text: 'Do this'})
  // <li class="uncompleted">Do this</span>
  var renderItem = function (todoItem) {
    // TODO initialize li variable to li element, and then
    // TODO set class attribute of li to either 'completed' or 'uncompleted'
    // TODO call text method of li to text property of todoItem

    return li;
  };

  // Given todos array, return ul element which contains items.
  //
  // renderList([
  //   {completed: true, text: 'Done that'},
  //   {completed: false, text: 'Do this'},
  // ])
  // <ul class="list">
  // <li class="completed">Done that</li>
  // <li class="uncompleted">Do this</span>
  // </ul>
  var renderList = function (todos) {
    var ul = $('<ul/>').attr('class', 'list');

    todos.forEach(function (todoItem) {
      // TODO append as child of ul the returned result of call to renderItem with todoItem as argument
    });

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
    var ul = renderList(state.todos);

    return $('<section class="TodoList"/>').append(h3, ul);
  };

}());
