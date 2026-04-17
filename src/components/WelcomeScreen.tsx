import { Button } from '@/components/ui/button';
import {
  FileText,
  CheckSquare,
  UserCheck,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';

interface WelcomeScreenProps {
  onQuickAction: (action: string) => void;
}

const quickActions = [
  {
    num: '01',
    icon: FileText,
    title: 'Compose a job description',
    description: 'Write a role with voice, structure, and inclusive precision.',
    prompt: 'I want to create a job description for a new position',
  },
  {
    num: '02',
    icon: CheckSquare,
    title: 'Architect an evaluation rubric',
    description: 'Translate requirements into weighted scoring criteria.',
    prompt: 'Help me create evaluation criteria for a job role',
  },
  {
    num: '03',
    icon: UserCheck,
    title: 'Read & score a resume',
    description: 'Screen candidates against the rubric with reasoning.',
    prompt: 'I need to evaluate a candidate resume',
  },
  {
    num: '04',
    icon: MessageSquare,
    title: 'Conduct a structured interview',
    description: 'Run a rigorous, calibrated conversation.',
    prompt: 'Start an interview session for a product manager role',
  },
];

export function WelcomeScreen({ onQuickAction }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
      <div className="w-full max-w-3xl animate-slide-up">
        {/* Masthead */}
        <div className="text-center mb-14">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            The Studio · Opening page
          </span>
          <div className="editorial-rule my-5" />
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] tracking-tight text-balance">
            What shall we
            <br />
            <span className="italic text-accent">hire for today?</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Direct the studio. Five specialists — a writer, architect, reader, interviewer, and critic — are standing by.
          </p>
        </div>

        {/* Quick actions as editorial entries */}
        <div className="border-t border-border">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => onQuickAction(action.prompt)}
              className="group w-full text-left grid grid-cols-12 gap-4 py-5 border-b border-border hover:bg-card/60 transition-colors px-2 -mx-2 rounded-sm"
            >
              <div className="col-span-1 font-mono text-[11px] tracking-[0.25em] text-muted-foreground pt-1.5">
                {action.num}
              </div>
              <div className="col-span-1 flex justify-center pt-1">
                <action.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </div>
              <div className="col-span-9">
                <h3 className="font-display text-2xl leading-tight group-hover:italic group-hover:text-accent transition-all">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
              <div className="col-span-1 flex justify-end pt-2">
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mt-10">
          — or describe your hiring need below —
        </p>
      </div>
    </div>
  );
}
