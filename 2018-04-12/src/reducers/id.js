const idDefault = '';
  
export default (id = idDefault, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return action.id;
  
    default:
      return id;
  }
};
