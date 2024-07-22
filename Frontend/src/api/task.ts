import { type Task } from '@redux/slices/task';

import axiosInstance from './axiosInstance';

export const getTasks = () => axiosInstance.get<Task[]>(import.meta.env.VITE_ENDPOINT_TASK);

export const postTask = (task: Omit<Task, 'id'>) =>
  axiosInstance.post<Task>(import.meta.env.VITE_ENDPOINT_TASK, task);
