import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

interface Task {
  title: string;
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
    create: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload);
    },
  },
});

// ----------------------------------------------------------------------

export const { create } = taskSlice.actions;

export default taskSlice.reducer;
