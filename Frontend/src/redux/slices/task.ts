import { type RootState } from '@redux/store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

export interface Task {
  ID: number;
  title: string;
  checked: boolean;
}

interface TaskState {
  list: Task[];
}

const initialState: TaskState = {
  list: [],
};

// ----------------------------------------------------------------------

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Omit<Task, 'ID' | 'checked'>>) => {
      state.list.push({
        ID: state.list.length === 0 ? 1 : state.list[state.list.length - 1].ID + 1,
        checked: false,
        ...action.payload,
      });
    },
    toggle: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.ID === action.payload);

      state.list[index].checked = !state.list[index].checked;
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((task) => task.ID === action.payload);

      state.list.splice(index, 1);
    },
  },
});

// ----------------------------------------------------------------------

export const selectList = (state: RootState) => state.task.list;

// ----------------------------------------------------------------------

export const { create, toggle, remove } = taskSlice.actions;

export default taskSlice.reducer;
