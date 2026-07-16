import { apiClient } from '@/lib/axios';
import { ENDPOINTS } from '@/config/endpoints';

export const CoreAPIService = {
  fetchTelemetryHistory: async () => {
    const res = await apiClient.get(ENDPOINTS.telemetry.history);
    return res.data;
  },
  fetchSystemStats: async () => {
    const res = await apiClient.get(ENDPOINTS.telemetry.stats);
    return res.data;
  },
};
