import { getFeatures } from '@api/feature';
import {
  createMilestone,
  deleteMilestone as removeMilestone,
  patchMilestone,
  updateMilestoneFeatures,
  updateMilestoneTeamIterations,
} from '@api/milestone';
import { createOrder, deleteOrder, getOrder, getOrders, patchOrder } from '@api/order';
import {
  createConsultingRole,
  deleteConsultingRole as deleteRole,
  patchConsultingRole,
} from '@api/rolesAndRights';
import { ConsultingRole } from '@models/consultingRole';
import { Feature } from '@models/feature';
import { Milestone } from '@models/milestone';
import { Order } from '@models/order';
import { TeamIteration } from '@models/teamIteration';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterBillOptions } from '@sections/orders/details/milestones/table/types';
import { AxiosResponse } from 'axios';
import { cloneDeep, merge } from 'lodash';
import { PartialDeep, SetRequired } from 'type-fest';

import { AppThunk, RootState } from '../store';
import { selectTeamIterations } from './teamIterations';

// ----------------------------------------------------------------------------

export type AsyncCallStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type FlagsTable = {
  dense: boolean;
  page: number;
};

type FilterTable = {
  search: string;
  isActive: boolean;
  contractType: string;
};

type FilterTableMileStone = {
  filterBillOption: FilterBillOptions;
  filterName: string;
};

export type OrdersList = {
  status: {
    fetch: AsyncCallStatus;
    fetchOne: AsyncCallStatus;
    update: AsyncCallStatus;
    create: AsyncCallStatus;
    delete: AsyncCallStatus;
  };

  filter: FilterTable;

  error: {
    fetch: Error | string | null;
    fetchOne: Error | string | null;
    update: Error | string | null;
    create: Error | string | null;
    delete: Error | string | null;
  };

  orders: Order[];

  flags: {
    lastViewedItemId: string | undefined;
    selectedItemIds: string[] | null;
    table: FlagsTable;
  };
};

export type OrdersDetailsType = {
  milestones: {
    status: {
      fetch: AsyncCallStatus;
      fetchOne: AsyncCallStatus;
      update: AsyncCallStatus;
      create: AsyncCallStatus;
      delete: AsyncCallStatus;
    };

    error: {
      fetch: Error | string | null;
      fetchOne: Error | string | null;
      update: Error | string | null;
      create: Error | string | null;
      delete: Error | string | null;
    };

    milestones: Milestone[];

    filter: FilterTableMileStone;

    flags: {
      lastViewedItemId: string | undefined;
      table: FlagsTable;
    };
  };

  milestoneFeatures: {
    status: { update: AsyncCallStatus };
    error: { update: Error | string | null };
  };

  features: {
    status: { fetch: AsyncCallStatus };
    error: { fetch: Error | string | null };
    features: Feature[];
  };

  milestoneTeamIterations: {
    status: { update: AsyncCallStatus };
    error: { update: Error | string | null };
  };

  consultingRoles: {
    status: {
      fetch: AsyncCallStatus;
      update: AsyncCallStatus;
      create: AsyncCallStatus;
      delete: AsyncCallStatus;
    };

    error: {
      fetch: Error | string | null;
      fetchOne: Error | string | null;
      update: Error | string | null;
      create: Error | string | null;
      delete: Error | string | null;
    };

    consultingRoles: ConsultingRole[];

    flags: {
      lastViewedItemId: string | undefined;
      table: FlagsTable;
    };
  };
};

const ordersDetailsInit: OrdersDetailsType = {
  milestones: {
    status: {
      fetch: 'idle',
      fetchOne: 'idle',
      update: 'idle',
      create: 'idle',
      delete: 'idle',
    },

    error: {
      fetch: null,
      fetchOne: null,
      update: null,
      create: null,
      delete: null,
    },

    milestones: [],

    filter: {
      filterBillOption: 'all',
      filterName: '',
    },

    flags: {
      lastViewedItemId: undefined,
      table: { dense: true, page: 0 },
    },
  },

  milestoneFeatures: {
    status: {
      update: 'idle',
    },

    error: {
      update: null,
    },
  },

  features: {
    status: {
      fetch: 'idle',
    },

    error: {
      fetch: null,
    },

    features: [],
  },

  milestoneTeamIterations: {
    status: {
      update: 'idle',
    },
    error: {
      update: null,
    },
  },

  consultingRoles: {
    status: {
      fetch: 'idle',
      update: 'idle',
      create: 'idle',
      delete: 'idle',
    },

    error: {
      fetch: null,
      fetchOne: null,
      update: null,
      create: null,
      delete: null,
    },

    consultingRoles: [],

    flags: {
      lastViewedItemId: undefined,
      table: { dense: true, page: 0 },
    },
  },
};

