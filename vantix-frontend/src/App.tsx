import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { WebSocketProvider } from './providers/WebSocketProvider';
import { AIProvider } from './providers/AIProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <WebSocketProvider>
            <AIProvider>
              <Suspense fallback={
                <div className="flex h-screen w-screen items-center justify-center bg-obsidian text-system-cyan font-mono text-sm animate-pulse">
                  SYSTEM_INITIALIZING...
                </div>
              }>
                <RouterProvider router={router} />
              </Suspense>
            </AIProvider>
          </WebSocketProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default App;
