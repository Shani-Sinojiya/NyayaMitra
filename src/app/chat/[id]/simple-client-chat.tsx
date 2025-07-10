"use client";

import { UnifiedChat } from "@/components/chat/unified-chat";

interface SimpleClientChatProps {
  initialMessages?: unknown[];
  title?: string;
  welcomeMessage?: string;
  apiEndpoint?: string;
}

export default function SimpleClientChat({
  initialMessages = [],
  title = "Legal AI Assistant",
  welcomeMessage = "How can I help with your legal questions today?",
  apiEndpoint = "/api/chat",
}: SimpleClientChatProps) {
  return (
    <UnifiedChat
      initialMessages={
        initialMessages as Array<{
          id?: string;
          message?: string;
          content?: string;
          type?: "user" | "ai" | "system";
          role?: string;
          timestamp?: string | Date;
        }>
      }
      title={title}
      welcomeMessage={welcomeMessage}
      apiEndpoint={apiEndpoint}
      useAdvancedFeatures={true}
    />
  );
}
