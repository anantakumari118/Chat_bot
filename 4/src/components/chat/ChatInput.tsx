import { SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

interface ChatInputProps {
  isPending: boolean;
  onSubmit: (value: string) => Promise<void>;
}

export function ChatInput({ isPending, onSubmit }: ChatInputProps): JSX.Element {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutoResizeTextarea(textareaRef, value);

  const submit = async (): Promise<void> => {
    if (!value.trim() || isPending) return;
    const payload = value;
    setValue("");
    await onSubmit(payload);
  };

  return (
    <div className="border-t border-border/60 bg-background/90 px-3 py-3 backdrop-blur md:px-6 md:py-3.5">
      <div className="mx-auto max-w-[880px]">
        <div className="rounded-xl border border-border/80 bg-background p-2.5 shadow-panel transition-all duration-200 focus-within:border-accent/40">
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={value}
            rows={1}
            placeholder="Ask a question about IT concepts..."
            className="w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/90 md:text-[15px]"
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submit();
              }
            }}
          />
          <div className="flex items-center justify-between px-2 pb-0.5 pt-1.5">
            <div className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              Enter to send • Shift+Enter for newline
            </div>
            <button
              type="button"
              onClick={() => void submit()}
              disabled={!value.trim() || isPending}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-subtle transition-all duration-200 hover:translate-y-[-1px] hover:brightness-95 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Send message"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
