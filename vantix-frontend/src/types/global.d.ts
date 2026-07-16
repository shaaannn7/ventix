export interface SystemStatus {
  latencyMs: number;
  dbSync: 'OK' | 'DEGRADED' | 'FAILED';
  websocketStatus: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
}
