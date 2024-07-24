import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import { rootPersistConfig, rootReducer } from './rootReducer';

export const storeSetUp = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    preloadedState,
  });

export type AppStore = ReturnType<typeof storeSetUp>;

const store = storeSetUp();

const persistor = persistStore(store, null, () => {
  // possibility to call an global app-init function
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { dispatch, persistor, store, useDispatch, useSelector };
