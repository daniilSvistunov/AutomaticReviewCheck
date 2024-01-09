import { AxiosResponse } from 'axios';

import { StateCode } from '../models/common';
import { Order, ProductGroup } from '../models/order';
import { ProductGroupEnum } from '../models/productGroup';
import { SalesOpportunity } from '../models/salesOpportunity';
import axiosInstance from './axiosInstance';

// ----------------------------------------------------------------------

export const getOrders = (): Promise<AxiosResponse<Order[]>> => {
  return axiosInstance.get<Order[]>(`${import.meta.env.VITE_ENDPOINT_ORDER}`);
};

export const getOrder = (id: string): Promise<AxiosResponse<Order>> => {
  return axiosInstance.get<Order>(`${import.meta.env.VITE_ENDPOINT_ORDER}/${id}`);
};

export const patchOrder = (order: Order, senderMail: string): Promise<AxiosResponse<Order>> => {
  return axiosInstance.patch<Order>(`${import.meta.env.VITE_ENDPOINT_ORDER}/${order.id}`, order, {
    params: {
      senderMail,
    },
  });
};

export const createOrder = (order: Order, senderMail: string): Promise<AxiosResponse<Order[]>> => {
  return axiosInstance.post<Order[]>(`${import.meta.env.VITE_ENDPOINT_ORDER}`, order, {
    params: {
      senderMail,
    },
  });
};

export const deleteOrder = async (
  orderId: string,
  senderMail: string
): Promise<AxiosResponse<Order[]>> => {
  return axiosInstance.delete<Order[]>(`${import.meta.env.VITE_ENDPOINT_ORDER}/delete/${orderId}`, {
    params: {
      senderMail,
    },
  });
};

export const getSalesOpportunities = (
  stateCode: Omit<StateCode, StateCode.CLOSED>
): Promise<AxiosResponse<SalesOpportunity[]>> => {
  return axiosInstance.get<
    SalesOpportunity[],
    AxiosResponse<SalesOpportunity[]>,
    SalesOpportunity[]
  >(`${import.meta.env.VITE_ENDPOINT_OPPORTUNITIES}?statecode=${stateCode}`);
};

export const getProductGroups = (): Promise<AxiosResponse<ProductGroup[]>> => {
  return axiosInstance.get<ProductGroup[]>(`${import.meta.env.VITE_ENDPOINT_PRODUCTGROUPS}`);
};
