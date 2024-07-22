import { type Task } from '@redux/slices/task';

import axiosInstance from './axiosInstance';

export const getTasks = () => axiosInstance.get<Task[]>(import.meta.env.VITE_ENDPOINT_TASK);
