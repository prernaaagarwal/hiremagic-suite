import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { messages, isLoading, error, send, clearChat } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectWorkflow = (id: string) => {
    const prompts: Record<string, string> = {
      'job-description': 'I want to create a new job description',
      'evaluation-criteria': 'Help me generate evaluation criteria for a role',
      'resume-evaluation': 'I need to evaluate a candidate resume',
      'interviewer': 'Start an interview session for a candidate',
      'interview-evaluator': 'Evaluate an interview that was conducted',
    };
    if (prompts[id]) {
      send(prompts[id]);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          onNewChat={() => {
            clearChat();
            setSidebarOpen(false);
          }}
          onSelectWorkflow={handleSelectWorkflow}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-semibold">HR Agent</span>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <ChatArea
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={send}
          onClear={clearChat}
        />
      </main>

      {/* Mobile close button */}
      {sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-50 lg:hidden bg-card shadow-medium"
        >
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
