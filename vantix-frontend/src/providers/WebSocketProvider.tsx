import React, { createContext, useEffect, useRef } from 'react';
import { TelemetryWSClient } from '@/services/websocket';
import { env } from '@/config/env';

export const WebSocketContext = createContext<TelemetryWSClient | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wsClientRef = useRef<TelemetryWSClient | null>(null);

  useEffect(() => {
    const wsUrl = `${env.VITE_WS_TELEMETRY_URL}?token=mock-operations-token-2026`;
    const client = new TelemetryWSClient(wsUrl);
    client.connect();
    wsClientRef.current = client;

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={wsClientRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};
