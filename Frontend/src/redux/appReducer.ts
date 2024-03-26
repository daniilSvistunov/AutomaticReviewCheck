import { combineReducers } from 'redux';

import application from './slices/application';
import global from './slices/global';
import list from './slices/list';

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
  list,
  application,
  // TODO: add slices here
});

export { appReducer };
