import { type RootState } from '@redux/store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Duration } from 'date-fns';

// ----------------------------------------------------------------------

export enum Priority {
  HIGH = 'Hoch',
  MEDIUM = 'Mittel',
  LOW = 'Niedrig',
}

export interface Step {
  ID: number;
  text: string;
}

export interface Task {
  ID: number;
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
  list: Task[];
  buckets: string[];
  teams: string[];
  assignees: string[];
}

const initialState: TaskState = {
  list: [],
  buckets: ['Bucket 1', 'Bucket 2', 'Bucket 3', 'Bucket 4', 'Bucket 5'],
  teams: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'],
  assignees: ['Assignee 1', 'Assignee 2', 'Assignee 3', 'Assignee 4', 'Assignee 5'],
};

// ----------------------------------------------------------------------

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Omit<Task, 'ID' | 'checked' | 'note' | 'steps'>>) => {
      state.list.push({
        ID: state.list.length === 0 ? 1 : state.list[state.list.length - 1].ID + 1,
        checked: false,
        steps: [],
        ...action.payload,
      });
    },
    toggle: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.ID === action.payload);

      state.list[index].checked = !state.list[index].checked;
    },
    update: (state, action: PayloadAction<Update>) => {
      const index = state.list.findIndex((task) => task.ID === action.payload.ID);

      state.list[index] = { ...state.list[index], ...action.payload };
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.ID === action.payload);

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

export const { create, toggle, update, remove } = taskSlice.actions;

export default taskSlice.reducer;
