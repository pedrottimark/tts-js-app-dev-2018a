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
    // TODO initialize form variable to form element
    // TODO set class attribute of form to 'adder'

    // TODO initialize input variable to input element
    // TODO set type attribute of input to 'text'
    // TODO set placeholder attribute of input to 'text of new item'

    // TODO initialize button variable to button element
    // TODO set type attribute of button to 'submit'
    // TODO assign innerHTML property of button to 'Add item'
    // TODO add event listener to button for 'click' event: onSubmitAdder

    // TODO append input to form
    // TODO append button to form
    // TODO add event listener to form for 'submit' event: onSubmitAdder

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

    h3 = renderHeading(state.todos);
    formFilter = renderFilter(state.visibilityFilter, onChangeFilter);
    ul = renderList(state.todos, onClickItem);

    updateList(); // display initial state

    var section = document.createElement('section');
    section.setAttribute('class', 'TodoList');
    section.appendChild(h3);
    section.appendChild(formFilter);
    section.appendChild(ul);

    return section;
  };

}());
