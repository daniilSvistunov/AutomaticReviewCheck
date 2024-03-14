import { createTask, getTasks, removeTask, updateTask } from '@api/tasks';
import { Task } from '@models/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { AppThunk } from '../store';

// ----------------------------------------------------------------------------
export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ThemeState = {
  themeMode: string;
  themeDirection?: string;
  themeContrast?: string;
  themeLayout?: string;
  themeColorPresets?: string;
  themeStretch?: boolean;
};

export type TaskState = {
  status: {
    fetch: AsyncCallStatus;
    update: AsyncCallStatus;
    create: AsyncCallStatus;
    remove: AsyncCallStatus;
    sort: string;
  };

  error: {
    fetch: Error | string | null;
    update: Error | string | null;
    create: Error | string | null;
    remove: Error | string | null;
  };

  tasks: Task[];
  theme: ThemeState;
};

export const initialState: TaskState = {
  status: {
    fetch: 'idle',
    update: 'idle',
    create: 'idle',
    remove: 'idle',
    sort: 'sorting',
  },
  error: {
    fetch: null,
    update: null,
    create: null,
    remove: null,
  },
  tasks: [],
  theme: {
    themeMode: '',
    themeDirection: 'ltr',
    themeContrast: 'default',
    themeLayout: 'vertical',
    themeColorPresets: 'default',
    themeStretch: true,
  },
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    tasksFetchStarted(state) {
      state.status.fetch = 'loading';
    },
    tasksFetchFailed(state, action) {
      state.status.fetch = 'failed';
      state.error.fetch = action.payload;
    },
    tasksFetchSucceeded(state, action: PayloadAction<Task[]>) {
      state.status.fetch = 'succeeded';
      state.tasks = action.payload;
    },
    taskCreateStarted(state) {
      state.status.create = 'loading';
    },
    taskCreateFailed(state, action) {
      state.status.create = 'failed';
      state.error.create = action.payload;
    },
    taskCreateSucceeded(state, action: PayloadAction<Task>) {
      state.status.create = 'succeeded';
      state.tasks.push(action.payload);
    },
    taskDeleteStarted(state) {
      if (state.tasks) {
        state.status.remove = 'loading';
      }
    },
    taskDeleteFailed(state, action) {
      if (state.tasks) {
        state.status.remove = 'failed';
        state.error.remove = action.payload;
      }
    },
    taskDeleteSucceeded(state, action: PayloadAction<string>) {
      if (state.tasks) {
        state.status.remove = 'succeeded';
        // The below approach doesn't work, but why? -> Funktioniert doch!
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }
    },
    taskUpdateStarted(state) {
      state.status.update = 'loading';
    },
    taksUpdateFailed(state, action) {
      state.status.update = 'failed';
      state.error.update = action.payload;
    },
    taskUpdateSucceeded(state, action: PayloadAction<Task>) {
      state.status.update = 'succeeded';
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
    tasksSort(state, action: PayloadAction<Task[]>) {
      state.status.sort = 'sorting';
      state.tasks.sort((a, b) => a.title.localeCompare(b.title));
    },
    // themeChange(state, action: PayloadAction<ThemeState>) {
    //   state.theme.themeMode = action.payload.themeMode;
    // },
    themeChange(state, action: PayloadAction<boolean>) {
      state.theme.themeMode = action.payload ? 'light' : 'dark'; // Hier wird der Theme Mode im redux store umgeschaltet
    },
    themeFetch(state, action: PayloadAction<ThemeState>) {
      state.theme.themeMode = action.payload.themeMode;
    },
  },
});

export default slice.reducer;

// TODO: Ask whether this is best practice or not!
export const {
  tasksSort,
  themeChange,
  themeFetch,
} = slice.actions;

// Functions
// ----------------------------------------------------------------------------
export const loadSettings = (): AppThunk<Promise<ThemeState>> => {
  return (dispatch) => {
    const currentSettings: string | null = localStorage.getItem('settings');
    let parsedSettings: ThemeState = initialState.theme;
    if (currentSettings) {
      parsedSettings = JSON.parse(currentSettings);
      dispatch(slice.actions.themeFetch(parsedSettings));
    }
    return Promise.resolve(parsedSettings);
  };
}

// export const saveSettings = (isToggled: boolean): AppThunk<Promise<ThemeState>> => {
//   return (dispatch) => {
//     const { themeMode, ...rest } = initialState.theme;
//     // localStorage.setItem('settings', JSON.stringify(settings));
//     dispatch(slice.actions.themeChange(isToggled));
//     const newSettings = {
//       themeMode: isToggled ? 'light' : 'dark',
//       ...rest,
//     };
//     return Promise.resolve(newSettings);
//   };
// }

// Selectors
// ----------------------------------------------------------------------------

// Async Thunks
// ----------------------------------------------------------------------------

// Tasks
export const fetchTasks = (): AppThunk<Promise<Task[]>> => {
  return async (dispatch) => {
    dispatch(slice.actions.tasksFetchStarted());

    let res;

    try {
      res = await getTasks();
    } catch (error) {
      dispatch(slice.actions.tasksFetchFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.tasksFetchSucceeded(res.data));
    return Promise.resolve(res.data);
  };
};

export const createNewTask = (task: Task): AppThunk<Promise<Task>> => {
  return async (dispatch) => {

    dispatch(slice.actions.taskCreateStarted());

    let res;

    try {
      res = await createTask(task);
    } catch (error) {
      dispatch(slice.actions.taskCreateFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.taskCreateSucceeded(res.data));
    return Promise.resolve(res.data);
  };
};

export const updateSelectedTaskByID = (task: Task): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.taskUpdateStarted());
    let res;
    try {
      res = await updateTask(task);
    } catch (error) {
      dispatch(slice.actions.taksUpdateFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.taskUpdateSucceeded(task));
    return Promise.resolve(res);
  };
};

export const removeSelectedTaskByID = (taskID: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.taskDeleteStarted());

    let res;

    try {
      res = await removeTask(taskID);
    } catch (error) {
      dispatch(slice.actions.taskDeleteFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.taskDeleteSucceeded(taskID));
    return Promise.resolve(res);
  };
};