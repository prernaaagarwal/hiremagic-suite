import { ChatMessage as ChatMessageType } from '@/lib/api';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const time = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="animate-slide-up">
      {/* Byline */}
      <header className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center border',
            isUser
              ? 'bg-foreground text-background border-foreground'
              : 'bg-card text-foreground border-border',
          )}
        >
          <span className="font-display italic text-sm leading-none">
            {isUser ? 'y' : 'h'}
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-base">
            {isUser ? 'You' : <span className="italic">The studio</span>}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {isUser ? 'Editor' : 'Conductor'} · {time}
          </span>
        </div>
      </header>

      {/* Body */}
      <div
        className={cn(
          'ml-10 rounded-lg px-5 py-4 border',
          isUser
            ? 'bg-foreground/[0.03] border-foreground/10'
            : 'bg-card border-border shadow-soft',
        )}
      >
        {isUser ? (
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-foreground">
            {message.content}
          </p>
        ) : (
          <div
            className={cn(
              'prose prose-sm max-w-none',
              'prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight',
              'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
              'prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-foreground',
              'prose-strong:text-foreground prose-strong:font-semibold',
              'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
              'prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none',
              'prose-ul:my-3 prose-li:my-1 prose-li:text-foreground',
              'prose-blockquote:border-l-accent prose-blockquote:italic prose-blockquote:font-display prose-blockquote:text-lg',
              'prose-hr:border-border',
            )}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}
