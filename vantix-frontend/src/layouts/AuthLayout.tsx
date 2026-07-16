import React from 'react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-lg">
      <div className="w-full max-w-sm border border-system-border bg-obsidian-muted rounded-md p-xl">
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
