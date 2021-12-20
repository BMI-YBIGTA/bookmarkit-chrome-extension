import { combineReducers } from 'redux';

import account from './account';
import settings from './settings';
import marker from './marker';
import switchs from './switchs';

const reducers = combineReducers({
  account,
  settings,
  marker,
  switchs
});
export default reducers;