type OrdersState = {
  list: OrdersList;
  details: OrdersDetailsType | null;
};

export const initialState: OrdersState = {
  list: {
    status: {
      fetch: 'idle',
      fetchOne: 'idle',
      update: 'idle',
      create: 'idle',
      delete: 'idle',
    },
    filter: {
      search: '',
      isActive: true,
      contractType: 'all',
    },
    error: {
      fetch: null,
      fetchOne: null,
      update: null,
      create: null,
      delete: null,
    },
    orders: [],
    flags: {
      lastViewedItemId: undefined,
      selectedItemIds: null,
      table: { dense: true, page: 0 },
    },
  },

  details: null,
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // List
    orderListFetchStarted(state) {
      state.list.status.fetch = 'loading';
    },
    orderListFetchFailed(state, action) {
      state.list.status.fetch = 'failed';
      state.list.error.fetch = action.payload;
    },
    orderListFetchSucceeded(state, action: PayloadAction<Order[]>) {
      state.list.status.fetch = 'succeeded';

      state.list.orders = action.payload;
    },
    orderListUpdateStarted(state) {
      state.list.status.update = 'loading';
    },
    orderListUpdateFailed(state, action) {
      state.list.status.update = 'failed';
      state.list.error.update = action.payload;
    },
    orderListUpdateSucceeded(state, action: PayloadAction<Order>) {
      const updatedOrder = action.payload;
      const updatedOrderIndex = state.list.orders.findIndex((item) => item.id === updatedOrder.id);

      // Actual writing of the order data to the store
      if (updatedOrderIndex > -1) {
        const order = {
          ...state.list.orders[updatedOrderIndex],
          ...updatedOrder,
        };

        state.list.status.update = 'succeeded';
        state.list.orders[updatedOrderIndex] = order;
      }
    },

    orderListNewStarted(state) {
      state.list.status.create = 'loading';
    },

    orderListNewFailed(state, action) {
      state.list.status.create = 'failed';
      state.list.error.create = action.payload;
    },
    orderListNewSucceeded(state, action: PayloadAction<Order[]>) {
      state.list.status.create = 'succeeded';
      state.list.orders = action.payload;
    },

    // List - Filter
    setFilter(state, action: PayloadAction<PartialDeep<FilterTable>>) {
      const filter = action.payload;

      state.list.filter = merge(state.list.filter, filter);
    },
    resetFilter(state, action: PayloadAction<keyof FilterTable | 'all'>) {
      const key = action.payload;

      if (key === 'all') {
        state.list.filter = { ...initialState.list.filter };
        state.list.status.fetch = 'idle';
      } else {
        state.list.filter = { ...state.list.filter, [key]: initialState.list.filter[key] };
      }
    },

    setTableFlags(state, action: PayloadAction<Partial<FlagsTable>>) {
      state.list.flags.table = { ...state.list.flags.table, ...action.payload };
    },

    // List - Flags
    setSelectedItemIds(state, action: PayloadAction<string[] | null>) {
      state.list.flags.selectedItemIds = action.payload;
    },

    // Single Order
    orderFetchStarted(state) {
      state.list.status.fetchOne = 'loading';
    },
    orderFetchFailed(state, action) {
      state.list.status.fetchOne = 'failed';
      state.list.error.fetchOne = action.payload;
    },
    orderFetchSucceeded(state, action: PayloadAction<Order>) {
      const updatedOrder = action.payload;
      const updatedOrderIndex = state.list.orders.findIndex((item) => item.id === updatedOrder.id);

      // Actual writing of the order data to the store
      if (updatedOrderIndex > -1) {
        const order = {
          ...state.list.orders[updatedOrderIndex],
          ...updatedOrder,
        };

        state.list.status.fetchOne = 'succeeded';
        state.list.orders[updatedOrderIndex] = order;

        if (state.details) {
          state.details.milestones.milestones = updatedOrder.milestones;
          state.details.consultingRoles.consultingRoles = updatedOrder.consultingRoles;
        }
      }
    },

    // Details
    viewDetails(state, action: PayloadAction<string>) {
      state.list.flags.lastViewedItemId = action.payload;
      state.details = ordersDetailsInit;
    },

    viewList(state) {
      state.details = null;
    },

    orderDeleteStarted(state) {
      if (state.list) {
        state.list.status.delete = 'loading';
      }
    },

    orderDeleteFailed(state) {
      if (state.list) {
        state.list.status.delete = 'failed';
      }
    },

    orderDeleteSuceeded(state, action: PayloadAction<Order[]>) {
      if (state.list) {
        state.list.status.delete = 'succeeded';
        state.list.orders = action.payload;
      }
    },

    //Edit
    viewEdit(state, action: PayloadAction<string>) {
      state.list.flags.lastViewedItemId = action.payload;
    },

    // Milestones
    setFilterMilestones(state, action: PayloadAction<PartialDeep<FilterTableMileStone>>) {
      const filter = action.payload;

      if (state.details) {
        state.details.milestones.filter = merge(state.details.milestones.filter, filter);
      }
    },

    resetFilterNameMilestones(state) {
      if (state.details) {
        state.details.milestones.filter.filterName = '';
      }
    },

    //Milestone
    milestoneNewStarted(state) {
      if (state.details) {
        state.details.milestones.status.create = 'loading';
      }
    },

    milestoneNewFailed(state, action) {
      if (state.details) {
        state.details.milestones.status.create = 'failed';
        state.details.milestones.error.create = action.payload;
      }
    },
    milestoneNewSucceeded(state, action: PayloadAction<Milestone[]>) {
      if (state.details) {
        state.details.milestones.status.create = 'succeeded';
        state.details.milestones.milestones = action.payload;
      }
    },

    milestoneUpdateStarted(state) {
      if (state.details) {
        state.details.milestones.status.update = 'loading';
      }
    },

    milestoneUpdateFailed(state, action) {
      if (state.details) {
        state.details.milestones.status.update = 'failed';
        state.details.milestones.error.update = action.payload;
      }
    },

    milestoneUpdateSucceeded(state, action: PayloadAction<Partial<Milestone>>) {
      const updatedMilestone = action.payload;
      if (state.details) {
        const updatedMilestoneIndex = state.details.milestones.milestones.findIndex(
          (item) => item.id === updatedMilestone.id
        );

        // Actual writing of the milestone data to the store
        if (updatedMilestoneIndex > -1) {
          const milestone = {
            ...state.details.milestones.milestones[updatedMilestoneIndex],
            ...updatedMilestone,
          };

          state.details.milestones.status.update = 'succeeded';
          state.details.milestones.milestones[updatedMilestoneIndex] = milestone;
        }
      }
    },

    milestoneDeleteStarted(state) {
      if (state.details) {
        state.details.milestones.status.delete = 'loading';
      }
    },
    milestoneDeleteFailed(state) {
      if (state.details) {
        state.details.milestones.status.delete = 'failed';
      }
    },
    milestoneDeleteSuceeded(state, action: PayloadAction<Milestone[]>) {
      if (state.details) {
        state.details.milestones.status.delete = 'succeeded';
        state.details.milestones.milestones = action.payload;
      }
    },

    //ConsultingRole
    consultingRoleNewStarted(state) {
      if (state.details) {
        state.details.consultingRoles.status.create = 'loading';
      }
    },

    consultingRoleNewFailed(state, action) {
      if (state.details) {
        state.details.consultingRoles.status.create = 'failed';
        state.details.consultingRoles.error.create = action.payload;
      }
    },
    consultingRoleNewSucceeded(state, action: PayloadAction<ConsultingRole[]>) {
      if (state.details) {
        state.details.consultingRoles.status.create = 'succeeded';
        state.details.consultingRoles.consultingRoles = action.payload;
      }
    },

    consultingRoleUpdateStarted(state) {
      if (state.details) {
        state.details.consultingRoles.status.update = 'loading';
      }
    },

    consultingRoleUpdateFailed(state, action) {
      if (state.details) {
        state.details.consultingRoles.status.update = 'failed';
        state.details.consultingRoles.error.update = action.payload;
      }
    },

    consultingRoleUpdateSucceeded(state, action: PayloadAction<Partial<ConsultingRole>>) {
      const updatedConsultingRole = action.payload;
      if (state.details) {
        const updatedConsultingRoleIndex = state.details.consultingRoles.consultingRoles.findIndex(
          (item) => item.id === updatedConsultingRole.id
        );

        // Actual writing of the consultingRole data to the store
        if (updatedConsultingRoleIndex > -1) {
          const milestone = {
            ...state.details.consultingRoles.consultingRoles[updatedConsultingRoleIndex],
            ...updatedConsultingRole,
          };

          state.details.consultingRoles.status.update = 'succeeded';
          state.details.consultingRoles.consultingRoles[updatedConsultingRoleIndex] = milestone;
        }
      }
    },

    consultingRoleDeleteStarted(state) {
      if (state.details) {
        state.details.consultingRoles.status.delete = 'loading';
      }
    },

    consultingRoleDeleteFailed(state) {
      if (state.details) {
        state.details.consultingRoles.status.delete = 'failed';
      }
    },

    consultingRoleDeleteSuceeded(state, action: PayloadAction<ConsultingRole[]>) {
      if (state.details) {
        state.details.consultingRoles.status.delete = 'succeeded';

        state.details.consultingRoles.consultingRoles = action.payload;
      }
    },

    // Features
    featuresFetchStarted(state) {
      if (state.details) {
        state.details.features.status.fetch = 'loading';
      }
    },

    featuresFetchFailed(state, action) {
      if (state.details) {
        state.details.features.status.fetch = 'failed';
        state.details.features.error.fetch = action.payload;
      }
    },

    featuresFetchSucceeded(state, action: PayloadAction<Feature[]>) {
      if (state.details) {
        state.details.features.status.fetch = 'succeeded';

        state.details.features.features = action.payload;
      }
    },

    // MilestoneFeatures
    milestoneFeaturesUpdateStarted(state) {
      if (state.details) {
        state.details.milestoneFeatures.status.update = 'loading';
      }
    },

    milestoneFeaturesUpdateFailed(state, action) {
      if (state.details) {
        state.details.milestoneFeatures.status.update = 'failed';
        state.details.milestoneFeatures.error.update = action.payload;
      }
    },

    milestoneFeaturesUpdateSucceeded(
      state,
      action: PayloadAction<{
        orderId: string | undefined;
        milestoneId: string;
        updatedFeatureIds: string[];
      }>
    ) {
      const { orderId, milestoneId, updatedFeatureIds } = action.payload;

      if (!state.details) {
        return;
      }

      state.details.milestoneFeatures.status.update = 'succeeded';

      // Get list of updated Features from list of updated Feature.Id's
      const updatedFeatures = state.details.features.features.filter((feature) =>
        updatedFeatureIds.includes(feature.id)
      );

      // Update assigned features for milestone in order.details
      const updatedMilestoneIndex = state.details.milestones.milestones.findIndex(
        (item) => item.id === milestoneId
      );
      if (updatedMilestoneIndex > -1) {
        state.details.milestones.milestones[updatedMilestoneIndex].features = [...updatedFeatures];
      }

      if (orderId === undefined) {
        return;
      }

      // Update assigned features for milestone in order list store
      const updatedOrderIndex = state.list.orders.findIndex((item) => item.id === orderId);
      if (updatedOrderIndex > -1) {
        const updatedOrder = state.list.orders[updatedOrderIndex];
        const updatedMilestoneInOrderIndex = updatedOrder.milestones.findIndex(
          (item) => item.id === milestoneId
        );

        if (updatedMilestoneInOrderIndex > -1) {
          state.list.orders[updatedOrderIndex].milestones[updatedMilestoneInOrderIndex].features = [
            ...updatedFeatures,
          ];
        }
      }
    },

    // MilestoneTeamIterations
    milestoneTeamIterationsUpdateStarted(state) {
      if (state.details) {
        state.details.milestoneTeamIterations.status.update = 'loading';
      }
    },

    milestoneTeamIterationsUpdateFailed(state, action) {
      if (state.details) {
        state.details.milestoneTeamIterations.status.update = 'failed';
        state.details.milestoneTeamIterations.error.update = action.payload;
      }
    },

    milestoneTeamIterationsUpdateSucceeded(
      state,
      action: PayloadAction<{
        orderId: string | undefined;
        milestoneId: string;
        teamIterations: TeamIteration[];
        updatedTeamIterationIds: string[];
      }>
    ) {
      const { orderId, milestoneId, updatedTeamIterationIds } = action.payload;

      if (!state.details) {
        return;
      }

      state.details.milestoneTeamIterations.status.update = 'succeeded';

      // Get list of updated TeamIterations from list of updated TeamIteration.Id's
      const updatedTeamIterations = action.payload.teamIterations.filter(
        (iteration) => updatedTeamIterationIds.includes(iteration.id)
      );

      // Update assigned TeamIterations for milestone in order.details
      const updatedMilestoneIndex = state.details.milestones.milestones.findIndex(
        (item) => item.id === milestoneId
      );
      if (updatedMilestoneIndex > -1) {
        state.details.milestones.milestones[updatedMilestoneIndex].teamIterations = [
          ...updatedTeamIterations,
        ];
      }

      if (orderId === undefined) {
        return;
      }

      // Update assigned TeamIterations for milestone in order list store
      const updatedOrderIndex = state.list.orders.findIndex((item) => item.id === orderId);
      if (updatedOrderIndex > -1) {
        const updatedOrder = state.list.orders[updatedOrderIndex];
        const updatedMilestoneInOrderIndex = updatedOrder.milestones.findIndex(
          (item) => item.id === milestoneId
        );

        if (updatedMilestoneInOrderIndex > -1) {
          state.list.orders[updatedOrderIndex].milestones[
            updatedMilestoneInOrderIndex
          ].teamIterations = [...updatedTeamIterations];
        }
      }
    },

  },
});

