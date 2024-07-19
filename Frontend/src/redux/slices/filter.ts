import { type Filter, type FilterItem } from '@components/advanced-filter';
import { type Task, Priority } from '@redux/slices/task';
import { type RootState } from '@redux/store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

interface FilterState {
  filter: Filter<Task>;
}

const initialState: FilterState = { filter: [] };

// ----------------------------------------------------------------------

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{ buckets: string[]; teams: string[]; assignees: string[] }>
    ) => {
      state.filter = [
        {
          label: 'Priorität',
          key: 'priority',
          type: 'checkbox',
          value: null,
          options: Object.values(Priority),
        },
        {
          label: 'Bucket',
          key: 'bucket',
          type: 'checkbox',
          value: null,
          options: action.payload.buckets,
        },
        {
          label: 'Team',
          key: 'team',
          type: 'checkbox',
          value: null,
          options: action.payload.teams,
        },
        {
          label: 'Zuweisen an',
          key: 'assignee',
          type: 'checkbox',
          value: null,
          options: action.payload.assignees,
        },
      ];
    },
    update: (state, action: PayloadAction<FilterItem<Task>>) => {
      state.filter = state.filter.map((item) => {
        if (item.key === action.payload.key) {
          return { ...item, value: action.payload.value };
        }

        return item;
      });
    },
  },
});

// ----------------------------------------------------------------------

export const selectFilter = (state: RootState) => state.filter.filter;

// ----------------------------------------------------------------------

export const { create, update } = filterSlice.actions;

export default filterSlice.reducer;
