import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Users, 
  Clock, 
  MapPin,
  CheckCircle2,
  Send
} from 'lucide-react';
import type { VolunteerTask } from '@/types/volunteer';

const Volunteers: React.FC = () => {
  const [tasks, setTasks] = useState<VolunteerTask[]>([
    { id: 't-1', title: 'Gate B4 Ingress assistance', description: 'Help direct incoming crowds at Gate B4 turnstiles due to queue surge.', assignedLocation: 'Gate B4 Turnstiles', status: 'active', dueDate: Date.now() + 15 * 60 * 1000 },
    { id: 't-2', title: 'VIP Area Guide duties', description: 'Escort delegation members from main reception to VIP Box West.', assignedLocation: 'Reception / VIP Box West', status: 'pending', dueDate: Date.now() + 45 * 60 * 1000 },
    { id: 't-3', title: 'Sector A Info Desk support', description: 'Provide information regarding parking shuttles and maps.', assignedLocation: 'Sector A Corridor', status: 'completed', dueDate: Date.now() - 10 * 60 * 1000 },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskLoc, setNewTaskLoc] = useState('Gate B4 Turnstiles');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: VolunteerTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || 'Assist local operations staff with crowd logistics.',
      assignedLocation: newTaskLoc,
      status: 'pending',
      dueDate: Date.now() + 30 * 60 * 1000,
    };

    setTasks(prev => [task, ...prev]);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'pending' ? 'active' : t.status === 'active' ? 'completed' : 'pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const activeCount = tasks.filter(t => t.status === 'active').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-green uppercase tracking-widest font-semibold">
              Resource Operations Console
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Volunteers Management Portal
            </h1>
            <p className="text-xs text-system-mutedText">
              Coordinate and dispatch standby volunteer squads to active sectors, gate queues, and information points.
            </p>
          </div>

          {/* Volunteer Status KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Total Staff Active</span>
              <span className="text-lg font-bold text-white tracking-wide">142 Volunteers</span>
            </div>
            <div className="bg-obsidian-muted border border-system-green/30 rounded-xs p-sm flex flex-col gap-2xs shadow-glow">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Active Tasks</span>
              <span className="text-lg font-bold text-system-green tracking-wide">{activeCount} Tasks</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Pending Dispatch</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">{pendingCount} Standby</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Tasks Completed</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">{completedCount} Missions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-stretch">
            {/* Left Box: Active Task List (7 cols) */}
            <div className="lg:col-span-7 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Volunteer Missions Registry</span>
              <div className="space-y-sm overflow-y-auto max-h-[360px] scrollbar-none pr-xs">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-obsidian-elevated/40 border rounded-xs p-sm flex items-center justify-between transition-colors ${
                      task.status === 'active' 
                        ? 'border-system-green/25 hover:border-system-green/45' 
                        : task.status === 'completed'
                        ? 'border-system-purple/20 opacity-60'
                        : 'border-system-border/60 hover:border-system-border'
                    }`}
                  >
                    <div className="flex items-center gap-sm">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="p-xs bg-obsidian border border-system-border rounded-xs hover:border-system-green transition-colors"
                        aria-label="Toggle task status"
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-system-purple" />
                        ) : task.status === 'active' ? (
                          <span className="w-4 h-4 rounded-full border-2 border-system-green border-t-transparent animate-spin block" />
                        ) : (
                          <Clock className="w-4 h-4 text-system-mutedText" />
                        )}
                      </button>
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-xs font-semibold text-white">{task.title}</span>
                        <span className="text-[10px] text-system-mutedText">{task.description}</span>
                        <div className="flex items-center gap-xs mt-[2px] font-mono text-[9px] text-system-cyan">
                          <MapPin className="w-3 h-3 text-system-mutedText" />
                          <span>{task.assignedLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2xs font-mono text-right shrink-0">
                      <span className="text-[9px] text-system-mutedText uppercase">Status</span>
                      <span className={`text-[10px] uppercase font-bold ${
                        task.status === 'completed' 
                          ? 'text-system-purple' 
                          : task.status === 'active'
                          ? 'text-system-green'
                          : 'text-system-cyan'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Quick Dispatch form (5 cols) */}
            <div className="lg:col-span-5 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-system-green/5 blur-[35px] pointer-events-none rounded-full" />
              <div className="flex items-center gap-xs border-b border-system-border/50 pb-sm">
                <Users className="w-4 h-4 text-system-green" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Aura AI Quick Dispatch</span>
              </div>

              <form onSubmit={handleDispatch} className="flex flex-col gap-sm text-xs">
                <div className="flex flex-col gap-2xs">
                  <label htmlFor="task-title" className="font-mono text-[9px] text-system-mutedText uppercase">Task Title</label>
                  <input 
                    id="task-title"
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Concourse D Queue management"
                    className="w-full h-sm px-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-green"
                  />
                </div>

                <div className="flex flex-col gap-2xs">
                  <label htmlFor="task-loc" className="font-mono text-[9px] text-system-mutedText uppercase">Target Location</label>
                  <select 
                    id="task-loc"
                    value={newTaskLoc}
                    onChange={(e) => setNewTaskLoc(e.target.value)}
                    className="w-full h-sm px-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-green"
                  >
                    <option value="Gate B4 Turnstiles">Gate B4 Turnstiles</option>
                    <option value="Gate C Concourse">Gate C Concourse</option>
                    <option value="Sector A Corridor">Sector A Corridor</option>
                    <option value="VIP Access Lobby">VIP Access Lobby</option>
                    <option value="Transit Shuttle Terminus">Transit Shuttle Terminus</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2xs">
                  <label htmlFor="task-desc" className="font-mono text-[9px] text-system-mutedText uppercase">Instructions</label>
                  <textarea 
                    id="task-desc"
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    placeholder="Provide specific instructions for the volunteers..."
                    rows={3}
                    className="w-full p-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-green resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="flex items-center justify-center gap-xs w-full py-sm bg-system-green hover:bg-system-green/90 border border-system-green/40 text-obsidian rounded-xs font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 active:scale-95 shadow-glow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Volunteers</span>
                </button>
              </form>
            </div>
          </div>
        </main>
        <AICopilotSidebar />
      </div>
      <BottomTelemetryBar />
      <AuraFAB />
    </div>
  );
};

export default Volunteers;
