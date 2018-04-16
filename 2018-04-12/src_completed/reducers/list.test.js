import listReducer from './list';

test('array of actions', () => {
  const text1 = 'uncomplete me';
  const text2 = 'complete me';
  const item3 = {
    id: 3,
    completed: false,
    text: 'leave me alone',
  };
  const listPrev = [
    {
      id: 0,
      completed: true,
      text: 'delete me',
    },
    {
      id: 1,
      completed: true,
      text: text1,
    },
    {
      id: 2,
      completed: false,
      text: text2,
    },
    item3,
  ];
  const listNext = [
    {
      id: 1,
      completed: false,
      text: text1,
    },
    {
      id: 2,
      completed: true,
      text: text2,
    },
    item3,
  ];
  const actions = [
    {
      type: 'TOGGLE_COMPLETED',
      id: 1,
    },
    {
      type: 'DELETE_ITEM',
      id: 0,
    },
    {
      type: 'TOGGLE_COMPLETED',
      id: 2,
    },
  ];
  expect(actions.reduce(listReducer, listPrev)).toEqual(listNext);
});
