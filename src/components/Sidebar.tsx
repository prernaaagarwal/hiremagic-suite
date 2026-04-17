import { Link } from 'react-router-dom';
import { WORKFLOW_AGENTS } from '@/lib/api';
import { WorkflowCard } from './WorkflowCard';
import { Button } from '@/components/ui/button';
import { Plus, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onNewChat: () => void;
  onSelectWorkflow?: (id: string) => void;
  className?: string;
}

export function Sidebar({ onNewChat, onSelectWorkflow, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-80 bg-sidebar text-sidebar-foreground flex flex-col h-full border-r border-sidebar-border',
        className
      )}
    >
      {/* Header — editorial masthead */}
      <div className="px-6 pt-7 pb-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center">
            <span className="font-display italic text-lg leading-none">h</span>
          </div>
          <div>
            <h1 className="font-display text-2xl leading-none">Hiremagic</h1>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-sidebar-foreground/50 mt-1.5">
              Editorial studio
            </p>
          </div>
        </Link>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-sidebar-foreground/40">
            Vol. 01 · Issue 04
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/50">
              Live
            </span>
          </span>
        </div>
      </div>

      {/* New Session */}
      <div className="px-4 pt-4">
        <Button
          onClick={onNewChat}
          className="w-full justify-between h-11 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow font-medium"
        >
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New hiring session
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">⌘ N</span>
        </Button>
      </div>

      {/* Agents */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="flex items-center justify-between px-2 mb-3">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-sidebar-foreground/40">
            § The cast
          </h2>
          <span className="font-mono text-[10px] text-sidebar-foreground/30">
            {WORKFLOW_AGENTS.length}
          </span>
        </div>
        <div className="space-y-1">
          {WORKFLOW_AGENTS.map((agent, i) => (
            <WorkflowCard
              key={agent.id}
              index={i}
              name={agent.name}
              description={agent.description}
              icon={agent.icon}
              onClick={() => onSelectWorkflow?.(agent.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
