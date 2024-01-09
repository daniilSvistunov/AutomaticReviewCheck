import { AxiosResponse } from 'axios';

import { Milestone } from '../models/milestone';
import axiosInstance from './axiosInstance';

export const createMilestone = (milestone: Milestone): Promise<AxiosResponse<Milestone[]>> => {
  return axiosInstance.post<Milestone[]>(`${import.meta.env.VITE_ENDPOINT_MILESTONES}`, milestone);
};

export const patchMilestone = (
  milestone: Partial<Milestone>
): Promise<AxiosResponse<Partial<Milestone>>> => {
  return axiosInstance.patch<Milestone>(
    `${import.meta.env.VITE_ENDPOINT_MILESTONES}/${milestone.id}`,
    milestone
  );
};

export const updateMilestoneTeamIterations = (
  milestoneId: string,
  teamIterationIds: string[]
): Promise<AxiosResponse<string[]>> => {
  return axiosInstance.post<string[]>(
    `${import.meta.env.VITE_ENDPOINT_MILESTONES_ITERATIONS}`,
    teamIterationIds,
    {
      params: {
        milestoneId: milestoneId,
      },
    }
  );
};

export const deleteMilestone = (milestoneId: string): Promise<AxiosResponse<Milestone[]>> => {
  return axiosInstance.delete<Milestone[]>(
    `${import.meta.env.VITE_ENDPOINT_MILESTONES}/${milestoneId}`
  );
};

export const updateMilestoneFeatures = (
  milestoneId: string,
  featureIds: string[]
): Promise<AxiosResponse<string[]>> => {
  return axiosInstance.post<string[]>(
    `${import.meta.env.VITE_ENDPOINT_MILESTONES_FEATURES}`,
    featureIds,
    {
      params: {
        milestoneId: milestoneId,
      },
    }
  );
};
