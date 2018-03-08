/* global logic */

'use strict';

$(function () {
  // Given todos array,
  // return h3 element which includes number of uncompleted and all items.
  //
  // <h3>
  // <span>Todo List: </span>
  // <span class="count uncompleted">2</span>
  // <span class="uncompleted"> uncompleted</span>
  // <span> / </span>
  // <span class="count all">3</span>
  // <span> items</span>
  // </h3>
  var renderHeading = function () {
    return $('<h3/>').append(
      $('<span>Todo List: </span>'),
      $('<span/>').attr('class', 'count uncompleted'),
      $('<span> uncompleted</span>').attr('class', 'uncompleted'),
      $('<span> / </span>'),
      $('<span/>').attr('class', 'count all'),
      $('<span> items</span>')
    );
  };

  // renderRadio('visibility', 'uncompleted')
  // <label class="uncompleted">
  // <input type="radio" name="visibility" value="uncompleted"/>
  // uncompleted
  // </label>
  var renderRadio = function (name, value, onChangeFilter) {
    var input = $('<input type="radio"/>')
      .on('change', onChangeFilter)
      .attr({
        name: name,
        value: value,
      });

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
  var renderFilter = function (onChangeFilter) {
    var name = 'visibility';
    return $('<form/>')
      .attr('class', name)
      .append(
        renderRadio(name, 'all', onChangeFilter),
        renderRadio(name, 'uncompleted', onChangeFilter),
        renderRadio(name, 'completed', onChangeFilter)
      );
  };

  var updateItem = function (li, todoItem) {
    li.attr('class', todoItem.completed ? 'completed' : 'uncompleted');
    li.text(todoItem.text);
  };

  var renderItem = function (todoItem, index, onClickItem) {
    var li = $('<li/>').on('click', onClickItem.bind(null, index));
    updateItem(li, todoItem);
    return li;
  };

  var appendItems = function (ul, todos, onClickItem) {
    todos.forEach(function (todoItem, index) {
      ul.append(renderItem(todoItem, index, onClickItem));
    });
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
  var renderList = function (todos, onClickItem) {
    var ul = $('<ul class="list"/>');
    appendItems(ul, todos, onClickItem);
    return ul;
  };

  var get = function(url, callback) {
    var xHR = new XMLHttpRequest();

    xHR.onreadystatechange = function() {
      if (xHR.readyState == XMLHttpRequest.DONE ) {
        if (xHR.status == 200) {
          console.info(xHR.responseText);

          callback(JSON.parse(xHR.responseText));
        }
        else {
          throw new Error('getTodos status=' + xHR.status + ' url=' + url + '"');
        }
      }
    };

    xHR.open("GET", url, true);
    xHR.send();
  };

  var getState = function (callback) {
    get('/todos', function (todos) {
      get('/view', function (view) {
        callback([todos, view]);
      });
    });
  };

  // Given state of application, return section element.
  // <section class="TodoList">
  // <h3>…</h3>
  // <form class="visibility">…</form>
  // <ul class="list">…</ul>
  // </section>
  var renderApp = function (state, logic) {
    var h3;
    var spanCountUncompleted;
    var spanCountAll;
    var formFilter;
    var ul;
    var section;

    var updateHeading = function () {
      spanCountAll.text(state.todos.length);
      spanCountUncompleted.text(state.todos.reduce(function (n, todoItem) {
        if (!todoItem.completed) {
          return n + 1; // one more item is uncompleted
        }

        return n;
      }, 0));
    };

    var updateFilter = function () {
      formFilter.find('input[value="' + state.view.visibilityFilter + '"]')[0].checked = true;
    };

    var updateList = function () {
      ul[0].className = state.view.visibilityFilter + ' list'; // ul[0] is DOM element
    };

    var onChangeFilter = function (event) {
      var visibilityFilter = event.target.value;
      state = logic.changeFilter(state, visibilityFilter);
      updateList();
    };

    var onClickItem = function (index, event) {
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget);
      state = logic.toggleCompleted(state, index);
      updateItem(li, state.todos[index]);
      updateHeading(); // display changed state
    };

    h3 = renderHeading(state.todos);
    spanCountUncompleted = h3.find('.count.uncompleted');
    spanCountAll = h3.find('.count.all');
    formFilter = renderFilter(onChangeFilter);
    ul = renderList(state.todos, onClickItem);
    section = $('<section class="TodoList"/>').append(h3, formFilter, ul);

    getState(function (array) {
      state = {
        todos: array[0],
        view: array[1],
      };
      appendItems(ul, state.todos, onClickItem);
      updateHeading();
      updateFilter();
      updateList();
    });

    return section;
  };

  $('#root').append(renderApp({
    todos: [],
    view: {
      visibilityFilter: 'all',
    }
  }, logic));
});
