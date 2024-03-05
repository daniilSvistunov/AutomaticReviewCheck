import { createTask, getTasks, removeTask, updateTask } from '@api/tasks';
import { Task } from '@models/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { AppThunk } from '../store';

// ----------------------------------------------------------------------------
export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export enum SortTypes {
  TaskAscending = 'TaskAscending',
  TaskDescending = 'TaskDescending',
  DateAscending = 'DateAscending',
  DateDescending = 'DateDescending',
}

export type TodoState = {
  status: {
    fetch: AsyncCallStatus;
    update: AsyncCallStatus;
    add: AsyncCallStatus;
    delete: AsyncCallStatus;
  };

  error: {
    fetch: Error | string | null;
    update: Error | string | null;
    add: Error | string | null;
    delete: Error | string | null;
  };

  filter: {
    sortingOrder: SortTypes;
    taskFilter: string;
    dateFilter: string;
  };

  tasks: Task[];
};
export const initialState: TodoState = {
  status: {
    fetch: 'idle',
    update: 'idle',
    add: 'idle',
    delete: 'idle',
  },
  error: {
    fetch: null,
    update: null,
    add: null,
    delete: null,
  },
  filter: {
    sortingOrder: SortTypes.TaskAscending,
    taskFilter: '',
    dateFilter: '',
  },
  tasks: [],
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoFetchStarted(state) {
      state.status.fetch = 'loading';
    },
    todoFetchFailed(state, action) {
      state.status.fetch = 'failed';
      state.error.fetch = action.payload;
    },
    todoFetchSucceeded(state, action: PayloadAction<Task[]>) {
      state.status.fetch = 'succeeded';
      state.tasks = action.payload;
    },
    todoUpdateStarted(state) {
      state.status.update = 'loading';
    },
    todoUpdateFailed(state, action) {
      state.status.update = 'failed';
      state.error.update = action.payload;
    },
    todoUpdateSucceeded(state, action: PayloadAction<Task>) {
      state.status.update = 'succeeded';
      state.tasks = state.tasks.map((task) => {
        return task.id === action.payload.id ? action.payload : task;
      });
    },
    todoAddStarted(state) {
      state.status.add = 'loading';
    },
    todoAddFailed(state, action) {
      state.status.add = 'failed';
      state.error.add = action.payload;
    },
    todoAddSucceeded(state, action: PayloadAction<Task>) {
      state.status.add = 'succeeded';
      state.tasks.push(action.payload);
    },
    todoDeleteStarted(state) {
      state.status.delete = 'loading';
    },
    todoDeleteFailed(state, action) {
      state.status.delete = 'failed';
      state.error.delete = action.payload;
    },
    todoDeleteSucceeded(state, action: PayloadAction<string>) {
      state.status.delete = 'succeeded';
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    todoSort(state, action: PayloadAction<SortTypes>) {
      state.filter = { ...state.filter, sortingOrder: action.payload };
    },
    todoFilterByTask(state, action: PayloadAction<string>) {
      state.filter = { ...state.filter, taskFilter: action.payload };
    },
    todoFilterByDate(state, action: PayloadAction<string>) {
      state.filter = { ...state.filter, dateFilter: action.payload };
    },
  },
});

export default slice.reducer;

export const { todoSort, todoFilterByTask, todoFilterByDate } = slice.actions;

// Functions
// ----------------------------------------------------------------------------

// Selectors
// ----------------------------------------------------------------------------

// Async Thunks
// ----------------------------------------------------------------------------

// Tasks
export const fetchTodoTasks = (): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.todoFetchStarted());

    let res;

    try {
      res = await getTasks();
    } catch (error) {
      dispatch(slice.actions.todoFetchFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.todoFetchSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateTodoTask = (task: Task): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.todoUpdateStarted());

    let res;

    try {
      res = await updateTask(task);
    } catch (error) {
      dispatch(slice.actions.todoUpdateFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.todoUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const addTodoTask = (task: Task): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.todoAddStarted());

    let res;

    try {
      res = await createTask(task);
    } catch (error) {
      dispatch(slice.actions.todoAddFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.todoAddSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteTodoTask = (id: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.todoDeleteStarted());

    let res;

    try {
      res = await removeTask(id);
    } catch (error) {
      dispatch(slice.actions.todoDeleteFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.todoDeleteSucceeded(id));
    return Promise.resolve(res);
  };
};