export default slice.reducer;
export const {
  viewDetails,
  setFilter,
  setFilterMilestones,
  resetFilterNameMilestones,
  resetFilter,
  setSelectedItemIds,
  setTableFlags,
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

export const selectOrder = (state: RootState, id: string | undefined) => {
  return state.orders.list.orders.find((order) => order.id === id);
};

export const selectConsultingRole = (state: RootState, id: string | undefined) => {
  if (state.orders.details) {
    return state.orders.details.consultingRoles.consultingRoles.find(
      (consultingRole) => consultingRole.id === id
    );
  }
};

export const selectMilestone = (state: RootState, id: string | undefined) => {
  if (state.orders.details) {
    return state.orders.details.milestones.milestones.find((milestone) => milestone.id === id);
  }
};

// Async Thunks
// ----------------------------------------------------------------------------

// List
export const fetchOrders = (): AppThunk => {
  
  return async (dispatch) => {
    dispatch(slice.actions.orderListFetchStarted());

    let res;

    try {
      res = await getOrders();
    } catch (error) {
      dispatch(slice.actions.orderListFetchFailed(error));
      return;
    }

    dispatch(slice.actions.orderListFetchSucceeded(res.data));
  };
};

export const fetchOrder = (id: string): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.orderFetchStarted());
    let res;
    try {
      res = await getOrder(id);
    } catch (error) {
      dispatch(slice.actions.orderFetchFailed(error));
      return;
    }
    dispatch(slice.actions.orderFetchSucceeded(res.data));
  };
};

