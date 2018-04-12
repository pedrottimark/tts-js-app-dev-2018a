const viewDefault = {
  completedness: 'all',
  matching: '',
  sorting: 'newerFirst',
};

export default (view = viewDefault, action) => {
  switch (action.type) {
    case 'CHANGE_SORTING':
      return {...view, sorting: action.sorting};

    default:
      return view;
  }
};
