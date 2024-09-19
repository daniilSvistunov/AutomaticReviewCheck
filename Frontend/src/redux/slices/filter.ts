import { type Filter, type FilterItem } from '@components/advanced-filter';
import { type RootState } from '@redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from './task';

export enum DateFilter {
  TOTAL = 'total',
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  DONE = 'done',
}
interface FilterState {
  search: string;
  date: DateFilter;
  filter: Filter<Task>;
}
const initialState: FilterState = { search: '', date: DateFilter.TOTAL, filter: [] };

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
  },
});

export const selectDate = (state: RootState) => state.filter.date;

export const { updateSearch, updateDate } = filterSlice.actions;

export default filterSlice.reducer;
