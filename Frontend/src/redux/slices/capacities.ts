import {
  deleteCapacityWithId,
  getCapacities,
  getCapacitiesOfOrder,
  postCapacities,
} from '@api/capacity';
import { Capacity } from '@models/capacity';
import { DaysOff } from '@models/daysOff';
import { AppThunk, RootState } from '@redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// ----------------------------------------------------------------------------

interface UpdatedDaysOff {
  daysOff: DaysOff[];
  duration: number;
}

export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CapacityType = {
  status: {
    fetch: AsyncCallStatus;
    update: AsyncCallStatus;
    create: AsyncCallStatus;
    delete: AsyncCallStatus;
  };
  error: {
    fetch: Error | string | null;
    update: Error | string | null;
    create: Error | string | null;
    delete: Error | string | null;
  };
  capacities: Capacity[];
};

const initialState: CapacityType = {
  status: {
    fetch: 'idle',
    update: 'idle',
    create: 'idle',
    delete: 'idle',
  },
  error: {
    fetch: null,
    update: null,
    create: null,
    delete: null,
  },
  capacities: [],
};

const slice = createSlice({
  name: 'capacity',
  initialState,
  reducers: {
    capacitiesFetchStarted(state) {
      state.status.fetch = 'loading';
    },
    capacitiesFetchFailed(state, action) {
      state.status.fetch = 'failed';
      state.error.fetch = action.payload;
    },
    capacitiesFetchSucceeded(state, action: PayloadAction<Capacity[]>) {
      state.capacities = action.payload;
      state.status.fetch = 'succeeded';
    },

    capacitiesUpdateStarted(state) {
      state.status.update = 'loading';
    },
    capacitiesUpdatedFailed(state, action) {
      state.status.update = 'failed';
      state.error.update = action.payload;
    },
    capacitiesUpdateSucceeded(state, action) {
      state.status.update = 'succeeded';
      state.capacities = action.payload;
    },

    capacityDeleteStarted(state) {
      state.status.delete = 'loading';
    },
    capacityDeleteFailed(state, action) {
      state.status.delete = 'failed';
      state.error.delete = action.payload;
    },
    capacityDeleteSucceeded(state, action) {
      state.status.delete = 'succeeded';
      state.capacities = action.payload;
    },

    setData(state, action: PayloadAction<{ capacityId: string; data: Capacity }>) {
      if (state.capacities) {
        const { capacityId, data } = action.payload;
        const updatedCapacityIndex = state.capacities.findIndex(
          (capacity) => capacity.id === capacityId
        );
        if (updatedCapacityIndex > -1) {
          state.capacities[updatedCapacityIndex] = data;
        }
      }
    },
    addNotPlannedCapacities(state, action: PayloadAction<Capacity[]>) {
      state.capacities = [...state.capacities, ...action.payload];
    },
    setDaysoff(state, action: PayloadAction<{ capacityId: string; data: UpdatedDaysOff }>) {
      if (state.capacities) {
        const { capacityId, data } = action.payload;
        const updatedCapacityDaysOffIndex = state.capacities.findIndex(
          (capacity) => capacity.id === capacityId
        );
        if (updatedCapacityDaysOffIndex > -1) {
          state.capacities[updatedCapacityDaysOffIndex].daysOffs = data.daysOff;
          state.capacities[updatedCapacityDaysOffIndex].daysOff = data.duration;
        }
      }
    },
    deleteData(state, action: PayloadAction<{ capacityId: string }>) {
      if (state.capacities) {
        const { capacityId } = action.payload;
        state.capacities = state.capacities.filter((c) => c.id !== capacityId);
      }
    },
  },
});

export default slice.reducer;
export const { setData, setDaysoff, deleteData, addNotPlannedCapacities } = slice.actions;

// Selectors
// ----------------------------------------------------------------------------

export const selectCapacities = (state: RootState) => {
  return state.capacities.capacities;
};

// Async Thunks
// ----------------------------------------------------------------------------

export const fetchCapacities = (): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.capacitiesFetchStarted());
    let res;
    try {
      res = await getCapacities();
    } catch (error) {
      dispatch(slice.actions.capacitiesFetchFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.capacitiesFetchSucceeded(res.data));
    return Promise.resolve(res);
  };
};
export const fetchCapacitiesofOrder = (orderId: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.capacitiesFetchStarted());
    let res;
    try {
      res = await getCapacitiesOfOrder(orderId);
    } catch (error) {
      dispatch(slice.actions.capacitiesFetchFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.capacitiesFetchSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateCapacities = (): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.capacitiesUpdateStarted());
    let res;
    const capacities = selectCapacities(getState());
    try {
      res = await postCapacities(capacities);
    } catch (error) {
      dispatch(slice.actions.capacitiesUpdatedFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.capacitiesUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteCapacity = (capacityId: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.capacityDeleteStarted());
    let res;
    try {
      res = await deleteCapacityWithId(capacityId);
    } catch (error) {
      dispatch(slice.actions.capacityDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.capacityDeleteSucceeded(res.data));
    return Promise.resolve(res);
  };
};
