import { deleteTeamIteration, deleteTeamIterations, getTeamIterations, postTeamIterations } from "@api/teamIteration";
import { TeamIteration } from "@models/teamIteration";
import { AppThunk, RootState } from "@redux/store";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TeamIterationFilter } from "@sections/orders/details/capacity/iteration-details/planned/utils";
import { AxiosResponse } from "axios";
import { set } from "lodash";
import { Path } from "src/types/path";
import { PartialDeep } from "type-fest";

// ----------------------------------------------------------------------------

export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type FilterTableTeamIteration = {
  dateFilter: TeamIterationFilter[];
};

export interface TeamIterationsState {
    status: {
      fetch: AsyncCallStatus;
      update: AsyncCallStatus;
      delete: AsyncCallStatus;
    };
    error: {
      fetch: Error | string | null;
      update: Error | string | null;
      delete: Error | string | null;
    };

    list: TeamIteration[];

    filter: FilterTableTeamIteration;
};

const initialState: TeamIterationsState = {
    status: {
      fetch: 'idle',
      update: 'idle',
      delete: 'idle',
    },
    error: {
      fetch: null,
      update: null,
      delete: null,
    },
    list: [],
    filter: {
      dateFilter: [TeamIterationFilter.Current, TeamIterationFilter.Upcoming],
    },
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'teamIterations',
  initialState,
  reducers: {
    teamIterationsFetchStarted(state) {
      if (state) {
        state.status.fetch = 'loading';
      }
    },

    teamIterationsFetchFailed(state, action) {
      if (state) {
        state.status.fetch = 'failed';
        state.error.fetch = action.payload;
      }
    },

    teamIterationsFetchSucceeded(state, action: PayloadAction<TeamIteration[]>) {
      if (state) {
        state.status.fetch = 'succeeded';

        action.payload.sort(compareByStartDate);
        state.list = action.payload;
      }
    },

    teamIterationUpdateStarted(state) {
      if (state) {
        state.status.update = 'loading';
      }
    },
    teamIterationsUpdateFailed(state, action) {
      if (state) {
        state.status.update = 'failed';
        state.error.update = action.payload;
      }
    },
    teamIterationsUpdateSucceeded(state, action: PayloadAction<TeamIteration[]>) {
      if (state) {
        state.status.update = 'succeeded';

        // TODO: decide what the BE returns
        // action.payload.sort(compareByStartDate);
        // state.details.teamIterations.teamIterations = action.payload;
      }
    },
    teamIterationDeleteStarted(state) {
      if(state) {
        state.status.delete = 'loading';
      }
    },
    teamIterationDeleteFailed(state, action) {
      if(state) {
        state.status.delete = 'failed';
        state.error.delete = action.payload;
      }
    },
    teamIterationDeleteSucceeded(state, action: PayloadAction<TeamIteration[]>) {
      if(state) {
        state.status.delete = 'succeeded';
        state.list = action.payload;
      }
    },

    setFilterTeamIteration(state, action: PayloadAction<PartialDeep<TeamIterationFilter[]>>) {
      const filter = action.payload;

      if (state) {
        state.filter = {
          ...state.filter,
          dateFilter: filter,
        };
      }
    },

    setData(state, action: PayloadAction<{ path: Path<TeamIteration>; data: unknown }>) {
      if (state) {
        set(state, action.payload.path, action.payload.data);
      }
    },
    setTeamIterations(state, action: PayloadAction<TeamIteration[]>) {
      if (state) {
        action.payload.forEach(iteration => {
          const index = state.list.findIndex(iterationState => iterationState.id === iteration.id);
          if (index > -1) {
            state.list[index] = iteration;
          } else {
            state.list = [...state.list, iteration];
          }
        });
      }
    },

  },
});

export default slice.reducer;
export const {
  setData,
  setTeamIterations,
  setFilterTeamIteration,
} = slice.actions;

// Functions
// ----------------------------------------------------------------------------

export function compareByStartDate(a: TeamIteration, b: TeamIteration) {
  if (a.startDate < b.startDate) {
    return -1;
  }
  if (a.startDate > b.startDate) {
    return 1;
  }
  return 0;
}

// Selectors
// ----------------------------------------------------------------------------

export const selectTeamIterations = (state: RootState) => {
  return state.teamIterations.list;
};

// Async Thunks
// ----------------------------------------------------------------------------

export const fetchTeamIterations = (teamId: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.teamIterationsFetchStarted());

    let res;

    try {
      res = await getTeamIterations(teamId);
    } catch (error) {
      dispatch(slice.actions.teamIterationsFetchFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.teamIterationsFetchSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateTeamIterations = (
  teamId: string,
  teamIterations: TeamIteration[]
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.teamIterationUpdateStarted());

    let res;

    try {
      res = await postTeamIterations(teamId, teamIterations);
    } catch (error) {
      dispatch(slice.actions.teamIterationsUpdateFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.teamIterationsUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteTeamiteration = (teamIterationId: string): AppThunk<Promise<AxiosResponse>> => {
  // TODO deprecated if endpoint gets changed to accept array with ids
  return async (dispatch) => {
    dispatch(slice.actions.teamIterationDeleteStarted());
    let res;
    try {
      res = await deleteTeamIteration(teamIterationId);
    } catch (error) {
      dispatch(slice.actions.teamIterationDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.teamIterationDeleteSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteTeamiterations = (teamIterations: string[]): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.teamIterationDeleteStarted());
    let res;
    try {
      res = await deleteTeamIterations(teamIterations);
    } catch (error) {
      dispatch(slice.actions.teamIterationDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.teamIterationDeleteSucceeded(res.data));
    return Promise.resolve(res);
  };
};
