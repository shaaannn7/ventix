import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In enterprise staging, this logs the stack trace directly to remote telemetry collectors (e.g. Sentry or Datadog)
    console.error("Uncaught operational workspace error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[260px] p-xl border border-system-crimson/30 bg-system-crimson/[0.02] rounded-md text-center gap-md font-sans">
          <div className="p-sm bg-system-crimson/10 border border-system-crimson/20 rounded-xs text-system-crimson">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-xs">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Workspace Execution Fault
            </h4>
            <p className="text-xs text-system-mutedText max-w-sm">
              An uncaught rendering exception occurred within this telemetry container. Operation state degraded.
            </p>
          </div>
          <button
            onClick={this.handleReset}
            aria-label="Reload telemetry dashboard session"
            className="flex items-center gap-xs px-md py-xs bg-obsidian-elevated hover:bg-obsidian-sub border border-system-border rounded-xs text-xs text-white transition-all font-mono active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-system-cyan" />
            <span>Reload Session</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
