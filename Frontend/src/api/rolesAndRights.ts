import { AxiosResponse } from 'axios';

import { ConsultingRole } from '../models/consultingRole';
import axiosInstance from './axiosInstance';

export const createConsultingRole = (
  consultingRole: ConsultingRole
): Promise<AxiosResponse<ConsultingRole[]>> => {
  return axiosInstance.post<ConsultingRole[]>(
    `${import.meta.env.VITE_ENDPOINT_CONSULTINGROLESORDER}`,
    consultingRole
  );
};

export const patchConsultingRole = (
  consultingRole: Partial<ConsultingRole>
): Promise<AxiosResponse<Partial<ConsultingRole>>> => {
  return axiosInstance.patch<ConsultingRole>(
    `${import.meta.env.VITE_ENDPOINT_CONSULTINGROLES}/${consultingRole.id}`,
    consultingRole
  );
};

export const deleteConsultingRole = (
  consultingRoleId: string
): Promise<AxiosResponse<ConsultingRole[]>> => {
  return axiosInstance.delete<ConsultingRole[]>(
    `${import.meta.env.VITE_ENDPOINT_CONSULTINGROLES}/${consultingRoleId}`
  );
};
