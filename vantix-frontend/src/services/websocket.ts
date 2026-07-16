import { useTelemetryStore } from '@/store/telemetryStore';

export class TelemetryWSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        useTelemetryStore.getState().setSystemStatus({ websocketStatus: 'CONNECTED' });
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'metric') {
          useTelemetryStore.getState().updateMetric(data.sectorId, data.payload);
        }
      };

      this.ws.onclose = () => {
        useTelemetryStore.getState().setSystemStatus({ websocketStatus: 'DISCONNECTED' });
        this.attemptReconnect();
      };
    } catch {
      useTelemetryStore.getState().setSystemStatus({ websocketStatus: 'FAILED' as any });
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < 5) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), 3000);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
