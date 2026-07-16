import React from 'react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-obsidian text-white font-sans flex flex-col">
      {/* Structural layout skeleton only - F1 dashboard shell */}
      <header className="h-[56px] border-b border-system-border bg-obsidian-muted px-lg flex items-center justify-between">
        <span className="font-mono text-sm tracking-widest text-system-cyan">VANTIX // HUD</span>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-[280px] border-r border-system-border bg-obsidian-muted p-md hidden md:block">
          <nav className="space-y-sm font-mono text-xs">
            <div>SYSTEM DIRECTORY</div>
          </nav>
        </aside>
        <section className="flex-1 overflow-auto bg-obsidian p-lg">
          {children}
        </section>
      </main>
    </div>
  );
};
export default MainLayout;
