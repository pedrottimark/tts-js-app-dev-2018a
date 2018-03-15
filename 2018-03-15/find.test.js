var logic = require('./logic');

describe('findItem method', function () {
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

  it('does not find item', function () {
    var state = {
      id: name,
      todos: [item0, item1, item2],
    };
    expect(logic.findItem(state, -1)).toBe(undefined);
  });

  it('does find item', function () {
    // TODO var state has a todos property which consists of all the items
    expect(logic.findItem(state, 1)).toBe(/* TODO what */);
  });
});
