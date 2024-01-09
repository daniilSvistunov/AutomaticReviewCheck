import { getApplication } from '@api/application';
import { Application } from '@models/application';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';

// ----------------------------------------------------------------------------
export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ApplicationState = {
  status: {
    fetch: AsyncCallStatus;
  };

  error: {
    fetch: Error | string | null;
  };

  applications: Application[];
};

export const initialState: ApplicationState = {
  status: {
    fetch: 'idle',
  },
  error: {
    fetch: null,
  },
  applications: [],
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    applicationFetchStarted(state) {
      state.status.fetch = 'loading';
    },
    applicationFetchFailed(state, action) {
      state.status.fetch = 'failed';
      state.error.fetch = action.payload;
    },
    applicationFetchSucceeded(state, action: PayloadAction<Application>) {
      state.status.fetch = 'succeeded';
      const apps = state.applications.filter((app) => app.id !== action.payload.id);
      apps.push(action.payload);
      state.applications = apps;
    },
  },
});

export default slice.reducer;

// Functions
// ----------------------------------------------------------------------------

// Selectors
// ----------------------------------------------------------------------------

// Async Thunks
// ----------------------------------------------------------------------------

// Application
export const fetchApplication = (internalApplicationName: string): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.applicationFetchStarted());

    let res;

    try {
      res = await getApplication(internalApplicationName);
    } catch (error) {
      dispatch(slice.actions.applicationFetchFailed(error));
      return;
    }

    dispatch(slice.actions.applicationFetchSucceeded(res.data));
  };
};
