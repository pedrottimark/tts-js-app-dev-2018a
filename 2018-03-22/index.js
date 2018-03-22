'use strict';

var jQuery = require('jquery');
var logic = require('./logic');

require('./index.css');

jQuery(function ($) {
  // Return h1 element which contains span elements
  // for doer name and count of uncompleted and all items.
  var renderHeading = function () {
    return $('<h1/>').append(
      $('<span>Todo List for </span>'),
      $('<span class="name"></span>'),
      $('<span>: </span>'),
      $('<span/>').attr('class', 'count uncompleted'),
      $('<span> uncompleted</span>').attr('class', 'uncompleted'),
      $('<span> / </span>'),
      $('<span/>').attr('class', 'count all'),
      $('<span> items</span>')
    );
  };

  // renderRadio('visibility', 'uncompleted', onChangeFilter)
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

  // Return form which contains radio buttons for all, uncompleted, completed.
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

  // Render form which is visible when session state is null.
  var renderLogOn = function (onLogOn) {
    return $([
      '<form class="logOn">',
      '<input type="text" name="logOnName" placeholder="Name of returning doer"',
      ' pattern="\\w+" title="one or more alphanumeric characters including underscore"/>',
      '<button type="submit">Log on</button>',
      '</form>',
    ].join('')).on('submit', onLogOn);
  };

  // Render form which is visible when session state is null.
  var renderSignUp = function (onSignUp) {
    return $([
      '<form class="signUp">',
      '<input type="text" name="signUpName" placeholder="Name of new doer"',
      ' pattern="\\w+" title="one or more alphanumeric characters including underscore"/>',
      '<button type="submit">Sign up</button>',
      '</form>',
    ].join('')).on('submit', onSignUp);
  };

  // Render form which is visible when session state is not null.
  var renderLogOff = function (onLogOff) {
    return $([
      '<form class="logOff">',
      '<button type="submit">Log off</button>',
      '</form>',
    ].join('')).on('submit', onLogOff);
  };

  // Render check mark (over picture) which is visible when session state is null.
  var renderOffSVG = function () {
    return $([
      '<svg viewBox="0 0 15 12">',
      '<polyline points="2 7 5 10 13 2" fill="none" stroke="hsl(165,100%,40%)" stroke-width="1"/>',
      '</svg>',
    ].join(''));
  };

  // Update user interface after change to state.
  var updateItem = function (li, todoItem) {
    li.attr('class', todoItem.completed ? 'completed' : 'uncompleted');
    li.find('p').text(todoItem.text);
  };

  // Render empty todo item.
  var renderItem = function (todoItem, index, onClickItem, onDeleteItem) {
    var li = $('<li/>').append(
      $('<div/>').append(
        $('<p/>').on('click', onClickItem.bind(null, todoItem.id)),
        $('<button>Delete</button>').on('click', onDeleteItem.bind(null, todoItem.id))
      )
    );

    updateItem(li, todoItem);

    return li;
  };

  // Update user interface after change to state.
  var appendItems = function (ul, todos, onClickItem, onDeleteItem) {
    todos.forEach(function (todoItem, index) {
      ul.append(renderItem(todoItem, index, onClickItem, onDeleteItem));
    });
  };

  // Render empty todo list.
  var renderList = function () {
    return $('<ul class="list"></ul>');
  };

  // Render form which is visible when session state is not null.
  var renderAdder = function (onSubmitAdder) {
    return $('<form class="adder"/>')
      .on('submit', onSubmitAdder)
      .append(
        $('<input type="text" name="textOfNewItem" placeholder="text of new item"/>'),
        $('<button type="submit">Add</button>').on('click', onSubmitAdder)
      );
  };

  var getDoer = async function (id, callbackSuccess, callbackFailure) {
    try {
      // Although the input element has pattern="[\w]+"
      // make sure to allow only alphanumeric including underscore!
      //
      // To get an array of objects, url consists of plural noun:
      var response = await fetch('/doers/' + id.replace(/\W/g, ''));
      if (!response.ok) {
        throw new Error(response.status);
      }

      var doer = await response.json();
      callbackSuccess(doer);
    } catch(error) {
      callbackFailure(error);
    }
  };

  var putDoer = async function (doer, callbackSuccess, callbackFailure) {
    try {
      // To put item in array of objects, url consists of plural noun, and then id:
      var response = await fetch('/doers/' + doer.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doer),
      });
      callbackSuccess(response);
    } catch (error) {
      callbackFailure(error);
    }
  };

  var postDoer = async function (doer, callbackSuccess, callbackFailure) {
    try {
      // To add an object to an array, url consists of plural noun:
      var response = await fetch('/doers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doer),
      });
      callbackSuccess(response);
    } catch (error) {
      callbackFailure(error);
    }
  };

  // Given state of application, return div element which contains app.
  // <div class="TodoList">
  // <header>…</header>
  // <main>…</main>
  // </div>
  var renderApp = function () {
    var state = null;
    var visibilityFilter = 'all';

    var h1;
    var spanName;
    var spanCountUncompleted;
    var spanCountAll;
    var formFilter;
    var formLogOn;
    var formSignUp;
    var formLogOff;
    var offSVG;
    var ul;
    var formAdder;
    var inputAdder;
    var app;

    var updateHeading = function () {
      spanName.text(state ? state.id : '');
      spanCountAll.text(state ? state.todos.length : '');
      spanCountUncompleted.text(state ? state.todos.reduce(function (n, todoItem) {
        if (!todoItem.completed) {
          return n + 1; // one more item is uncompleted
        }

        return n;
      }, 0) : '');
    };

    var updateFilter = function () {
      formFilter.find('input[value="' + visibilityFilter + '"]')[0].checked = true;
    };

    var updateListClass = function () {
      ul[0].className = visibilityFilter + ' list'; // ul[0] is DOM element
    };

    var onClickItem = function (id, event) {
      // Update local state optimistically.
      state = logic.toggleCompleted(state, id);

      // Make request to update state on server.
      putDoer(
        state,
        function (response) {
          console.info('onClickItem success: ' + response.ok);
        },
        function (error) {
          console.error('onClickItem error: ' + error.message);
        }
      );

      // Update user interace.
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget).closest('li');
      updateItem(li, logic.findItem(state, id));
      updateHeading();
    };

    var onDeleteItem = function (id, event) {
      // Update local state optimistically.
      state = logic.deleteItem(state, id);

      // Make request to update state on server.
      putDoer(
        state,
        function (response) {
          console.info('onDeleteItem success: ' + response.ok);
        },
        function (error) {
          console.error('onDeleteItem error: ' + error.message);
        }
      );

      // Update user interace.
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget).closest('li');
      li.remove();
      updateHeading();
    };

    var updateListItems = function () {
      ul.empty();
      if (state) {
        appendItems(ul, state.todos, onClickItem, onDeleteItem);
      }
    };

    var updateSession = function () {
      updateHeading();
      updateFilter();
      updateListClass();
      updateListItems();
      formLogOn.toggleClass('empty', false).toggleClass('error', false);
      formSignUp.toggleClass('empty', false).toggleClass('error', false);
      app.toggleClass('on', state !== null);
    };

    var onLogOn = function (event) {
      event.preventDefault(); // do not post form to server

      var form = event.target;
      var input = form.elements['logOnName'];
      var value = input.value;
      var empty = value.length === 0;
      $(form).toggleClass('empty', empty);

      if (!empty) {
        getDoer(
          value,
          function (doer) {
            console.info('onLogOn', doer);
            state = doer;
            visibilityFilter = 'all';
            updateSession();
          },
          function () {
            console.info('onLogOn name does not exist', value);
            $(form).toggleClass('error', true);
          }
        );
      }
    };

    var onSignUp = function (event) {
      event.preventDefault(); // do not post form to server

      var form = event.target;
      var input = form.elements['signUpName'];
      var value = input.value;
      var empty = value.length === 0;
      $(form).toggleClass('strong', empty);

      if (!empty) {
        getDoer(
          value,
          function () {
            console.info('onSignUp name already exists', value);
            $(form).toggleClass('error', true);
          },
          function () {
            state = {
              id: value,
              todos: [],
            };
            postDoer(
              state,
              function (response) {
                console.info('onSignUp success: ' + response.ok);
                visibilityFilter = 'all';
                updateSession();
              },
              function (error) {
                console.error('onSignUp failure: ' + error.message);
                $(form).toggleClass('error', true);
              }
            );
          }
        );
      }
    };

    var onLogOff = function (event) {
      event.preventDefault(); // do not post form to server

      console.info('onLogOff', state.id);
      state = null;
      visibilityFilter = 'all';
      updateSession();
    };

    var onChangeFilter = function (event) {
      visibilityFilter = event.target.value;
      updateListClass();
    };

    var onSubmitAdder = function (event) {
      event.preventDefault(); // do not post form to server

      // Update local state optimistically.
      var index = state.todos.length; // index of new item to be added
      state = logic.addItem(state, inputAdder[0].value); // get the text

      // Make request to update state on server.
      putDoer(
        state,
        function (response) {
          console.info('onSubmitAdder success: ' + response.ok);
        },
        function (error) {
          console.error('onSubmitAdder error: ' + error.message);
        }
      );

      // Update user interace.
      inputAdder[0].value = ''; // clear the text
      ul.append(renderItem(state.todos[index], index, onClickItem, onDeleteItem));
      updateHeading(); // display changed state
    };

    h1 = renderHeading();
    spanName = h1.find('.name');
    spanCountUncompleted = h1.find('.count.uncompleted');
    spanCountAll = h1.find('.count.all');
    formFilter = renderFilter(onChangeFilter);
    formLogOn = renderLogOn(onLogOn);
    formSignUp = renderSignUp(onSignUp);
    formLogOff = renderLogOff(onLogOff);

    offSVG = renderOffSVG();
    ul = renderList();
    formAdder = renderAdder(onSubmitAdder);
    inputAdder = formAdder.find('input');

    app = $('<div class="TodoList"/>').append(
      $('<header></header').append(
        $('<div></div>').append(h1, formFilter),
        $('<div></div>').append(formLogOn, formSignUp, formLogOff)
      ),
      $('<main></main>').append(offSVG, ul, formAdder)
    );

    return app;
  };

  $('#root').append(renderApp());
});
