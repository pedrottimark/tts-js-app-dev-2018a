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

  var escapeHTML = function (text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  /*
  var escapeAttribute = function (value) {
    return escapeHTML(value.replace(/&/g, '&amp;').replace(/"/g, '&quot;'));
  };
  */

  // Given todo object, return li element.
  //
  // renderItem({completed: true, text: 'Done that'})
  // <li class="completed">Done that</li>
  //
  // renderItem({completed: false, text: 'Do this'})
  // <li class="uncompleted">Do this</span>
  var renderItem = function (todoItem) {
    // TODO initialize li variable to li element
    // TODO set class attribute of li to either 'completed' or 'uncompleted'
    // TODO assign innerHTML property of li to text property of todoItem

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
    var ul = document.createElement('ul');
    ul.setAttribute('class', 'list');

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

    var section = document.createElement('section');
    section.setAttribute('class', 'TodoList');
    section.appendChild(h3);
    section.appendChild(ul);

    return section;
  };

}());
