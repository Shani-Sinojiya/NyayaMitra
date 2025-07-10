"use client";

import { UnifiedChat } from "./unified-chat";

interface BasicChatPageProps {
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

export default function BasicChatPage(props: BasicChatPageProps) {
  return <UnifiedChat {...props} useAdvancedFeatures={false} />;
}
