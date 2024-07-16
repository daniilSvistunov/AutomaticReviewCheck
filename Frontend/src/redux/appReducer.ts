import { combineReducers } from 'redux';

import application from './slices/application';
import global from './slices/global';
import task from './slices/task';

const appReducer = combineReducers({
  global,
  application,
  task,
});

export { appReducer };
