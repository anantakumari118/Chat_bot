import { AnimatePresence } from "framer-motion";
import { useMemo, useRef } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Header } from "@/components/chat/Header";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useChatStore } from "@/store/chatStore";

interface AppLayoutProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function AppLayout({ theme, onToggleTheme }: AppLayoutProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    conversations,
    activeConversationId,
    isSidebarOpen,
    isMobileSidebarOpen,
    isTyping,
    setActiveConversation,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    sendMessage
  } = useChatStore();

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations]
  );

  return (
    <div className="flex h-dvh bg-background text-foreground">
      {isMobileSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-slate-900/25 backdrop-blur-[1px] md:hidden"
          onClick={closeMobileSidebar}
          aria-label="Close conversations"
        />
      ) : null}

      {isMobileSidebarOpen ? (
        <div className="fixed inset-y-0 left-0 z-30 md:hidden">
          <Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            isOpen
            onToggle={closeMobileSidebar}
            onSelectConversation={(id) => {
              setActiveConversation(id);
              closeMobileSidebar();
            }}
          />
        </div>
      ) : null}

      <div className="hidden md:block">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          onSelectConversation={setActiveConversation}
        />
      </div>

      <main className="relative flex min-w-0 flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_42%)]" />
        <Header theme={theme} onToggleTheme={onToggleTheme} onToggleSidebar={toggleMobileSidebar} />

        <section ref={scrollRef} className="relative z-[1] flex-1 overflow-y-auto px-3 py-3 md:px-6 md:py-4">
          <div className="mx-auto max-w-[880px] rounded-2xl border border-border/70 bg-background/95 px-4 py-4 shadow-card md:px-7 md:py-6">
            <SuggestedPrompts onPick={(prompt) => void sendMessage(prompt)} />
            {activeConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <AnimatePresence>{isTyping ? <TypingIndicator /> : null}</AnimatePresence>
          </div>
        </section>

        <ChatInput isPending={isTyping} onSubmit={sendMessage} />
      </main>
    </div>
  );
}
