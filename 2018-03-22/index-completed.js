import jQuery from 'jquery';
import {addItem, deleteItem, findItem, toggleCompleted} from './logic';

import './index.css';

jQuery(($) => {
  // Return h1 element which contains span elements
  // for doer name and count of uncompleted and all items.
  const renderHeading = () => $('<h1/>').append(
    $('<span>Todo List for </span>'),
    $('<span class="name"></span>'),
    $('<span>: </span>'),
    $('<span/>').attr('class', 'count uncompleted'),
    $('<span> uncompleted</span>').attr('class', 'uncompleted'),
    $('<span> / </span>'),
    $('<span/>').attr('class', 'count all'),
    $('<span> items</span>')
  );

  // renderRadio('visibility', 'uncompleted', onChangeFilter)
  // <label class="uncompleted">
  // <input type="radio" name="visibility" value="uncompleted"/>
  // uncompleted
  // </label>
  const renderRadio = (name, value, onChangeFilter) => {
    const input = $('<input type="radio"/>')
      .on('change', onChangeFilter)
      .attr({
        name,
        value,
      });

    return $('<label/>')
      .attr('class', value)
      .append(
        input,
        document.createTextNode(value)
      );
  };

  // Return form which contains radio buttons for all, uncompleted, completed.
  const renderFilter = (onChangeFilter) => {
    const name = 'visibility';

    return $('<form/>')
      .attr('class', name)
      .append(
        renderRadio(name, 'all', onChangeFilter),
        renderRadio(name, 'uncompleted', onChangeFilter),
        renderRadio(name, 'completed', onChangeFilter)
      );
  };

  // Render form which is visible when session state is null.
  const renderLogOn = (onLogOn) => $([
    '<form class="logOn">',
    '<input type="text" name="logOnName" placeholder="Name of returning doer"',
    ' pattern="\\w+" title="one or more alphanumeric characters including underscore"/>',
    '<button type="submit">Log on</button>',
    '</form>',
  ].join('')).on('submit', onLogOn);

  // Render form which is visible when session state is null.
  const renderSignUp = (onSignUp) => $([
    '<form class="signUp">',
    '<input type="text" name="signUpName" placeholder="Name of new doer"',
    ' pattern="\\w+" title="one or more alphanumeric characters including underscore"/>',
    '<button type="submit">Sign up</button>',
    '</form>',
  ].join('')).on('submit', onSignUp);

  // Render form which is visible when session state is not null.
  const renderLogOff = (onLogOff) => $([
    '<form class="logOff">',
    '<button type="submit">Log off</button>',
    '</form>',
  ].join('')).on('submit', onLogOff);

  // Render check mark (over picture) which is visible when session state is null.
  const renderOffSVG = () => $([
    '<svg viewBox="0 0 15 12">',
    '<polyline points="2 7 5 10 13 2" fill="none" stroke="hsl(165,100%,40%)" stroke-width="1"/>',
    '</svg>',
  ].join(''));

  // Update user interface after change to state.
  const updateItem = (li, {completed, text}) => {
    li.attr('class', completed ? 'completed' : 'uncompleted');
    li.find('p').text(text);
  };

  // Render empty todo item.
  const renderItem = (todoItem, index, onClickItem, onDeleteItem) => {
    const li = $('<li/>').append(
      $('<div/>').append(
        $('<p/>').on('click', onClickItem.bind(null, todoItem.id)),
        $('<button>Delete</button>').on('click', onDeleteItem.bind(null, todoItem.id))
      )
    );

    updateItem(li, todoItem);

    return li;
  };

  // Update user interface after change to state.
  const appendItems = (ul, todos, onClickItem, onDeleteItem) => {
    todos.forEach((todoItem, index) => {
      ul.append(renderItem(todoItem, index, onClickItem, onDeleteItem));
    });
  };

  // Render empty todo list.
  const renderList = () => $('<ul class="list"></ul>');

  // Render form which is visible when session state is not null.
  const renderAdder = (onSubmitAdder) => $('<form class="adder"/>')
    .on('submit', onSubmitAdder)
    .append(
      $('<input type="text" name="textOfNewItem" placeholder="text of new item"/>'),
      $('<button type="submit">Add</button>').on('click', onSubmitAdder)
    );

  const getDoer = async (id, callbackSuccess, callbackFailure) => {
    try {
      // Although the input element has pattern="[\w]+"
      // make sure to allow only alphanumeric including underscore!
      //
      // To get an array of objects, url consists of plural noun:
      const response = await fetch(`/doers/${id.replace(/\W/g, '')}`);
      if (!response.ok) {
        throw new Error(response.status);
      }

      const doer = await response.json();
      callbackSuccess(doer);
    } catch(error) {
      callbackFailure(error);
    }
  };

  const putDoer = async (doer, callbackSuccess, callbackFailure) => {
    try {
      // To put item in array of objects, url consists of plural noun, and then id:
      const response = await fetch(`/doers/${doer.id}`, {
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

  const postDoer = async (doer, callbackSuccess, callbackFailure) => {
    try {
      // To add an object to an array, url consists of plural noun:
      const response = await fetch('/doers', {
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
  const renderApp = () => {
    let state = null;
    let visibilityFilter = 'all';

    let h1;
    let spanName;
    let spanCountUncompleted;
    let spanCountAll;
    let formFilter;
    let formLogOn;
    let formSignUp;
    let formLogOff;
    let offSVG;
    let ul;
    let formAdder;
    let inputAdder;
    let app;

    const updateHeading = () => {
      spanName.text(state ? state.id : '');
      spanCountAll.text(state ? state.todos.length : '');
      spanCountUncompleted.text(state ? state.todos.reduce((n, todoItem) => {
        if (!todoItem.completed) {
          return n + 1; // one more item is uncompleted
        }

        return n;
      }, 0) : '');
    };

    const updateFilter = () => {
      formFilter.find(`input[value="${visibilityFilter}"]`)[0].checked = true;
    };

    const updateListClass = () => {
      ul[0].className = visibilityFilter + ' list'; // ul[0] is DOM element
    };

    const onClickItem = (id, event) => {
      // Update local state optimistically.
      state = toggleCompleted(state, id);

      // Make request to update state on server.
      putDoer(
        state,
        (response) => {
          console.info('onClickItem success: ' + response.ok);
        },
        (error) => {
          console.error('onClickItem error: ' + error.message);
        }
      );

      // Update user interace.
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      const li = $(event.currentTarget).closest('li');
      updateItem(li, findItem(state, id));
      updateHeading();
    };

    const onDeleteItem = (id, event) => {
      // Update local state optimistically.
      state = deleteItem(state, id);

      // Make request to update state on server.
      putDoer(
        state,
        (response) => {
          console.info('onDeleteItem success: ' + response.ok);
        },
        (error) => {
          console.error('onDeleteItem error: ' + error.message);
        }
      );

      // Update user interace.
      // $(event.currentTarget) wraps the DOM element in a jQuery collection.
      const li = $(event.currentTarget).closest('li');
      li.remove();
      updateHeading();
    };

    const updateListItems = () => {
      ul.empty();
      if (state) {
        appendItems(ul, state.todos, onClickItem, onDeleteItem);
      }
    };

    const updateSession = () => {
      updateHeading();
      updateFilter();
      updateListClass();
      updateListItems();
      formLogOn.toggleClass('empty', false).toggleClass('error', false);
      formSignUp.toggleClass('empty', false).toggleClass('error', false);
      app.toggleClass('on', state !== null);
    };

    const onLogOn = (event) => {
      event.preventDefault(); // do not post form to server

      const form = event.target;
      const input = form.elements['logOnName'];
      const value = input.value;
      const empty = value.length === 0;
      $(form).toggleClass('empty', empty);

      if (!empty) {
        getDoer(
          value,
          (doer) => {
            console.info('onLogOn', doer);
            state = doer;
            visibilityFilter = 'all';
            updateSession();
          },
          () => {
            console.info('onLogOn name does not exist', value);
            $(form).toggleClass('error', true);
          }
        );
      }
    };

    const onSignUp = (event) => {
      event.preventDefault(); // do not post form to server

      const form = event.target;
      const input = form.elements['signUpName'];
      const value = input.value;
      const empty = value.length === 0;
      $(form).toggleClass('strong', empty);

      if (!empty) {
        getDoer(
          value,
          () => {
            console.info('onSignUp name already exists', value);
            $(form).toggleClass('error', true);
          },
          () => {
            state = {
              id: value,
              todos: [],
            };
            postDoer(
              state,
              (response) => {
                console.info('onSignUp success: ' + response.ok);
                visibilityFilter = 'all';
                updateSession();
              },
              (error) => {
                console.error('onSignUp failure: ' + error.message);
                $(form).toggleClass('error', true);
              }
            );
          }
        );
      }
    };

    const onLogOff = (event) => {
      event.preventDefault(); // do not post form to server

      console.info('onLogOff', state.id);
      state = null;
      visibilityFilter = 'all';
      updateSession();
    };

    const onChangeFilter = (event) => {
      visibilityFilter = event.target.value;
      updateListClass();
    };

    const onSubmitAdder = (event) => {
      event.preventDefault(); // do not post form to server

      // Update local state optimistically.
      const index = state.todos.length; // index of new item to be added
      state = addItem(state, inputAdder[0].value); // get the text

      // Make request to update state on server.
      putDoer(
        state,
        (response) => {
          console.info('onSubmitAdder success: ' + response.ok);
        },
        (error) => {
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
