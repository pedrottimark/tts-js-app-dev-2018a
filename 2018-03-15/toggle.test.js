var logic = require('./logic');

describe('toggleCompleted method', function () {
  var name = 'name';
  var text0 = 'text0';
  var text1 = 'text1';
  var item0 = {
    id: 0,
    completed: false,
    text: text0,
  };
  var item0Toggled = {
    id: 0,
    completed: true,
    text: text0,
  };
  var item1 = {
    id: 1,
    completed: true,
    text: text1,
  };
  var item1Toggled = {
    id: 1,
    completed: false,
    text: text1,
  };

  it('does not change state if item is not found', function () {
    var state = {
      id: name,
      todos: [item0, item1],
    };
    // TODO expect
  });

  it('does change state if item is found and completed was false', function () {
    var state = {
      id: name,
      todos: [item0, item1],
    };
    var stateNext = {
      id: name,
      todos: [item0Toggled, item1],
    };
    // Toggle with argument 0 because it is id property of item0 (see above)
    // TODO var stateNext
    // TODO expect
  });

  it('does change state if item is found and completed was true', function () {
    var state = {
      id: name,
      todos: [item0, item1],
    };
    var stateNext = {
      id: name,
      todos: [item0, item1Toggled],
    };
    expect(logic.toggleCompleted(state, 1)).toEqual(stateNext);
  });
});
