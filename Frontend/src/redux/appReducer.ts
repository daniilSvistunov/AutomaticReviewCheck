import { combineReducers } from 'redux';

import application from './slices/application';
import filter from './slices/filter';
import global from './slices/global';
import task from './slices/task';

const appReducer = combineReducers({
  global,
  application,
  task,
  filter,
});

export { appReducer };
