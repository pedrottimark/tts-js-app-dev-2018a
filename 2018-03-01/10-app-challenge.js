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
    var h3 = document.createElement('h3');

    var spanTodoList = document.createElement('span');
    spanTodoList.innerHTML = 'Todo List: ';
    h3.appendChild(spanTodoList);

    var spanCountUncompleted = document.createElement('span');
    spanCountUncompleted.setAttribute('class', 'count uncompleted');
    h3.appendChild(spanCountUncompleted);

    var spanUncompleted = document.createElement('span');
    spanUncompleted.setAttribute('class', 'uncompleted');
    spanUncompleted.innerHTML = ' uncompleted';
    h3.appendChild(spanUncompleted);

    var spanSlash = document.createElement('span');
    spanSlash.innerHTML = ' / ';
    h3.appendChild(spanSlash);

    var spanCountAll = document.createElement('span');
    spanCountAll.setAttribute('class', 'count all');
    h3.appendChild(spanCountAll);

    var spanItems = document.createElement('span');
    spanItems.innerHTML = ' items';
    h3.appendChild(spanItems);

    return h3;
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
    var input = document.createElement('input');

    input.setAttribute('type', 'radio');
    input.setAttribute('name', name);
    input.setAttribute('value', value);

    if (value === visibilityFilter) {
      input.setAttribute('checked', 'checked');
    }

    input.addEventListener('change', onChangeFilter);

    var label = document.createElement('label');
    label.setAttribute('class', value);
    label.appendChild(input);
    label.appendChild(document.createTextNode(value));

    return label;
  };

  // renderFilter('uncompleted')
  // <form class="visibility">
  // <label class="all">…</label>
  // <label class="uncompleted">…</label>
  // <label class="completed">…</label>
  // </form>
  var renderFilter = function (visibilityFilter, onChangeFilter) {
    var name = 'visibility';
    var form = document.createElement('form');
    form.setAttribute('class', name);

    form.appendChild(renderRadio(name, 'all', visibilityFilter, onChangeFilter));
    form.appendChild(renderRadio(name, 'uncompleted', visibilityFilter, onChangeFilter));
    form.appendChild(renderRadio(name, 'completed', visibilityFilter, onChangeFilter));

    return form;
  };

  var escapeHTML = function (text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  /*
  var escapeAttribute = function (value) {
    return escapeHTML(value.replace(/\&/g, '&amp;').replace(/\"/g, '&quot;'));
  };
  */

  var updateItem = function (li, todoItem) {
    li.setAttribute('class', todoItem.completed ? 'completed' : 'uncompleted');
    li.innerHTML = escapeHTML(todoItem.text);
  };

  // Given todo object, return li element.
  //
  // renderItem({completed: true, text: 'Done that'})
  // <li class="completed">Done that</li>
  //
  // renderItem({completed: false, text: 'Do this'})
  // <li class="uncompleted">Do this</span>
  var renderItem = function (todoItem, index, onClickItem) {
    var li = document.createElement('li');
    updateItem(li, todoItem);
    li.addEventListener('click', onClickItem.bind(null, index));

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
    var ul = document.createElement('ul');

    todos.forEach(function (todoItem, index) {
      ul.appendChild(renderItem(todoItem, index, onClickItem));
    });

    return ul;
  };

  // <form class="adder">
  // <input type="text" placeholder="text of new item"/>
  // <buttom type="submit">Add item</button>
  // </form>
  var renderAdder = function (onSubmitAdder) {
    var form = document.createElement('form');
    form.setAttribute('class', 'adder');

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'text of new item');

    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerHTML = 'Add item';
    button.addEventListener('click', onSubmitAdder);

    form.appendChild(input);
    form.appendChild(button);
    form.addEventListener('submit', onSubmitAdder);

    return form;
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
    var formFilter;
    var ul;
    var formAdder;
    var inputAdder;

    var updateList = function () {
      ul.className = state.visibilityFilter + ' list';
    };

    var onChangeFilter = function (event) {
      var visibilityFilter = event.target.value;
      state = logic.changeFilter(state, visibilityFilter);
      updateList();
    };

    var onClickItem = function (index, event) {
      state = logic.toggleCompleted(state, index);
      updateItem(event.currentTarget, state.todos[index]);
    };

    var onSubmitAdder = function (event) {
      event.preventDefault(); // do not post form to server
      var index = state.todos.length; // index of new item to be added
      state = logic.addItem(state, inputAdder.value);
      ul.appendChild(renderItem(state.todos[index], index, onClickItem));
      inputAdder.value = ''; // clear the text
    };

    h3 = renderHeading(state.todos);
    formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
    ul = renderList(state.todos, onClickItem);
    formAdder = renderAdder(onSubmitAdder);
    inputAdder = formAdder.querySelector('input');

    updateList();

    var section = document.createElement('section');
    section.setAttribute('class', 'TodoList');
    section.appendChild(h3);
    section.appendChild(formFilter);
    section.appendChild(ul);
    section.appendChild(formAdder);

    return section;
  };

}());
