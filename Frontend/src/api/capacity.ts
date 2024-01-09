import { Capacity } from '@models/capacity';
import { AxiosResponse } from 'axios';

import axiosInstance from './axiosInstance';

export const getCapacitiesOfOrder = (orderId: string): Promise<AxiosResponse<Capacity[]>> => {
  return axiosInstance.get<Capacity[]>(`${import.meta.env.VITE_ENDPOINT_CAPACITIES}/${orderId}`);
};

export const getCapacities = (): Promise<AxiosResponse<Capacity[]>> => {
  return axiosInstance.get<Capacity[]>(`${import.meta.env.VITE_ENDPOINT_CAPACITIES}`);
};

export const postCapacities = (capacities: Capacity[]): Promise<AxiosResponse<Capacity[]>> => {
  return axiosInstance.post<Capacity[]>(`${import.meta.env.VITE_ENDPOINT_CAPACITIES}`, capacities);
};

export const deleteCapacityWithId = (capacityId: string): Promise<AxiosResponse<Capacity[]>> => {
  return axiosInstance.delete(`${import.meta.env.VITE_ENDPOINT_CAPACITIES}/${capacityId}`);
};
