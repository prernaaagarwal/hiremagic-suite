import { Button } from '@/components/ui/button';
import {
  FileText,
  CheckSquare,
  UserCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface WelcomeScreenProps {
  onQuickAction: (action: string) => void;
}

const quickActions = [
  {
    icon: FileText,
    title: 'Create Job Description',
    description: 'Generate a comprehensive JD for any role',
    prompt: 'I want to create a job description for a new position',
  },
  {
    icon: CheckSquare,
    title: 'Set Evaluation Criteria',
    description: 'Define structured hiring parameters',
    prompt: 'Help me create evaluation criteria for a job role',
  },
  {
    icon: UserCheck,
    title: 'Evaluate Resume',
    description: 'Screen and score candidate applications',
    prompt: 'I need to evaluate a candidate resume',
  },
  {
    icon: MessageSquare,
    title: 'Conduct Interview',
    description: 'Run structured product manager interviews',
    prompt: 'Start an interview session for a product manager role',
  },
];

export function WelcomeScreen({ onQuickAction }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Hero */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-3">
          AI Hiring Manager
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
          Streamline your hiring workflow with intelligent orchestration of specialized agents.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              onClick={() => onQuickAction(action.prompt)}
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-secondary/80 hover:border-primary/30 transition-all"
            >
              <action.icon className="w-5 h-5 text-primary" />
              <div className="text-left">
                <span className="font-medium text-foreground block">
                  {action.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {action.description}
                </span>
              </div>
            </Button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-sm text-muted-foreground mt-10">
          Or type your hiring request below to get started
        </p>
      </div>
    </div>
  );
}
