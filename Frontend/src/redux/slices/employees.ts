import { getEmployees } from '@api/employees';
import { Employee } from '@models/employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';
import { Path } from 'src/types/path';

import { AppThunk } from '../store';

// ----------------------------------------------------------------------------
export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type EmployeesList = {
  status: {
    fetch: AsyncCallStatus;
  };

  error: {
    fetch: Error | string | null;
  };

  employees: Employee[];
};

type EmployeeState = {
  list: EmployeesList;
};

export const initialState: EmployeeState = {
  list: {
    status: {
      fetch: 'idle',
    },
    error: {
      fetch: null,
    },
    employees: [],
  },
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // List
    employeeListFetchStarted(state) {
      state.list.status.fetch = 'loading';
    },
    employeeListFetchFailed(state, action) {
      state.list.status.fetch = 'failed';
      state.list.error.fetch = action.payload;
    },
    employeeListFetchSucceeded(state, action: PayloadAction<Employee[]>) {
      state.list.status.fetch = 'succeeded';

      state.list.employees = action.payload;
    },

    setData(state, action: PayloadAction<{ path: Path<Employee>; data: unknown }>) {
      if (state.list.employees) {
        set(state.list.employees, action.payload.path, action.payload.data);
      }
    },
  },
});

export default slice.reducer;
export const { setData } = slice.actions;

// Functions
// ----------------------------------------------------------------------------

// Selectors
// ----------------------------------------------------------------------------

// Async Thunks
// ----------------------------------------------------------------------------

export const fetchEmployees = (): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.employeeListFetchStarted());

    let res;

    try {
      res = await getEmployees();
    } catch (error) {
      dispatch(slice.actions.employeeListFetchFailed(error));
      return;
    }

    dispatch(slice.actions.employeeListFetchSucceeded(res.data));
  };
};
