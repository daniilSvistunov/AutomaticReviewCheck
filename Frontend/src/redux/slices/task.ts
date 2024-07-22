import {
  deleteTask as remove,
  getProperties,
  getTasks as get,
  patchTask as patch,
  postTask as post,
} from '@api/task';
import { type AppThunk, type RootState } from '@redux/store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Duration } from 'date-fns';

import { type AsyncCallStatus } from '../../types/async';

// ----------------------------------------------------------------------

export enum Priority {
  HIGH = 'Hoch',
  MEDIUM = 'Mittel',
  LOW = 'Niedrig',
}

export interface Step {
  id: number;
  text: string;
}

export interface Task {
  id: number;
  title: string;
  checked: boolean;
  due: Date;
  reminder?: Duration;
  priority?: Priority;
  bucket?: string;
  team?: string;
  assignee?: string;
  note?: string;
  steps: Step[];
}

export type Properties = Pick<
  Task,
  'due' | 'reminder' | 'priority' | 'bucket' | 'team' | 'assignee'
>;

export type Update = Partial<Omit<Task, 'id'>>;

export interface TaskState {
  status: {
    get: AsyncCallStatus;
    post: AsyncCallStatus;
    patch: AsyncCallStatus;
    delete: AsyncCallStatus;
    properties: AsyncCallStatus;
  };
  error: {
    get: Error | null;
    post: Error | null;
    patch: Error | null;
    delete: Error | null;
    properties: Error | null;
  };
  list: Task[];
  buckets: string[];
  teams: string[];
  assignees: string[];
}

const initialState: TaskState = {
  status: {
    get: 'idle',
    post: 'idle',
    patch: 'idle',
    delete: 'idle',
    properties: 'idle',
  },
  error: {
    get: null,
    post: null,
    patch: null,
    delete: null,
    properties: null,
  },
  list: [],
  buckets: [],
  teams: [],
  assignees: [],
};

// ----------------------------------------------------------------------

function parse(task: Task): Task {
  return { ...task, due: new Date(task.due) };
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasksStarted: (state) => {
      state.status.get = 'loading';
    },
    getTasksFailed: (state, action: PayloadAction<Error>) => {
      state.status.get = 'failed';

      state.error.get = action.payload;
    },
    getTasksSucceeded: (state, action: PayloadAction<Task[]>) => {
      state.status.get = 'succeeded';

      state.list = action.payload.map(parse);
    },
    postTaskStarted: (state) => {
      state.status.post = 'loading';
    },
    postTaskFailed: (state, action: PayloadAction<Error>) => {
      state.status.post = 'failed';

      state.error.post = action.payload;
    },
    postTaskSucceeded: (state, action: PayloadAction<Task>) => {
      state.status.post = 'succeeded';

      state.list.push(parse(action.payload));
    },
    patchTaskStarted: (state) => {
      state.status.patch = 'loading';
    },
    patchTaskFailed: (state, action: PayloadAction<Error>) => {
      state.status.patch = 'failed';

      state.error.patch = action.payload;
    },
    patchTaskSucceeded: (state, action: PayloadAction<Task>) => {
      state.status.patch = 'succeeded';

      const index = state.list.findIndex((task) => task.id === action.payload.id);

      state.list[index] = parse({ ...state.list[index], ...action.payload });
    },
    deleteTaskStarted: (state) => {
      state.status.delete = 'loading';
    },
    deleteTaskFailed: (state, action: PayloadAction<Error>) => {
      state.status.delete = 'failed';

      state.error.delete = action.payload;
    },
    deleteTaskSucceeded: (state, action: PayloadAction<number>) => {
      state.status.delete = 'succeeded';

      const index = state.list.findIndex((task) => task.id === action.payload);

      state.list.splice(index, 1);
    },
    getPropertiesStarted: (state) => {
      state.status.get = 'loading';
    },
    getPropertiesFailed: (state, action: PayloadAction<Error>) => {
      state.status.get = 'failed';

      state.error.get = action.payload;
    },
    getPropertiesSucceeded: (
      state,
      action: PayloadAction<Pick<TaskState, 'buckets' | 'teams' | 'assignees'>>
    ) => {
      state.status.get = 'succeeded';

      const { buckets, teams, assignees } = action.payload;

      state.buckets = buckets;
      state.teams = teams;
      state.assignees = assignees;
    },
  },
});

// ----------------------------------------------------------------------

export const selectList = (state: RootState) => state.task.list;

export const selectBuckets = (state: RootState) => state.task.buckets;
export const selectTeams = (state: RootState) => state.task.teams;
export const selectAssignees = (state: RootState) => state.task.assignees;

// ----------------------------------------------------------------------

export const getTasks = (): AppThunk<Promise<Task[]>> => {
  return async (dispatch) => {
    dispatch(taskSlice.actions.getTasksStarted());

    let response;

    try {
      response = await get();
    } catch (_) {
      const error = new Error('Tasks could not be fetched.');

      dispatch(taskSlice.actions.getTasksFailed(error));

      return Promise.reject(error);
    }

    dispatch(taskSlice.actions.getTasksSucceeded(response.data));

    return Promise.resolve(response.data);
  };
};

export const postTask = (
  task: Omit<Task, 'id' | 'checked' | 'note' | 'steps'>
): AppThunk<Promise<Task>> => {
  return async (dispatch) => {
    dispatch(taskSlice.actions.postTaskStarted());

    let response;

    try {
      response = await post({
        checked: false,
        steps: [],
        ...task,
      });
    } catch (_) {
      const error = new Error('Task could not be created.');

      dispatch(taskSlice.actions.postTaskFailed(error));

      return Promise.reject(error);
    }

    dispatch(taskSlice.actions.postTaskSucceeded(response.data));

    return Promise.resolve(response.data);
  };
};

export const patchTask = (id: number, task: Update): AppThunk<Promise<Task>> => {
  return async (dispatch) => {
    dispatch(taskSlice.actions.patchTaskStarted());

    let response;

    try {
      response = await patch(id, task);
    } catch (_) {
      const error = new Error('Task could not be updated.');

      dispatch(taskSlice.actions.patchTaskFailed(error));

      return Promise.reject(error);
    }

    dispatch(taskSlice.actions.patchTaskSucceeded(response.data));

    return Promise.resolve(response.data);
  };
};

export const deleteTask = (id: number): AppThunk<Promise<number>> => {
  return async (dispatch) => {
    dispatch(taskSlice.actions.deleteTaskStarted());

    try {
      await remove(id);
    } catch (_) {
      const error = new Error('Task could not be deleted.');

      dispatch(taskSlice.actions.deleteTaskFailed(error));

      return Promise.reject(error);
    }

    dispatch(taskSlice.actions.deleteTaskSucceeded(id));

    return Promise.resolve(id);
  };
};

export const fetchProperties = (): AppThunk<
  Promise<Pick<TaskState, 'buckets' | 'teams' | 'assignees'>>
> => {
  return async (dispatch) => {
    dispatch(taskSlice.actions.getPropertiesStarted());

    let response;

    try {
      response = await getProperties();
    } catch (_) {
      const error = new Error('Properties could not be fetched.');

      dispatch(taskSlice.actions.getPropertiesFailed(error));

      return Promise.reject(error);
    }

    dispatch(taskSlice.actions.getPropertiesSucceeded(response.data));

    return Promise.resolve(response.data);
  };
};

// ----------------------------------------------------------------------

export default taskSlice.reducer;
