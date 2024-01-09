import { AxiosResponse } from 'axios';

import { Application } from '../models/application';
import axiosInstance from './axiosInstance';

export const getApplication = (
  internalApplicationPageName: string
): Promise<AxiosResponse<Application>> => {
  return axiosInstance.get<Application>(`${import.meta.env.VITE_ENDPOINT_APPLICATION}`, {
    params: { internalApplicationPageName },
  });
};
