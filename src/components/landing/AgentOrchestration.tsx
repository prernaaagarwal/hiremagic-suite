import { useEffect, useState } from 'react';
import { FileText, CheckSquare, UserCheck, MessageSquare, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const STAGES = [
  { id: 'jd', label: 'Job Description', num: '01', Icon: FileText },
  { id: 'criteria', label: 'Evaluation Criteria', num: '02', Icon: CheckSquare },
  { id: 'resume', label: 'Resume Screening', num: '03', Icon: UserCheck },
  { id: 'interview', label: 'Interview', num: '04', Icon: MessageSquare },
  { id: 'evaluate', label: 'Final Evaluation', num: '05', Icon: Award },
];

export function AgentOrchestration() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full">
      {/* Constellation lines (desktop) */}
      <svg
        className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.0" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--signal))" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M 80 100 C 240 40, 360 160, 500 100 S 760 40, 920 100"
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="1.5"
          className="animate-flow"
        />
      </svg>

      <ol className="relative grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2">
        {STAGES.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li key={s.id} className="flex flex-col items-center text-center">
              <div
                className={cn(
                  'relative h-16 w-16 rounded-full border flex items-center justify-center transition-all duration-700',
                  'bg-card',
                  isActive
                    ? 'border-accent shadow-glow scale-110'
                    : isPast
                    ? 'border-foreground/40'
                    : 'border-border',
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-soft" />
                )}
                <s.Icon
                  className={cn(
                    'w-6 h-6 transition-colors duration-500 relative z-10',
                    isActive ? 'text-accent' : isPast ? 'text-foreground' : 'text-muted-foreground',
                  )}
                  strokeWidth={1.5}
                />
              </div>
              <span className="mt-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {s.num}
              </span>
              <span
                className={cn(
                  'font-display text-lg leading-tight mt-1 transition-colors duration-500',
                  isActive ? 'text-foreground italic' : 'text-foreground/80',
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
