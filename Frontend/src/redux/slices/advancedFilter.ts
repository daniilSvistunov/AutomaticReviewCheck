import { Filter, FilterItem } from '@components/advanced-filter';
// import { Invoice } from '../../models/invoice';
import { Order } from '@models/order';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------------

export type FilterState<T extends object> = {
  filter: Filter<T> | null;
};

type State<T extends object> = {
  [key: string]: {
    filter: Filter<T> | null;
  };
};

const createInitialState = <T extends object>() => ({} as State<T>);

const createFilterSlice = <T extends object>() => {
  return createSlice({
    name: 'filter',
    initialState: createInitialState<T>(),
    reducers: {
      createFilter(state, action: PayloadAction<{ filterId: string; filter: FilterItem<T>[] }>) {
        const { filterId, filter } = action.payload;
        state[filterId] = {
          filter: filter as Draft<FilterItem<T>>[],
        };
      },

      updateFilter(state, action: PayloadAction<{ filterId: string; filter: FilterItem<T>[] }>) {
        const { filterId, filter } = action.payload;
        if (!state[filterId]) {
          state[filterId] = { filter: null };
        }
        state[filterId].filter = filter as Draft<FilterItem<T>>[];
      },

      updateFilterItem(
        state,
        action: PayloadAction<{ filterId: string; filterItem: FilterItem<T> }>
      ) {
        const { filterId, filterItem } = action.payload;
        const stateFilter = state[filterId]?.filter ?? null;
        if (stateFilter) {
          state[filterId].filter = stateFilter.map((item) => {
            if (
              item.label === filterItem.label &&
              JSON.stringify(item.key) === JSON.stringify(filterItem.key)
            ) {
              return {
                ...item,
                value: filterItem.value,
              };
            }
            return item;
          });
        }
      },
    },
  });
};

// export const invoiceSlice = createFilterSlice<Invoice>();
// export const invoiceReducer = invoiceSlice.reducer;
// export const {
//   createFilter: createInvoiceFilter,
//   updateFilter: updateInvoiceFilter,
//   updateFilterItem: updateInvoiceFilterItem,
// } = invoiceSlice.actions;

const orderSlice = createFilterSlice<Order>();
export const orderReducer = orderSlice.reducer;
export const {
  createFilter: createOrderFilter,
  updateFilter: updateOrderFilter,
  updateFilterItem: updateOrderFilterItem,
} = orderSlice.actions;
