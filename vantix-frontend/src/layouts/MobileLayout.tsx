import React from 'react';

export const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col md:hidden">
      <header className="h-[48px] border-b border-system-border bg-obsidian-muted flex items-center justify-center">
        <span className="font-mono text-xs text-system-cyan">VANTIX MOBILE</span>
      </header>
      <main className="flex-1 overflow-auto p-md">
        {children}
      </main>
    </div>
  );
};
export default MobileLayout;
