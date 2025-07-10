export { ChatInterface } from "./chat-interface";
export { ChatInput } from "./chat-input";
export { ChatMessage } from "./chat-message";
export { ChatSuggestions } from "./chat-suggestions";
export { default as ChatPage } from "./chat-page";

export interface Message {
  id?: string;
  message: string;
  type: "user" | "ai" | "system";
  timestamp?: Date | string;
}
