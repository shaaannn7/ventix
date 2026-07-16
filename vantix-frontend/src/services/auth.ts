import { apiClient } from '@/lib/axios';
import { ENDPOINTS } from '@/config/endpoints';
import type { UserSession } from '@/types/user';

export const AuthService = {
  login: async (credentials: unknown): Promise<UserSession> => {
    const res = await apiClient.post(ENDPOINTS.auth.login, credentials);
    return res.data;
  },
  logout: async () => {
    await apiClient.post(ENDPOINTS.auth.logout);
  },
};
