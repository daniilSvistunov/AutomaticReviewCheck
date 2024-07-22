import { getTasks as get, postTask as post } from '@api/task';
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

export type Update = Omit<Task, 'checked'>;

interface TaskState {
  status: {
    get: AsyncCallStatus;
    post: AsyncCallStatus;
  };
  error: {
    get: Error | null;
    post: Error | null;
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
  },
  error: {
    get: null,
    post: null,
  },
  list: [],
  buckets: ['Bucket 1', 'Bucket 2', 'Bucket 3', 'Bucket 4', 'Bucket 5'],
  teams: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'],
  assignees: ['Assignee 1', 'Assignee 2', 'Assignee 3', 'Assignee 4', 'Assignee 5'],
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
    toggle: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.id === action.payload);

      state.list[index].checked = !state.list[index].checked;
    },
    update: (state, action: PayloadAction<Update>) => {
      const index = state.list.findIndex((task) => task.id === action.payload.id);

      state.list[index] = { ...state.list[index], ...action.payload };
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.id === action.payload);

      state.list.splice(index, 1);
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

// ----------------------------------------------------------------------

export const { toggle, update, remove } = taskSlice.actions;

export default taskSlice.reducer;
