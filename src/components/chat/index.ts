export { ChatInterface } from "./chat-interface";
export { ChatInput } from "./chat-input";
export { ChatMessage } from "./chat-message";
export { ChatSuggestions } from "./chat-suggestions";
export { UnifiedChat } from "./unified-chat";
export { default as ChatPage } from "./chat-page";
export { default as BasicChatPage } from "./basic-chat-page";

export interface Message {
  id?: string;
  message: string;
  type: "user" | "ai" | "system";
  timestamp?: Date | string;
}