// Order
export const updateOrder = (
  updatedOrder: SetRequired<PartialDeep<Order>, 'id'>,
  senderMail: string
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.orderListUpdateStarted());

    let res;
    const oldOrder = selectOrder(getState(), updatedOrder.id);

    try {
      // TODO: Find a better solution
      if (!oldOrder) {
        throw new Error('order is undefined');
      }

      res = await patchOrder(merge(cloneDeep(oldOrder), updatedOrder), senderMail);
    } catch (error) {
      dispatch(slice.actions.orderListUpdateFailed(error));

      return Promise.reject(error);
    }

    dispatch(slice.actions.orderListUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const newOrder = (newOrder: Order, senderMail: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.orderListNewStarted());

    let res;

    try {
      res = await createOrder(newOrder, senderMail);
    } catch (error) {
      dispatch(slice.actions.orderListNewFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.orderListNewSucceeded(res.data));
    return Promise.resolve(res);
  };
};

//Details
export const deleteSelectedOrder = (
  id: string,
  senderMail: string
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    let res;
    dispatch(slice.actions.orderDeleteStarted());
    try {
      res = await deleteOrder(id, senderMail);
    } catch (error) {
      dispatch(slice.actions.orderDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.orderDeleteSuceeded(res.data));
    return Promise.resolve(res);
  };
};

