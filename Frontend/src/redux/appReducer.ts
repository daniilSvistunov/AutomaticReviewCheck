import { combineReducers } from 'redux';

import { orderReducer } from './slices/advancedFilter';
import application from './slices/application';
import capacities from './slices/capacities';
import employees from './slices/employees';
import global from './slices/global';
import orders from './slices/orders';
import teamIterations from './slices/teamIterations';
import teams from './slices/teams';

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
  employees,
  orders,
  teams,
  teamIterations,
  application,
  capacities,
  advancedFilterOrder: orderReducer,
  // advancedFilterInvoice: invoiceReducer,
});

export { appReducer };
