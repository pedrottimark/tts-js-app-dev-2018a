var logic = require('./logic');

describe('replaceText method', function () {
  var name = 'name';
  var text0 = 'text0';
  var text1 = 'text1';
  var text1Replaced = 'replaced1';
  var item0 = {
    id: 0,
    completed: false,
    text: text0,
  };
  var item1 = {
    id: 1,
    completed: true,
    text: text1,
  };
  var item1Replaced = {
    id: 1,
    completed: true,
    text: text1Replaced,
  };

  it('does not change state if item is not found', function () {
    var state = {
      id: name,
      todos: [item0, item1],
    };
    expect(logic.replaceText(state, -1, text1Replaced)).toEqual(/* TODO what */);
  });

  it('does change state if item is found', function () {
    var state = {
      id: name,
      todos: [item0, item1],
    };
    var stateNext = {
      id: name,
      todos: [item0, item1Replaced],
    };
    // TODO expect
  });
});
