import { AxiosResponse } from 'axios';

import { Employee } from '../models/employee';
import axiosInstance from './axiosInstance';

// All employees
export const getEmployees = (): Promise<AxiosResponse<Employee[]>> => {
  return axiosInstance.get<Employee[]>(`${import.meta.env.VITE_ENDPOINT_EMPLOYEES}`);
};

// Employees of team with id
export const getTeamEmployees = (teamId: string): Promise<AxiosResponse<Employee[]>> => {
  return axiosInstance.get<Employee[]>(`${import.meta.env.VITE_ENDPOINT_EMPLOYEES}`, {
    params: {
      teamId: teamId,
    },
  });
};
