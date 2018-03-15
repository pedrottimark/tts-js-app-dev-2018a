var logic = require('./logic');

describe('deleteItem method', function () {
  var name = 'name';
  var text0 = 'text0';
  var text1 = 'text1';
  var text2 = 'text2';
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
  var item2 = {
    id: 2,
    completed: false,
    text: text2,
  };

  it('does not change state if item is not found', function () {
    var state = {
      id: name,
      todos: [item0],
    };
    expect(logic.deleteItem(state, 1)).toEqual(state);
  });

  it('does change state if item is found', function () {
    var state = {
      id: name,
      todos: [item0, item1, item2],
    };
    // Delete with argument 1 because it is id property of item1 (see above)
    // TODO var stateNext
    // TODO expect
  });
});
