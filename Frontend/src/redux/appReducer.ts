import { combineReducers } from 'redux';

import application from './slices/application';
import global from './slices/global';
import todo from './slices/todo';

// Example for persisted slice
//import { persistReducer } from 'redux-persist';
//import storage, { KEY_PREFIX } from './storage';
//import ? from './slices/?'

// const ?PersistConfig = {
//   key: '?',
//   whitelist: []  // Allow keys to be persistent or delete to persist all keys.
//   storage,
//   keyPrefix: KEY_PREFIX,
// };

const appReducer = combineReducers({
  //?: persistReducer(?PersistConfig, ?) // Example for persisted slice
  global,
  application,
  todo,
  // TODO: add slices here
});

export { appReducer };
