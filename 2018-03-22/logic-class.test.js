import getState from './logic-class';

const name = 'name';

// To test impure methods, helper functions return a new object instance.

const id0 = 0;
const completed0 = false;
const text0 = 'text0';
const item0 = () => ({
  id: id0,
  completed: completed0,
  text: text0,
});

const id1 = 1;
const completed1 = true;
const text1 = 'text1';
const item1 = () => ({
  id: id1,
  completed: completed1,
  text: text1,
});

const id2 = 2;
const completed2 = false;
const text2 = 'text2';
const item2 = () => ({
  id: id2,
  completed: completed2,
  text: text2,
});

describe('addItem', () => {
  it('appends an item to an empty todos array', () => {
    const state = getState(name, []);
    state.addItem(text0);
    expect(state.todos).toEqual([item0()]);
  });

  it('appends an item to a non-empty todos array', () => {
    // Append to array in which no item has id: 0
    const state = getState(name, [item1()]);
    state.addItem(text2);
    expect(state.todos).toEqual([item1(), item2()]);
  });
});

describe('deleteItem', function () {
  it('does not change state if item is not found', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.deleteItem(-1);
    expect(state.todos).toEqual([item0(), item1(), item2()]);
  });

  it('does change state if item is found', function () {
    const state = getState(name, [item0(), item1(), item2()]);
    state.deleteItem(1);
    expect(state.todos).toEqual([item0(), item2()]);
  });
});

describe('findItem', function () {
  it('does not find item', function () {
    const state = getState(name, [item0(), item1(), item2()]);
    expect(state.findItem(-1)).toBe(undefined);
  });

  it('does find item', function () {
    const item = item1();
    const state = getState(name, [item0(), item, item2()]);
    expect(state.findItem(1)).toBe(item);
  });
});

describe('replaceText', () => {
  const text = 'text1 replaced';

  it('does not change state if item is not found', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.replaceText(-1, text);
    expect(state.todos).toEqual([item0(), item1(), item2()]);
  });

  it('does change state if item is found', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.replaceText(1, text);
    const item = {
      id: id1,
      completed: completed1,
      text: text,
    };
    expect(state.todos).toEqual([item0(), item, item2()]);
  });
});

describe('toggleCompleted', () => {
  it('does not change state if item is not found', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.toggleCompleted(-1);
    expect(state.todos).toEqual([item0(), item1(), item2()]);
  });

  it('does change state if item is found and completed was false', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.toggleCompleted(0);
    const item = {
      id: id0,
      completed: true,
      text: text0,
    };
    expect(state.todos).toEqual([item, item1(), item2()]);
  });

  it('does change state if item is found and completed was true', () => {
    const state = getState(name, [item0(), item1(), item2()]);
    state.toggleCompleted(1);
    const item = {
      id: id1,
      completed: false,
      text: text1,
    };
    expect(state.todos).toEqual([item0(), item, item2()]);
  });
});
