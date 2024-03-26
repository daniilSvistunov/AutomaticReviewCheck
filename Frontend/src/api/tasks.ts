

import './mock/task';

import { Task } from '@models/interfaces';
import { AxiosResponse } from 'axios';

import axiosInstance from './axiosInstance';

export const getTasks = (): Promise<AxiosResponse<Task[]>> => {
  return axiosInstance.get<Task[]>(`${import.meta.env.VITE_ENDPOINT_TASKS}/hallo`);
};


export const postTask =(item:Task): Promise<AxiosResponse<Task>>=> {
  return axiosInstance.post <Task>(`${import.meta.env.VITE_ENDPOINT_TASKS}/hallo`, {item});

};

