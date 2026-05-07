export type Role = "user" | "assistant" | "system";

export interface ChatMessageModel {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessageModel[];
}
