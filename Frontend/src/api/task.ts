import { type Task, type Update } from '@redux/slices/task';

import axiosInstance from './axiosInstance';

export const getTasks = () => axiosInstance.get<Task[]>(import.meta.env.VITE_ENDPOINT_TASK);

export const postTask = (task: Omit<Task, 'id'>) =>
  axiosInstance.post<Task>(import.meta.env.VITE_ENDPOINT_TASK, task);

export const patchTask = (id: number, task: Update) =>
  axiosInstance.patch<Task>(`${import.meta.env.VITE_ENDPOINT_TASK}/${id}`, task);
