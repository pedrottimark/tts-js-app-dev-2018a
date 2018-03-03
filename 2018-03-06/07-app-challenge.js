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
  var renderRadio = function (name, value, visibilityFilter, onChangeFilter) {
    var input = $('<input/>')
      .attr({
        type: 'radio',
        name: name,
        value: value,
      });

    if (value === visibilityFilter) {
      input.attr('checked', 'checked');
    }

    input.on('change', onChangeFilter);

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
  var renderFilter = function (visibilityFilter, onChangeFilter) {
    var name = 'visibility';
    return $('<form/>')
      .attr('class', name)
      .append(
        renderRadio(name, 'all', visibilityFilter, onChangeFilter),
        renderRadio(name, 'uncompleted', visibilityFilter, onChangeFilter),
        renderRadio(name, 'completed', visibilityFilter, onChangeFilter)
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
    var ul = $('<ul/>');

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
  return function (state, logic) {
    var h3;
    var formFilter;
    var ul;

    var updateList = function () {
      ul[0].className = state.visibilityFilter + ' list'; // ul[0] is DOM element
    };

    var onChangeFilter = function (event) {
      var visibilityFilter = event.target.value;
      state = logic.changeFilter(state, visibilityFilter);
      updateList();
    };

    h3 = renderHeading(state.todos);
    formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
    ul = renderList(state.todos);

    updateList(); // display initial state

    return $('<section class="TodoList"/>').append(h3, formFilter, ul);
  };

}());
