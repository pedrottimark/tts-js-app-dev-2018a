import {combineReducers} from 'redux';

import id from './id';
import list from './list';
import view from './view';

export default combineReducers({
  id,
  list,
  view,
});
