import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'terminal' | 'quiz' | 'alert';
  metadata?: any;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isSidebarOpen: boolean;
  currentTopic: string;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI learning assistant. How can I help you with your IT studies today?",
      timestamp: new Date(),
    }
  ],
  isLoading: false,
  isSidebarOpen: true,
  currentTopic: 'General Learning',
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    }]
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  clearMessages: () => set({ messages: [] }),
}));
