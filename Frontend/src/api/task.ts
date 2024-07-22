import { type Task, type TaskState, type Update } from '@redux/slices/task';

import axiosInstance from './axiosInstance';

export const getTasks = () => axiosInstance.get<Task[]>(import.meta.env.VITE_ENDPOINT_TASK);

export const postTask = (task: Omit<Task, 'id'>) =>
  axiosInstance.post<Task>(import.meta.env.VITE_ENDPOINT_TASK, task);

export const patchTask = (id: number, task: Update) =>
  axiosInstance.patch<Task>(`${import.meta.env.VITE_ENDPOINT_TASK}/${id}`, task);

export const deleteTask = (id: number) =>
  axiosInstance.delete<number>(`${import.meta.env.VITE_ENDPOINT_TASK}/${id}`);

export const getProperties = () =>
  axiosInstance.get<Pick<TaskState, 'buckets' | 'teams' | 'assignees'>>(
    import.meta.env.VITE_ENDPOINT_PROPERTIES
  );
