import { cn } from '@/lib/utils';
import {
  FileText,
  CheckSquare,
  UserCheck,
  MessageSquare,
  Award,
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
  isActive?: boolean;
  onClick?: () => void;
}

export function WorkflowCard({
  name,
  description,
  icon,
  isActive,
  onClick,
}: WorkflowCardProps) {
  const Icon = iconMap[icon] || FileText;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-xl text-left transition-all duration-200',
        'border border-border hover:border-primary/30',
        'bg-card hover:bg-secondary/50',
        'group focus:outline-none focus:ring-2 focus:ring-primary/20',
        isActive && 'border-primary bg-primary/5'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            'bg-secondary text-muted-foreground',
            'group-hover:bg-primary/10 group-hover:text-primary',
            'transition-colors duration-200',
            isActive && 'bg-primary/10 text-primary'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-foreground truncate">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