//Milestone
export const newMilestone = (newMilestone: Milestone): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.milestoneNewStarted());

    let res;

    try {
      res = await createMilestone(newMilestone);
    } catch (error) {
      dispatch(slice.actions.milestoneNewFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.milestoneNewSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateMilestone = (
  updatedMilestone: SetRequired<Partial<Milestone>, 'id'>
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.milestoneUpdateStarted);

    let res;
    const oldMilestone = selectMilestone(getState(), updatedMilestone.id);

    try {
      if (!oldMilestone) {
        throw new Error('milestone is undefined');
      }

      res = await patchMilestone(updatedMilestone);
    } catch (error) {
      dispatch(slice.actions.milestoneUpdateFailed(error));

      return Promise.reject(error);
    }

    dispatch(slice.actions.milestoneUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteMilestone = (milestoneId: string): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    let res;
    dispatch(slice.actions.milestoneDeleteStarted());
    try {
      res = await removeMilestone(milestoneId);
    } catch (error) {
      dispatch(slice.actions.milestoneDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.milestoneDeleteSuceeded(res.data));
    return Promise.resolve(res);
  };
};

// Feature
export const fetchFeatures = (
  teamId: string,
  milestoneId: string
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.featuresFetchStarted());

    let res;

    try {
      res = await getFeatures(teamId, milestoneId);
    } catch (error) {
      dispatch(slice.actions.featuresFetchFailed(error));
      return Promise.reject(error);
    }

    dispatch(slice.actions.featuresFetchSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateMilestoneFeatureList = (
  orderId: string | undefined,
  milestoneId: string,
  featureIds: string[]
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.milestoneFeaturesUpdateStarted());

    let res;
    try {
      res = await updateMilestoneFeatures(milestoneId, featureIds);
    } catch (error) {
      dispatch(slice.actions.milestoneFeaturesUpdateFailed(error));

      return Promise.reject(error);
    }

    dispatch(
      slice.actions.milestoneFeaturesUpdateSucceeded({
        orderId,
        milestoneId,
        updatedFeatureIds: res.data,
      })
    );
    return Promise.resolve(res);
  };
};

// TeamIterations

export const updateMilestoneTeamIterationList = (
  orderId: string | undefined,
  milestoneId: string,
  teamIterationIds: string[],
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch, getState ) => {
    dispatch(slice.actions.milestoneTeamIterationsUpdateStarted());

    let res;
    try {
      res = await updateMilestoneTeamIterations(milestoneId, teamIterationIds);
    } catch (error) {
      dispatch(slice.actions.milestoneTeamIterationsUpdateFailed(error));

      return Promise.reject(error);
    }
    const state = getState();
    const teamIterations = selectTeamIterations(state);

    dispatch(
      slice.actions.milestoneTeamIterationsUpdateSucceeded({
        orderId,
        milestoneId,
        teamIterations,
        updatedTeamIterationIds: res.data,
      })
    );
    return Promise.resolve(res);
  };
};

