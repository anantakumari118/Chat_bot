export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  metadata?: {
    tokens?: number;
    model?: string;
    latency?: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  topic?: string;
  category?: LearningCategory;
}

export interface LearningCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  category?: string;
  icon?: string;
}

export interface LearningAction {
  id: string;
  label: string;
  icon: string;
  action: 'explain' | 'example' | 'practice' | 'summarize' | 'interview' | 'quiz';
  description?: string;
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  filename?: string;
  collapsible?: boolean;
  expanded?: boolean;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  mode: 'floating' | 'full-page';
  suggestedPrompts: SuggestedPrompt[];
  learningActions: LearningAction[];
}

export interface ChatConfig {
  apiUrl: string;
  apiKey?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  streaming: boolean;
  systemPrompt?: string;
}

export interface ApiResponse {
  message: string;
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

export interface StreamingResponse {
  id: string;
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason?: string;
  }>;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  notifications: boolean;
  autoSave: boolean;
  codeTheme: 'vs-dark' | 'vs-light' | 'github-dark' | 'github-light';
}

export interface ChatInputState {
  value: string;
  isComposing: boolean;
  suggestions: string[];
  showSuggestions: boolean;
}

export interface SidebarSection {
  id: string;
  title: string;
  type: 'conversations' | 'categories' | 'recent' | 'saved';
  items: any[];
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface AIStatus {
  online: boolean;
  model: string;
  responseTime?: number;
  lastActive?: Date;
}
