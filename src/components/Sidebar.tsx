import { WORKFLOW_AGENTS } from '@/lib/api';
import { WorkflowCard } from './WorkflowCard';
import { Button } from '@/components/ui/button';
import { Plus, Settings, HelpCircle, Users } from 'lucide-react';
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
        'w-80 bg-sidebar text-sidebar-foreground flex flex-col h-full',
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">HR Agent</h1>
            <p className="text-xs text-sidebar-foreground/60">Hiring Manager</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Hiring Session
        </Button>
      </div>

      {/* Workflow Agents */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h2 className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-1">
          Workflow Agents
        </h2>
        <div className="space-y-2">
          {WORKFLOW_AGENTS.map((agent) => (
            <WorkflowCard
              key={agent.id}
              name={agent.name}
              description={agent.description}
              icon={agent.icon}
              onClick={() => onSelectWorkflow?.(agent.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
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
