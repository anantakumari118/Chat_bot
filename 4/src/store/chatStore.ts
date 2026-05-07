import { create } from "zustand";
import { exampleConversations } from "@/data/exampleChatData";
import { sendMessageMock } from "@/services/mockChatApi";
import type { ChatMessageModel, Conversation } from "@/types/chat";

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string;
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  isTyping: boolean;
  setActiveConversation: (id: string) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  sendMessage: (content: string) => Promise<void>;
}

function appendMessage(
  conversations: Conversation[],
  conversationId: string,
  message: ChatMessageModel
): Conversation[] {
  return conversations.map((conversation) =>
    conversation.id === conversationId
      ? {
          ...conversation,
          messages: [...conversation.messages, message],
          updatedAt: message.createdAt
        }
      : conversation
  );
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: exampleConversations,
  activeConversationId: exampleConversations[0].id,
  isSidebarOpen: true,
  isMobileSidebarOpen: false,
  isTyping: false,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
  sendMessage: async (content) => {
    const text = content.trim();
    if (!text) return;

    const currentId = get().activeConversationId;
    const userMessage: ChatMessageModel = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString()
    };

    set((state) => ({
      conversations: appendMessage(state.conversations, currentId, userMessage),
      isTyping: true
    }));

    const assistantMessage = await sendMessageMock(text);

    set((state) => ({
      conversations: appendMessage(state.conversations, currentId, assistantMessage),
      isTyping: false
    }));
  }
}));
