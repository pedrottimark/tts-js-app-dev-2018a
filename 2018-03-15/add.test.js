var logic = require('./logic');

describe('addItem method', function () {
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

  it('appends an item to an empty todos array', function () {
    var state = {
      id: name,
      todos: [],
    };
    var stateNext = {
      id: name,
      todos: [item0],
    }
    expect(logic.addItem(state, text0)).toEqual(stateNext);
  });

  it('appends an item to a non-empty todos array', function () {
    var state = {
      id: name,
      todos: [item1], // no item has id: 0
    };
    // Add text2 which is the value of text property of item2 (see above)
    // TODO var stateNext
    // TODO expect
  });
});
