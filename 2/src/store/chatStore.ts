import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatState, Conversation, Message, LearningCategory, SuggestedPrompt, LearningAction } from '@/types';
import { generateId } from '@/utils/formatters';
import { LEARNING_CATEGORIES, SUGGESTED_PROMPTS, LEARNING_ACTIONS } from '@/utils/constants';

interface ChatStore extends ChatState {
  // Actions
  setCurrentConversation: (conversation: Conversation | null) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  setLoading: (loading: boolean) => void;
  setTyping: (typing: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setMode: (mode: 'floating' | 'full-page') => void;
  createNewConversation: (title?: string) => string;
  clearCurrentConversation: () => void;
  regenerateResponse: (messageId: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      conversations: [],
      currentConversation: null,
      isLoading: false,
      isTyping: false,
      error: null,
      sidebarOpen: true,
      theme: 'system',
      mode: 'full-page',
      suggestedPrompts: SUGGESTED_PROMPTS,
      learningActions: LEARNING_ACTIONS,

      // Actions
      setCurrentConversation: (conversation) => {
        set({ currentConversation: conversation });
      },

      addConversation: (conversation) => {
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        }));
      },

      updateConversation: (id, updates) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, ...updates, updatedAt: new Date() } : conv
          ),
          currentConversation:
            state.currentConversation?.id === id
              ? { ...state.currentConversation, ...updates, updatedAt: new Date() }
              : state.currentConversation,
        }));
      },

      deleteConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== id),
          currentConversation:
            state.currentConversation?.id === id ? null : state.currentConversation,
        }));
      },

      addMessage: (conversationId, message) => {
        set((state) => {
          const updateConversationMessages = (conv: Conversation) => ({
            ...conv,
            messages: [...conv.messages, message],
            updatedAt: new Date(),
          });

          return {
            conversations: state.conversations.map((conv) =>
              conv.id === conversationId ? updateConversationMessages(conv) : conv
            ),
            currentConversation:
              state.currentConversation?.id === conversationId
                ? updateConversationMessages(state.currentConversation)
                : state.currentConversation,
          };
        });
      },

      updateMessage: (conversationId, messageId, updates) => {
        set((state) => {
          const updateConversationMessages = (conv: Conversation) => ({
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === messageId ? { ...msg, ...updates } : msg
            ),
            updatedAt: new Date(),
          });

          return {
            conversations: state.conversations.map((conv) =>
              conv.id === conversationId ? updateConversationMessages(conv) : conv
            ),
            currentConversation:
              state.currentConversation?.id === conversationId
                ? updateConversationMessages(state.currentConversation)
                : state.currentConversation,
          };
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setTyping: (typing) => {
        set({ isTyping: typing });
      },

      setError: (error) => {
        set({ error });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setTheme: (theme) => {
        set({ theme });
      },

      setMode: (mode) => {
        set({ mode });
      },

      createNewConversation: (title = 'New Chat') => {
        const conversation: Conversation = {
          id: generateId(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        get().addConversation(conversation);
        get().setCurrentConversation(conversation);

        return conversation.id;
      },

      clearCurrentConversation: () => {
        const { currentConversation } = get();
        if (currentConversation) {
          get().updateConversation(currentConversation.id, { messages: [] });
        }
      },

      regenerateResponse: (messageId) => {
        const { currentConversation } = get();
        if (!currentConversation) return;

        const messageIndex = currentConversation.messages.findIndex(msg => msg.id === messageId);
        if (messageIndex === -1 || currentConversation.messages[messageIndex].role !== 'assistant') return;

        // Remove the assistant message and trigger regeneration
        const updatedMessages = currentConversation.messages.slice(0, messageIndex);
        get().updateConversation(currentConversation.id, { messages: updatedMessages });
        
        // Trigger resend of the last user message
        const lastUserMessage = updatedMessages.reverse().find(msg => msg.role === 'user');
        if (lastUserMessage) {
          // This would trigger the API call to regenerate the response
          // Implementation would be in the chat service
        }
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
