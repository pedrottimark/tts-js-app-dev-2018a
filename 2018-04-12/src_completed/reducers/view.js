const viewDefault = {
  completedness: 'all',
  matching: '',
  sorting: 'newerFirst',
};

export default (view = viewDefault, action) => {
  switch (action.type) {
    case 'CHANGE_COMPLETEDNESS':
      return {...view, completedness: action.completedness};

    case 'CHANGE_MATCHING':
      return {...view, matching: action.matching};

    case 'CHANGE_SORTING':
      return {...view, sorting: action.sorting};

    default:
      return view;
  }
};
