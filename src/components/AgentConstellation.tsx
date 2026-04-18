import { useMemo } from 'react';
import {
  FileText, CheckSquare, UserCheck, MessageSquare, Award, Sparkles,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WORKFLOW_AGENTS } from '@/lib/api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const iconMap: Record<string, LucideIcon> = {
  FileText, CheckSquare, UserCheck, MessageSquare, Award,
};

interface AgentConstellationProps {
  /** id of agent that just produced output (lit / glowing) */
  activeAgentId?: string | null;
  /** id of agent currently being invoked while loading (pulsing) */
  thinkingAgentId?: string | null;
  /** is the conductor working right now (any pending request) */
  isThinking?: boolean;
  onSelectAgent?: (id: string) => void;
}

// Polar layout: conductor at center, agents around a circle.
// viewBox is wider than the orbit ring so labels don't clip on the sides.
const W = 360;
const H = 300;
const CX = W / 2;
const CY = H / 2;
const R = 100;

export function AgentConstellation({
  activeAgentId,
  thinkingAgentId,
  isThinking,
  onSelectAgent,
}: AgentConstellationProps) {
  const nodes = useMemo(() => {
    return WORKFLOW_AGENTS.map((agent, i) => {
      // Distribute around full circle, starting at top
      const angle = (i / WORKFLOW_AGENTS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        ...agent,
        x: CX + Math.cos(angle) * R,
        y: CY + Math.sin(angle) * R,
      };
    });
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          aria-label="Agent constellation"
        >
        {/* Connecting lines: conductor → each agent */}
        {nodes.map((n) => {
          const isActive = activeAgentId === n.id;
          const isPending = thinkingAgentId === n.id && isThinking;
          return (
            <line
              key={`line-${n.id}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke={
                isActive || isPending
                  ? 'hsl(var(--accent))'
                  : 'hsl(var(--sidebar-border))'
              }
              strokeWidth={isActive || isPending ? 1.25 : 0.75}
              strokeDasharray={isPending ? '4 4' : undefined}
              className={cn(isPending && 'animate-flow')}
              opacity={isActive ? 0.9 : isPending ? 0.85 : 0.5}
            />
          );
        })}

        {/* Outer guide ring */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="hsl(var(--sidebar-border))"
          strokeWidth={0.5}
          strokeDasharray="2 4"
          opacity={0.6}
        />

        {/* Conductor center node */}
        <g>
          {isThinking && (
            <>
              <circle
                cx={CX}
                cy={CY}
                r={28}
                fill="hsl(var(--accent) / 0.12)"
                className="animate-pulse-soft"
              />
              <circle
                cx={CX}
                cy={CY}
                r={22}
                fill="hsl(var(--accent) / 0.18)"
                className="animate-pulse-soft"
              />
            </>
          )}
          <circle
            cx={CX}
            cy={CY}
            r={18}
            fill="hsl(var(--foreground))"
            stroke="hsl(var(--accent))"
            strokeWidth={isThinking ? 1.5 : 0.75}
          />
          <foreignObject x={CX - 10} y={CY - 10} width={20} height={20}>
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5',
                  isThinking ? 'text-accent' : 'text-background',
                )}
                strokeWidth={2}
              />
            </div>
          </foreignObject>
        </g>

        {/* Agent nodes */}
        {nodes.map((n) => {
          const Icon = iconMap[n.icon] || FileText;
          const isActive = activeAgentId === n.id;
          const isPending = thinkingAgentId === n.id && isThinking;
          const lit = isActive || isPending;
          return (
            <g
              key={n.id}
              className="pointer-events-none"
            >
              {/* Glow halo when lit */}
              {lit && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={22}
                  fill="hsl(var(--accent) / 0.18)"
                  className="animate-pulse-soft"
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={16}
                fill={
                  lit ? 'hsl(var(--accent))' : 'hsl(var(--sidebar))'
                }
                stroke={
                  lit
                    ? 'hsl(var(--accent))'
                    : 'hsl(var(--sidebar-border))'
                }
                strokeWidth={1}
                className="transition-all duration-300"
              />
              <foreignObject
                x={n.x - 9}
                y={n.y - 9}
                width={18}
                height={18}
                className="pointer-events-none"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Icon
                    className={cn(
                      'w-3.5 h-3.5 transition-colors duration-300',
                      lit
                        ? 'text-accent-foreground'
                        : 'text-sidebar-foreground/70',
                    )}
                    strokeWidth={1.75}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Agent labels */}
        {nodes.map((n) => {
          const isActive = activeAgentId === n.id;
          const isPending = thinkingAgentId === n.id && isThinking;
          const lit = isActive || isPending;
          // Push label outward from center
          const dx = n.x - CX;
          const dy = n.y - CY;
          const len = Math.sqrt(dx * dx + dy * dy);
          const lx = n.x + (dx / len) * 22;
          const ly = n.y + (dy / len) * 22;
          // Anchor based on side
          const anchor =
            Math.abs(dx) < 10 ? 'middle' : dx > 0 ? 'start' : 'end';
          const short = SHORT_LABELS[n.id] ?? n.name;
          return (
            <text
              key={`label-${n.id}`}
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              className={cn(
                'pointer-events-none transition-colors duration-300',
                lit
                  ? 'fill-accent'
                  : 'fill-[hsl(var(--sidebar-foreground))] opacity-60',
              )}
              style={{
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 8,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {short}
            </text>
          );
        })}
      </svg>

        {/* Status caption */}
        <div className="mt-2 flex items-center justify-between px-2">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-sidebar-foreground/40">
            Conductor
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-sidebar-foreground/50 flex items-center gap-1.5">
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                isThinking
                  ? 'bg-accent animate-pulse-soft'
                  : activeAgentId
                  ? 'bg-accent'
                  : 'bg-sidebar-foreground/30',
              )}
            />
            {isThinking
              ? 'Composing…'
              : activeAgentId
              ? `${getShort(activeAgentId)} active`
              : 'Standby'}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}

const SHORT_LABELS: Record<string, string> = {
  'job-description': 'Job Desc',
  'evaluation-criteria': 'Criteria',
  'resume-evaluation': 'Resume',
  'interviewer': 'Interview',
  'interview-evaluator': 'Verdict',
};

function getShort(id: string) {
  return SHORT_LABELS[id] ?? '';
}
