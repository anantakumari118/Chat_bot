import type { Conversation } from "@/types/chat";
import { cn } from "@/utils/cn";

interface ConversationListProps {
  items: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({
  items,
  activeId,
  onSelect
}: ConversationListProps): JSX.Element {
  return (
    <ul className="space-y-1.5">
      {items.map((conversation) => {
        const isActive = conversation.id === activeId;
        return (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "group relative w-full rounded-lg border px-3 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive
                  ? "border-border/80 bg-background text-foreground shadow-subtle"
                  : "border-transparent text-muted-foreground hover:border-border/80 hover:bg-background hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-transparent transition-colors duration-200",
                  isActive ? "bg-accent" : "group-hover:bg-accent/30"
                )}
              />
              <span className="block truncate text-[13px] font-medium">{conversation.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
