import { Task } from '@models/task';
import { AxiosResponse } from 'axios';

import axiosInstance from './axiosInstance';

export const getTasks = (): Promise<AxiosResponse<Task[]>> => {
  return axiosInstance.get<Task[]>(`${import.meta.env.VITE_ENDPOINT_TASKS}`);
};

export const updateTask = (task: Task): Promise<AxiosResponse<Task>> => {
  return axiosInstance.put<Task>(`${import.meta.env.VITE_ENDPOINT_TASKS}/${task.id}`, task);
};

export const createTask = (task: Task): Promise<AxiosResponse<Task>> => {
  return axiosInstance.post<Task>(`${import.meta.env.VITE_ENDPOINT_TASKS}`, task);
};

export const removeTask = (id: string): Promise<AxiosResponse> => {
  return axiosInstance.delete(`${import.meta.env.VITE_ENDPOINT_TASKS}/${id}`);
};
