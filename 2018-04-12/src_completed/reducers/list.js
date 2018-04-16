// Given array of todo items,
// return minimum non-negative integer that is greater than any id property.
const idNext = (list) =>
  list.reduce(
    (id, item) => id <= item.id ? item.id + 1 : id,
    0
  );

const listDefault = [];

export default (list = listDefault, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return [
        ...list,
        {
          id: idNext(list),
          completed: false,
          text: action.text,
          timeAdded: action.timeAdded,
        },
      ];

    case 'DELETE_ITEM':
      return list.filter(
        (item) => item.id !== action.id
      );

    case 'REPLACE_TEXT':
      return list.map(
        (item) => item.id === action.id
          ? {...item, text: action.text}
          : item
      );

    case 'TOGGLE_COMPLETED':
      return list.map(
        (item) => item.id === action.id
          ? {...item, completed: !item.completed}
          : item
      );

    default:
      return list;
  }
};
