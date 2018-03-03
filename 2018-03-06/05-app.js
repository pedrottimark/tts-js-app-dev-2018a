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

  // renderRadio('visibility', 'uncompleted', 'uncompleted')
  // <label class="uncompleted">
  // <input type="radio" name="visibility" value="uncompleted" checked="checked"/>
  // uncompleted
  // </label>
  //
  // renderRadio('visibility', 'completed', 'uncompleted')
  // <label class="completed">
  // <input type="radio" name="visibility" value="completed"/>
  // completed
  // </label>
  var renderRadio = function (name, value, visibilityFilter) {
    var input = $('<input/>')
      .attr({
        type: 'radio',
        name: name,
        value: value,
      });

    if (value === visibilityFilter) {
      input.attr('checked', 'checked');
    }

    return $('<label/>')
      .attr('class', value)
      .append(
        input,
        document.createTextNode(value)
      );
  };

  // renderFilter('uncompleted')
  // <form class="visibility">
  // <label class="all">…</label>
  // <label class="uncompleted">…</label>
  // <label class="completed">…</label>
  // </form>
  var renderFilter = function (visibilityFilter) {
    var name = 'visibility';
    return $('<form/>')
      .attr('class', name)
      .append(
        renderRadio(name, 'all', visibilityFilter),
        renderRadio(name, 'uncompleted', visibilityFilter),
        renderRadio(name, 'completed', visibilityFilter)
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
    var li = $('<li/>')
      .attr('class', todoItem.completed ? 'completed' : 'uncompleted')
      .text(todoItem.text);

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
      ul.append(renderItem(todoItem));
    });

    return ul;
  };

  // renderApp
  //
  // <section class="TodoList">
  // <h3>…</h3>
  // <form class="visibility">…</form>
  // <ul class="list">…</ul>
  // </section>
  return function (state) {
    var h3 = renderHeading(state.todos);
    var formFilter = renderFilter(state.visibilityFilter);
    var ul = renderList(state.todos);

    return $('<section class="TodoList"/>').append(h3, formFilter, ul);
  };

}());
