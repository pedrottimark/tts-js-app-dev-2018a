'use strict';

/* global logic */

jQuery(function ($) {
  // Given todos array,
  // return h1 element which includes number of uncompleted and all items.
  //
  // <h1>
  // <strong>Todo List</strong>
  // <span class="name"></span>
  // <span>: </span>
  // <span class="count uncompleted">2</span>
  // <span class="uncompleted"> uncompleted</span>
  // <span> / </span>
  // <span class="count all">3</span>
  // <span> items</span>
  // </h1>
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

  var renderLogOn = function (onLogOn) {
    return $([
      '<form class="logOn">',
      '<input type="text" name="logOnName" placeholder="Name of returning doer"/>',
      '<button type="submit">Log on</button>',
      '</form>',
    ].join('')).on('submit', onLogOn);
  };

  var renderSignUp = function (onSignUp) {
    return $([
      '<form class="signUp">',
      '<input type="text" name="signUpName" placeholder="Name of new doer"/>',
      '<button type="submit">Sign up</button>',
      '</form>',
    ].join('')).on('submit', onSignUp);
  };

  var renderLogOff = function (onLogOff) {
    return $([
      '<form class="logOff">',
      '<button type="submit">Log off</button>',
      '</form>',
    ].join('')).on('submit', onLogOff);
  };

  var renderOffSVG = function () {
    return $([
      '<svg viewBox="0 0 15 12">',
      '<polyline points="2 7 5 10 13 2" fill="none" stroke="hsl(165,100%,40%)" stroke-width="1"/>',
      '</svg>',
    ].join(''));
  };

  var updateItem = function (li, todoItem) {
    li.attr('class', todoItem.completed ? 'completed' : 'uncompleted');
    li.find('p').text(todoItem.text);
  };

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

  var appendItems = function (ul, todos, onClickItem, onDeleteItem) {
    todos.forEach(function (todoItem, index) {
      ul.append(renderItem(todoItem, index, onClickItem, onDeleteItem));
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
  var renderList = function () {
    return $('<ul class="list"></ul>');
  };

  // <form class="adder">
  // <input type="text" placeholder="text of new item"/>
  // <buttom type="submit">Add</button>
  // </form>
  var renderAdder = function (onSubmitAdder) {
    return $('<form class="adder"/>')
      .on('submit', onSubmitAdder)
      .append(
        $('<input type="text" name="textOfNewItem" placeholder="text of new item"/>'),
        $('<button type="submit">Add</button>').on('click', onSubmitAdder)
      );
  };

  /*
  var getDoer = function (id, callbackSuccess, callbackFailure) {
    // To get an array of objects, url consists of plural noun:
    fetch('/doers/' + id)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(callbackSuccess)
      .catch(callbackFailure);
  };
  */
  var getDoer = async function (id, callbackSuccess, callbackFailure) {
    try {
      // To get an array of objects, url consists of plural noun:
      var response = await fetch('/doers/' + id);
      if (!response.ok) {
        throw new Error(response.status);
      }
      var doer = await response.json();
      callbackSuccess(doer);
    } catch(error) {
      callbackFailure(error);
    }
  };

  /*
  var putDoer = function (doer, callbackSuccess, callbackFailure) {
    // To put item in array of objects, url consists of plural noun, and then id:
    fetch('/doers/' + doer.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doer),
    }).then(callbackSuccess)
      .catch(callbackFailure);
  };
  */
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

  /*
  var postDoer = function (doer, callbackSuccess, callbackFailure) {
    // To add an object to an array, url consists of plural noun:
    fetch('/doers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doer),
    }).then(callbackSuccess)
      .catch(callbackFailure);
  };
  */
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
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget).closest('li');
      state = logic.toggleCompleted(state, id);
      putDoer(
        state,
        function (response) {console.info('onClickItem success: ' + response.ok);},
        function (error) {console.info('onClickItem error: ' + error.message);}
      );
      updateItem(li, logic.findItem(state, id));
      updateHeading(); // display changed state
    };

    var onDeleteItem = function (id, event) {
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      var li = $(event.currentTarget).closest('li');
      state = logic.deleteItem(state, id);
      putDoer(
        state,
        function (response) {console.info('onDeleteItem success: ' + response.ok);},
        function (error) {console.info('onDeleteItem error: ' + error.message);}
      );
      li.remove();
      updateHeading(); // display changed state
    };

    var updateListItems = function () {
      ul.empty();
      if (state) {
        appendItems(ul, state.todos, onClickItem, onDeleteItem);
      }
    };

    var updateSession = function (on) {
      updateHeading();
      updateFilter();
      updateListClass();
      updateListItems();
      formLogOn.toggleClass('empty', false).toggleClass('error', false);
      formSignUp.toggleClass('empty', false).toggleClass('error', false);
      app.toggleClass('on', on);
    };

    var onLogOn = function (event) {
      event.preventDefault();

      var form = event.target;
      var input = form.elements['logOnName'];
      var value = input.value;
      var empty = value.length === 0;
      $(form).toggleClass('empty', empty);
      if (!empty) {
        getDoer(
          value,
          function (doer) {
            console.info(doer);
            state = doer;
            visibilityFilter = 'all';
            updateSession(true);
          },
          function () {
            $(form).toggleClass('error', true);
          }
        );
      }
    };

    var onSignUp = function (event) {
      event.preventDefault();

      var form = event.target;
      var input = form.elements['signUpName'];
      var value = input.value;
      var empty = value.length === 0;
      $(form).toggleClass('strong', empty);
      if (!empty) {
        getDoer(
          value,
          function () {
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
                updateSession(true);
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
      event.preventDefault();

      console.log('logOff');
      app.toggleClass('on', false);
      state = null;
      visibilityFilter = 'all';
      updateSession(false);
    };

    var onChangeFilter = function (event) {
      visibilityFilter = event.target.value;
      updateListClass();
    };

    var onSubmitAdder = function (event) {
      event.preventDefault(); // do not post form to server
      var index = state.todos.length; // index of new item to be added
      state = logic.addItem(state, inputAdder[0].value); // get the text
      putDoer(
        state,
        function (response) {console.info('onSubmitAdder success: ' + response.ok);},
        function (error) {console.info('onSubmitAdder error: ' + error.message);}
      );
      ul.append(renderItem(state.todos[index], index, onClickItem, onDeleteItem));
      inputAdder[0].value = ''; // clear the text
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
