export type Role = 'user' | 'assistant' | 'system'

export type RichBlockType =
  | 'note'
  | 'warning'
  | 'tip'
  | 'highlight'
  | 'terminal'
  | 'diagram'

export interface RichBlock {
  id: string
  type: RichBlockType
  title: string
  content: string
}

export interface ChatMessage {
  id: string
  role: Role
  content: string
  timestamp: string
  isStreaming?: boolean
  blocks?: RichBlock[]
}

export interface Conversation {
  id: string
  title: string
  category: string
  updatedAt: string
  pinned?: boolean
  messages: ChatMessage[]
}

export interface ChatRequest {
  conversationId: string
  prompt: string
  actions?: string[]
}

export interface ChatResponseChunk {
  token: string
  done: boolean
}
