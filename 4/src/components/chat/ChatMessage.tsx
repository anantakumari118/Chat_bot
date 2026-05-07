import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessageModel } from "@/types/chat";
import { formatTime } from "@/utils/format";
import { cn } from "@/utils/cn";
import { CodeBlock } from "./CodeBlock";

interface ChatMessageProps {
  message: ChatMessageModel;
}

export function ChatMessage({ message }: ChatMessageProps): JSX.Element {
  const isUser = message.role === "user";

  return (
    <article className="grid grid-cols-1 gap-1 py-2.5 md:grid-cols-[88px_1fr] md:gap-3 md:py-3">
      <div className="pt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {isUser ? "You" : "Assistant"}
      </div>

      <div className={cn("min-w-0", isUser && "md:flex md:justify-end")}>
        <div
          className={cn(
            "rounded-xl border p-4 shadow-subtle md:p-5",
            isUser
              ? "w-full border-accent/15 bg-accent/[0.06] px-4 py-3 shadow-none md:max-w-[72%]"
              : "w-full border-border/80 bg-background md:max-w-[92%]"
          )}
        >
          <div className="prose prose-sm max-w-none leading-[1.66] text-foreground prose-headings:mb-2 prose-headings:mt-4 prose-headings:font-semibold prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-pre:hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className } = props;
                  const content = String(children).replace(/\n$/, "");
                  if (!className) return <code>{children}</code>;
                  const language = className.replace("language-", "");
                  return <CodeBlock code={content} language={language} />;
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        <p className={cn("mt-1 px-1 text-[10px] text-muted-foreground/80", isUser && "text-right")}>
          {formatTime(message.createdAt)}
        </p>
      </div>
    </article>
  );
}
