import { AxiosResponse } from 'axios';
import { Feature } from 'src/models/feature';

import axiosInstance from './axiosInstance';

export const getFeatures = (
  teamId: string,
  milestoneId: string
): Promise<AxiosResponse<Feature[]>> => {
  return axiosInstance.get<Feature[]>(`${import.meta.env.VITE_ENDPOINT_FEATURES}`, {
    params: { teamId, milestoneId },
  });
};
