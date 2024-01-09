import { getContributors, getTeam, getTeams } from '@api/team';
import { Employee } from '@models/employee';
import { Team } from '@models/team';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';

// ----------------------------------------------------------------------------

export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TeamList = {
  status: {
    fetch: AsyncCallStatus;
  };

  error: {
    fetch: Error | string | null;
  };

  teams: Team[];
};

export type CurrentTeam = {
  status: {
    fetchTeam: AsyncCallStatus;
    fetchEmployees: AsyncCallStatus;
  };
  error: {
    fetchTeam: Error | string | null;
    fetchEmployees: Error | string | null;
  };
  details: Team;
  employees: Employee[];
};

type TeamState = {
  list: TeamList;
  team: CurrentTeam;
};

export const initialState: TeamState = {
  list: {
    status: {
      fetch: 'idle',
    },
    error: {
      fetch: null,
    },
    teams: [],
  },
  team: {
    status: {
      fetchTeam: 'idle',
      fetchEmployees: 'idle',
    },
    error: {
      fetchTeam: null,
      fetchEmployees: null,
    },
    details: {
      id: '',
      name: '',
      devopsPath: '',
      projectName: '',
      msGroupId: '',
      msPlannerId: '',
      scopingInterval: 0,
    },
    employees: [],
  },
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // List
    teamListFetchStarted(state) {
      state.list.status.fetch = 'loading';
    },
    teamListFetchFailed(state, action) {
      state.list.status.fetch = 'failed';
      state.list.error.fetch = action.payload;
    },
    teamListFetchSucceeded(state, action: PayloadAction<Team[]>) {
      state.list.status.fetch = 'succeeded';

      state.list.teams = action.payload;
    },
    // Single Team
    teamFetchStarted(state) {
      state.team.status.fetchTeam = 'loading';
    },
    teamFetchFailed(state, action) {
      state.team.status.fetchTeam = 'failed';
      state.team.error.fetchTeam = action.payload;
    },
    teamFetchSucceeded(state, action: PayloadAction<Team>) {
      state.team.status.fetchTeam = 'succeeded';
      state.team.details = action.payload;
    },
    // Employees
    employeesFetchStarted(state) {
      state.team.status.fetchEmployees = 'loading';
    },
    employeesFetchFailed(state, action) {
      state.team.status.fetchEmployees = 'failed';
      state.team.error.fetchEmployees = action.payload;
    },
    employeesFetchSucceeded(state, action: PayloadAction<Employee[]>) {
      state.team.status.fetchEmployees = 'succeeded';
      state.team.employees = action.payload;
    },
  },
});

export default slice.reducer;

// Functions
// ----------------------------------------------------------------------------

// Selectors
// ----------------------------------------------------------------------------

export const selectCurrentTeam = (state: RootState) => {
  return state.teams.team;
};

// Async Thunks
// ----------------------------------------------------------------------------

// List
export const fetchTeams = (): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.teamListFetchStarted());

    let res;

    try {
      res = await getTeams();
    } catch (error) {
      dispatch(slice.actions.teamListFetchFailed(error));
      return;
    }

    dispatch(slice.actions.teamListFetchSucceeded(res.data));
  };
};

// Team
export const fetchTeam = (teamId: string): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.teamFetchStarted());
    let res;
    try {
      res = await getTeam(teamId);
    } catch (error) {
      dispatch(slice.actions.teamFetchFailed(error));
      return;
    }
    dispatch(slice.actions.teamFetchSucceeded(res.data));
  };
};

// Employees
export const fetchEmployees = (teamId: string): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.employeesFetchStarted());
    let res;
    try {
      res = await getContributors(teamId);
    } catch (error) {
      dispatch(slice.actions.employeesFetchFailed(error));
      return;
    }
    dispatch(slice.actions.employeesFetchSucceeded(res.data));
  };
};
