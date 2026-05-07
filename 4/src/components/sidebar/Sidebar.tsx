import { MenuSquare } from "lucide-react";
import type { Conversation } from "@/types/chat";
import { cn } from "@/utils/cn";
import { ConversationList } from "./ConversationList";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelectConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  isOpen,
  onToggle,
  onSelectConversation
}: SidebarProps): JSX.Element {
  const todayConversations = conversations.slice(0, 1);
  const previousConversations = conversations.slice(1);

  return (
    <aside
      className={cn(
        "h-full border-r border-border/80 bg-background/90 shadow-card backdrop-blur-[2px] transition-[width] duration-200",
        isOpen ? "w-72" : "w-[72px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/80 px-4">
        {isOpen ? (
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-foreground">Conversations</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">Recent learning threads</p>
          </div>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Toggle sidebar"
        >
          <MenuSquare className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 p-3.5">
        {isOpen ? (
          <>
            <div>
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Today
              </p>
              <ConversationList
                items={todayConversations}
                activeId={activeConversationId}
                onSelect={onSelectConversation}
              />
            </div>
            {previousConversations.length > 0 ? (
              <div className="border-t border-border/60 pt-3">
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Previous
                </p>
                <ConversationList
                  items={previousConversations}
                  activeId={activeConversationId}
                  onSelect={onSelectConversation}
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center text-xs text-muted-foreground">Chat</div>
        )}
      </div>
    </aside>
  );
}
