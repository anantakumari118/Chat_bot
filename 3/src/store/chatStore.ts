import { create } from 'zustand'
import { chatApi } from '../services/chatApi'
import type { ChatMessage, Conversation, RichBlock } from '../types/chat'

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const aiBlocks: RichBlock[] = [
  {
    id: 'tip-1',
    type: 'tip',
    title: 'Tip',
    content: 'Use spaced repetition to remember APIs and syntax patterns.',
  },
  {
    id: 'terminal-1',
    type: 'terminal',
    title: 'Terminal',
    content: '$ npm create vite@latest\n$ npm install\n$ npm run dev',
  },
  {
    id: 'warning-1',
    type: 'warning',
    title: 'Common Pitfall',
    content: 'Do not overuse useEffect for derived values. Prefer computed state in render when possible.',
  },
  {
    id: 'diagram-1',
    type: 'diagram',
    title: 'Diagram Placeholder',
    content: 'System flow: User Prompt -> Context Builder -> LLM -> Streaming Renderer -> Quiz Generator',
  },
]

const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'TypeScript Fundamentals',
    category: 'Frontend',
    updatedAt: 'Today',
    pinned: true,
    messages: [
      {
        id: 'm-1',
        role: 'assistant',
        timestamp: now(),
        content: 'Welcome back. Ask anything about React, TypeScript, DSA, or interview prep.',
        blocks: aiBlocks,
      },
    ],
  },
]

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string
  input: string
  isStreaming: boolean
  sendError: string | null
  setInput: (value: string) => void
  setActiveConversation: (id: string) => void
  sendMessage: (prompt: string, actions?: string[]) => Promise<void>
  regenerate: () => Promise<void>
}

const appendMessage = (
  conversations: Conversation[],
  conversationId: string,
  message: ChatMessage,
) =>
  conversations.map((conversation) =>
    conversation.id === conversationId
      ? {
          ...conversation,
          messages: [...conversation.messages, message],
          updatedAt: 'Now',
        }
      : conversation,
  )

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: initialConversations,
  activeConversationId: initialConversations[0].id,
  input: '',
  isStreaming: false,
  sendError: null,
  setInput: (value) => set({ input: value }),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  sendMessage: async (prompt, actions = []) => {
    if (!prompt.trim()) return
    const conversationId = get().activeConversationId
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      timestamp: now(),
    }
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: now(),
      isStreaming: true,
    }
    set((state) => ({
      input: '',
      isStreaming: true,
      sendError: null,
      conversations: appendMessage(
        appendMessage(state.conversations, conversationId, userMessage),
        conversationId,
        assistantMessage,
      ),
    }))

    try {
      for await (const chunk of chatApi.streamMessage({ conversationId, prompt, actions })) {
        if (chunk.done) {
          set((state) => ({
            isStreaming: false,
            conversations: state.conversations.map((conversation) =>
              conversation.id === conversationId
                ? {
                    ...conversation,
                    messages: conversation.messages.map((message, index, arr) =>
                      index === arr.length - 1
                        ? { ...message, isStreaming: false, blocks: aiBlocks }
                        : message,
                    ),
                  }
                : conversation,
            ),
          }))
          break
        }
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  messages: conversation.messages.map((message, index, arr) =>
                    index === arr.length - 1
                      ? { ...message, content: message.content + chunk.token }
                      : message,
                  ),
                }
              : conversation,
          ),
        }))
      }
    } catch (error) {
      set({ sendError: `Request failed: ${String(error)}`, isStreaming: false })
    }
  },
  regenerate: async () => {
    const state = get()
    const active = state.conversations.find((c) => c.id === state.activeConversationId)
    if (!active) return
    const lastUser = [...active.messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return
    await state.sendMessage(lastUser.content)
  },
}))
