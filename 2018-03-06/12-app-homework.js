'use strict';

window.renderApp = (function () {

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
      .on('change', onChangeFilter)
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

  var updateItem = function (li, todoItem) {
    li.attr('class', todoItem.completed ? 'completed' : 'uncompleted');
    li.text(todoItem.text);
  };

  // Given todo object, return li element.
  //
  // renderItem({completed: true, text: 'Done that'})
  // <li class="completed">Done that</li>
  //
  // renderItem({completed: false, text: 'Do this'})
  // <li class="uncompleted">Do this</span>
  var renderItem = function (todoItem, index, onClickItem) {
    var li = $('<li/>').on('click', onClickItem.bind(null, index));
    updateItem(li, todoItem);

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
  var renderList = function (todos, onClickItem) {
    var ul = $('<ul/>');

    todos.forEach(function (todoItem, index) {
      ul.append(renderItem(todoItem, index, onClickItem));
    });

    return ul;
  };

  // <form class="adder">
  // <input type="text" placeholder="text of new item"/>
  // <buttom type="submit">Add item</button>
  // </form>
  var renderAdder = function (onSubmitAdder) {
    return $('<form class="adder"/>')
      .on('submit', onSubmitAdder)
      .append(
        $('<input type="text" placeholder="text of new item"/>'),
        $('<button type="submit">Add item</button>').on('click', onSubmitAdder)
      );
  };

  // renderApp
  //
  // <section class="TodoList">
  // <h3>…</h3>
  // <form class="visibility">…</form>
  // <ul class="list">…</ul>
  // <form class="adder">…</form>
  // </section>
  return function (state, logic) {
    var h3;
    var spanCountUncompleted;
    var spanCountAll;
    var formFilter;
    var ul;
    var formAdder;
    var inputAdder;

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
      ul.prop('class', state.visibilityFilter + ' list');
    };

    var onChangeFilter = function (event) {
      var visibilityFilter = event.target.value;
      state = logic.changeFilter(state, visibilityFilter);
      updateList();
    };

    var onClickItem = function (index, event) {
      state = logic.toggleCompleted(state, index);
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      updateItem($(event.currentTarget), state.todos[index]);
      updateHeading(); // display changed state
    };

    var onSubmitAdder = function (event) {
      event.preventDefault(); // do not post form to server
      var index = state.todos.length; // index of new item to be added
      state = logic.addItem(state, inputAdder[0].value); // get the text
      ul.append(renderItem(state.todos[index], index, onClickItem));
      inputAdder[0].value = ''; // clear the text
      updateHeading(); // display changed state
    };

    h3 = renderHeading(state.todos);
    spanCountUncompleted = h3.find('.count.uncompleted');
    spanCountAll = h3.find('.count.all');
    formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
    ul = renderList(state.todos, onClickItem);
    formAdder = renderAdder(onSubmitAdder);
    inputAdder = formAdder.find('input');

    // Display initial state.
    updateHeading();
    updateList();

    return $('<section class="TodoList"/>').append(h3, formFilter, ul, formAdder);
  };

}());
