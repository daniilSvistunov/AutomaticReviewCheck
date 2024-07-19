import { type Filter, type FilterItem } from '@components/advanced-filter';
import { type Task, Priority } from '@redux/slices/task';
import { type RootState } from '@redux/store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

export enum DateFilter {
  TOTAL = 'Gesamt',
  TODAY = 'Heute',
  WEEK = 'Woche',
  MONTH = 'Monat',
  DONE = 'Erledigt',
}

interface FilterState {
  search: string;
  date: DateFilter;
  filter: Filter<Task>;
}

const initialState: FilterState = { search: '', date: DateFilter.TOTAL, filter: [] };

// ----------------------------------------------------------------------

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    updateDate: (state, action: PayloadAction<DateFilter>) => {
      state.date = action.payload;
    },
    createFilter: (
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
    updateFilter: (state, action: PayloadAction<FilterItem<Task>>) => {
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

export const selectSearch = (state: RootState) => state.filter.search;

export const selectDate = (state: RootState) => state.filter.date;

export const selectFilter = (state: RootState) => state.filter.filter;

// ----------------------------------------------------------------------

export const { updateSearch, updateDate, createFilter, updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
