import { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatAreaProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
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
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div>
          <h2 className="font-semibold text-foreground">Hiring Assistant</h2>
          <p className="text-xs text-muted-foreground">
            Orchestrating job descriptions, evaluations & interviews
          </p>
        </div>
        {hasMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Session
          </Button>
        )}
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {hasMessages ? (
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  </div>
                </div>
                <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border shadow-soft">
                  <p className="text-sm text-muted-foreground">
                    Processing your request...
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 animate-fade-in">
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

      {/* Input Area */}
      <div className="px-6 pb-6 pt-2 max-w-3xl mx-auto w-full">
        <ChatInput
          onSend={onSend}
          isLoading={isLoading}
          placeholder={
            hasMessages
              ? 'Continue the conversation...'
              : 'Describe your hiring needs...'
          }
        />
        <p className="text-[11px] text-center text-muted-foreground/60 mt-3">
          AI HR Manager orchestrates specialized agents for your hiring workflow
        </p>
      </div>
    </div>
  );
}