// ConsultingRole
export const newConsultingRole = (
  newConsultingRole: ConsultingRole
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    dispatch(slice.actions.consultingRoleNewStarted());

    let res;

    try {
      res = await createConsultingRole(newConsultingRole);
    } catch (error) {
      dispatch(slice.actions.consultingRoleNewFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.consultingRoleNewSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const updateConsultingRole = (
  updatedConsultingRole: SetRequired<PartialDeep<ConsultingRole>, 'id'>
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.consultingRoleUpdateStarted);

    let res;
    const oldConsultingRole = selectConsultingRole(getState(), updatedConsultingRole.id);

    try {
      if (!oldConsultingRole) {
        throw new Error('milestone is undefined');
      }

      res = await patchConsultingRole(updatedConsultingRole);
    } catch (error) {
      dispatch(slice.actions.consultingRoleUpdateFailed(error));

      return Promise.reject(error);
    }

    dispatch(slice.actions.consultingRoleUpdateSucceeded(res.data));
    return Promise.resolve(res);
  };
};

export const deleteConsultingRole = (
  consultingRoleId: string
): AppThunk<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    let res;
    dispatch(slice.actions.consultingRoleDeleteStarted());
    try {
      res = await deleteRole(consultingRoleId);
    } catch (error) {
      dispatch(slice.actions.consultingRoleDeleteFailed(error));
      return Promise.reject(error);
    }
    dispatch(slice.actions.consultingRoleDeleteSuceeded(res.data));
    return Promise.resolve(res);
  };
};
