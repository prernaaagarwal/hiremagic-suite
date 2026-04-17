import { useState, useRef, KeyboardEvent, DragEvent, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Loader2, X, FileText, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseFile, isSupported, ParsedFile } from '@/lib/fileParser';
import { toast } from 'sonner';

interface ChatInputProps {
  onSend: (message: string, file?: ParsedFile) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<ParsedFile | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if ((!input.trim() && !attachedFile) || isLoading || isParsing) return;
    onSend(input, attachedFile ?? undefined);
    setInput('');
    setAttachedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const processFile = useCallback(async (file: File) => {
    if (!isSupported(file)) {
      toast.error('Unsupported file type. Please upload PDF or DOCX files.');
      return;
    }
    setIsParsing(true);
    try {
      const parsed = await parseFile(file);
      setAttachedFile(parsed);
      toast.success(`"${parsed.name}" attached successfully`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setIsParsing(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-accent bg-accent/5 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-accent">
            <Upload className="w-7 h-7" strokeWidth={1.5} />
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase">Drop resume · PDF or DOCX</p>
          </div>
        </div>
      )}

      {/* Attached file preview */}
      {attachedFile && (
        <div className="mb-2 flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border animate-fade-in">
          <FileText className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <p className="font-display text-base text-foreground truncate leading-tight">{attachedFile.name}</p>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
              {formatSize(attachedFile.size)} · {attachedFile.text.split(/\s+/).length} words extracted
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-7 w-7"
            onClick={() => setAttachedFile(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Parsing indicator */}
      {isParsing && (
        <div className="mb-2 flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border animate-fade-in">
          <Loader2 className="w-4 h-4 text-accent animate-spin flex-shrink-0" />
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Extracting text…</p>
        </div>
      )}

      <div className="flex items-end gap-2 p-3 bg-card rounded-lg border border-border shadow-soft focus-within:border-accent/40 focus-within:shadow-glow transition-all">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-muted-foreground hover:text-accent"
          disabled={isLoading || isParsing}
          onClick={() => fileInputRef.current?.click()}
          title="Attach resume (PDF/DOCX)"
        >
          <Paperclip className="w-4 h-4" strokeWidth={1.5} />
        </Button>

        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={attachedFile ? 'Add instructions for evaluation…' : (placeholder || 'Describe your hiring needs…')}
          disabled={isLoading}
          className={cn(
            'flex-1 min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-muted-foreground/60 text-[15px] leading-relaxed'
          )}
          rows={1}
        />

        <Button
          onClick={handleSubmit}
          disabled={(!input.trim() && !attachedFile) || isLoading || isParsing}
          size="icon"
          className="flex-shrink-0 rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" strokeWidth={1.5} />
          )}
        </Button>
      </div>
    </div>
  );
}
