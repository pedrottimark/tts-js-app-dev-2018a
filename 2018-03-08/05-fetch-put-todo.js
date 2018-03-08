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

  var getTodos = function (callback) {
    // To get an array of objects, url consists of plural noun:
    fetch('/todos')
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(callback)
      .catch(function (error) {
        console.error('getTodos: ' + error.message);
      });
  };

  var putTodo = function (todoItem) {
    // TODO url represents item in todos array with id property, for example: /todos/1
    fetch('/todos/' + todoItem.id, {
      // TODO options
      // method is 'PUT'
      // headers and body are as example code under Fetch in README.md
    }).catch(function (error) {
      console.error('putTodo: ' + error.message);
    });
  };

  // Given state of application, return section element.
  // <section class="TodoList">
  // <h3>…</h3>
  // <ul class="list">…</ul>
  // </section>
  var renderApp = function (state, logic) {
    var h3;
    var spanCountUncompleted;
    var spanCountAll;
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

    var updateList = function () {
      ul[0].className = state.view.visibilityFilter + ' list'; // ul[0] is DOM element
    };

    var onClickItem = function (index, event) {
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget);
      state = logic.toggleCompleted(state, index);
      putTodo(state.todos[index]);
      updateItem(li, state.todos[index]);
      updateHeading(); // display changed state
    };

    h3 = renderHeading(state.todos);
    spanCountUncompleted = h3.find('.count.uncompleted');
    spanCountAll = h3.find('.count.all');
    ul = renderList(state.todos, onClickItem);
    section = $('<section class="TodoList"/>').append(h3, ul);

    getTodos(function (todos) {
      state = Object.assign({}, state, {
        todos: todos,
      });
      appendItems(ul, todos, onClickItem);
      updateHeading();
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
