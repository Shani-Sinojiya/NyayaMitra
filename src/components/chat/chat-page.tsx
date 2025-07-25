"use client";

import { UnifiedChat } from "./unified-chat";

interface ChatPageProps {
  initialMessages?: Array<{
    id?: string;
    message?: string;
    content?: string;
    type?: "user" | "ai" | "system";
    role?: string;
    timestamp?: Date | string;
  }>;
  apiEndpoint?: string;
  title?: string;
  welcomeMessage?: string;
}

export default function ChatPage(props: ChatPageProps) {
  return <UnifiedChat {...props} useAdvancedFeatures={true} />;
}
