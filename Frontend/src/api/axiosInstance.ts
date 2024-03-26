

import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: undefined,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error.message || error)
);

export default axiosInstance;
