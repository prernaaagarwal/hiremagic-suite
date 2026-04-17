import { useRef, useEffect } from 'react';
import { ParsedFile } from '@/lib/fileParser';
import { ChatMessage as ChatMessageType } from '@/lib/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface ChatAreaProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string, file?: ParsedFile) => void;
  onClear: () => void;
}

export function ChatArea({
  messages,
  isLoading,
  error,
  onSend,
  onClear,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 grain">
      {/* Header — editorial folio */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            § Session
          </span>
          <div>
            <h2 className="font-display text-xl leading-none">
              The Hiring <span className="italic">Assistant</span>
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1.5">
              Conductor · orchestrating five agents
            </p>
          </div>
        </div>
        {hasMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground font-mono text-[11px] tracking-[0.15em] uppercase"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            New session
          </Button>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {hasMessages ? (
          <div className="max-w-3xl mx-auto px-8 py-10 space-y-8">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {isLoading && (
              <div className="ml-10 animate-fade-in">
                <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-5 py-4 shadow-soft">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                    The studio is composing…
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        ) : (
          <WelcomeScreen onQuickAction={onSend} />
        )}
      </div>

      {/* Input */}
      <div className="px-8 pb-6 pt-3 max-w-3xl mx-auto w-full">
        <ChatInput
          onSend={onSend}
          isLoading={isLoading}
          placeholder={
            hasMessages
              ? 'Continue directing the studio…'
              : 'Describe the role, paste a resume, or pose a question…'
          }
        />
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-center text-muted-foreground/60 mt-4">
          Five specialists · One conducted score
        </p>
      </div>
    </div>
  );
}
