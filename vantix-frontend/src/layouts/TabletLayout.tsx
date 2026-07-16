import React from 'react';

export const TabletLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col hidden sm:flex md:hidden">
      <header className="h-[56px] border-b border-system-border bg-obsidian-muted flex items-center px-md">
        <span className="font-mono text-sm text-system-cyan">VANTIX TAB</span>
      </header>
      <main className="flex-1 overflow-auto p-lg">
        {children}
      </main>
    </div>
  );
};
export default TabletLayout;
