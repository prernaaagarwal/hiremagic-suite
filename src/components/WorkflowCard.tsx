import { cn } from '@/lib/utils';
import {
  FileText,
  CheckSquare,
  UserCheck,
  MessageSquare,
  Award,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  CheckSquare,
  UserCheck,
  MessageSquare,
  Award,
};

interface WorkflowCardProps {
  name: string;
  description: string;
  icon: string;
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function WorkflowCard({
  name,
  description,
  icon,
  index,
  isActive,
  onClick,
}: WorkflowCardProps) {
  const Icon = iconMap[icon] || FileText;
  const num = typeof index === 'number' ? String(index + 1).padStart(2, '0') : '';

  return (
    <button
      onClick={onClick}
      className={cn(
        'group w-full text-left px-3 py-3 rounded-lg transition-all duration-300',
        'border border-transparent hover:border-sidebar-border hover:bg-sidebar-accent',
        'focus:outline-none focus:ring-1 focus:ring-accent/60',
        isActive && 'border-sidebar-border bg-sidebar-accent'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 border',
            'border-sidebar-border bg-sidebar text-sidebar-foreground/80',
            'group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300',
            isActive && 'border-accent/50 text-accent'
          )}
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {num && (
              <span className="font-mono text-[10px] tracking-[0.2em] text-sidebar-foreground/40">
                {num}
              </span>
            )}
            <h3 className="font-display text-base leading-tight truncate">
              {name}
            </h3>
          </div>
          <p className="text-xs text-sidebar-foreground/60 mt-1 line-clamp-2 leading-snug">
            {description}
          </p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-sidebar-foreground/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
