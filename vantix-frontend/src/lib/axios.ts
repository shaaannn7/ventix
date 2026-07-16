import axios, { type AxiosResponse } from 'axios';
import { env } from '@/config/env';

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer mock-operations-token-2026`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Automatic session trigger or clear
    }
    return Promise.reject(error);
  }
);
