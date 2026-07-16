import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('http://localhost:8000/api'),
  VITE_WS_TELEMETRY_URL: z.string().url().default('ws://localhost:8000/ws/operations'),
  VITE_MAPBOX_ACCESS_TOKEN: z.string().default('mock_mapbox_token'),
  VITE_SIMULATION_MODE: z.enum(['true', 'false']).default('true'),
});

export const env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_WS_TELEMETRY_URL: import.meta.env.VITE_WS_TELEMETRY_URL,
  VITE_MAPBOX_ACCESS_TOKEN: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  VITE_SIMULATION_MODE: import.meta.env.VITE_SIMULATION_MODE,
});
