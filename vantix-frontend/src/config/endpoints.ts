export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  telemetry: {
    history: '/telemetry/history',
    stats: '/telemetry/stats',
  },
  ai: {
    chat: '/ai/chat',
    whisper: '/ai/whisper',
    actionPlan: '/ai/action-plan',
  },
  dispatch: {
    teams: '/dispatch/teams',
    alerts: '/dispatch/alerts',
    updateAlert: (id: string) => `/dispatch/alerts/${id}`,
  },
} as const;
