import { Employee } from '@models/employee';
import { AxiosResponse } from 'axios';

import { Team } from '../models/team';
import axiosInstance from './axiosInstance';

export const getTeams = (): Promise<AxiosResponse<Team[]>> => {
  return axiosInstance.get<Team[]>(`${import.meta.env.VITE_ENDPOINT_TEAMS}`);
};

export const getTeam = (teamId: string): Promise<AxiosResponse<Team>> => {
  return axiosInstance.get<Team>(`${import.meta.env.VITE_ENDPOINT_TEAMS}/${teamId}`);
};

export const getContributors = (teamId: string): Promise<AxiosResponse<Employee[]>> => {
  return axiosInstance.get<Employee[]>(
    `${import.meta.env.VITE_ENDPOINT_TEAMS}/${teamId}/contributors`
  );
};
