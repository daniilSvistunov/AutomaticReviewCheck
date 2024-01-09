import { AxiosResponse } from 'axios';

import { TeamIteration } from '../models/teamIteration';
import axiosInstance from './axiosInstance';

export const getTeamIterations = (teamId: string): Promise<AxiosResponse<TeamIteration[]>> => {
  return axiosInstance.get<TeamIteration[]>(`${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}`, {
    params: {
      teamId,
    },
  });
};

export const postTeamIterations = (
  teamId: string,
  teamIterations: TeamIteration[]
): Promise<AxiosResponse<TeamIteration[]>> => {
  return axiosInstance.post<TeamIteration[]>(
    `${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}`,
    teamIterations
  );
};

export const deleteTeamIteration = (
  teamiterationId: string
): Promise<AxiosResponse<TeamIteration[]>> => {
  return axiosInstance.delete<TeamIteration[]>(
    `${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}/${teamiterationId}`
  );
};

export const deleteTeamIterations = (
  teamIterations: string[]
): Promise<AxiosResponse<TeamIteration[]>> => {
  return axiosInstance.delete<TeamIteration[]>(`${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}`, {
    params: {
      teamIterations,
    },
  });
};
