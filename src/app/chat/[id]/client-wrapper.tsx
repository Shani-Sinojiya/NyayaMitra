"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// We dynamically import the SimpleClientChat component with SSR disabled
// This ensures no React hooks are executed on the server
const SimpleClientChatNoSSR = dynamic(
  () => import("./simple-client-chat"),
  { ssr: false } // Disable Server-Side Rendering completely
);

interface ClientWrapperProps {
  initialMessages?: Array<{
    id?: string;
    message?: string;
    content?: string;
    type?: string;
    role?: string;
    timestamp?: Date | string;
  }>;
  title?: string;
  welcomeMessage?: string;
  apiEndpoint?: string;
  chatId?: string;
}

export default function ClientWrapper({
  initialMessages = [],
  title = "Legal AI Assistant",
  welcomeMessage,
  apiEndpoint = "/api/chat",
  chatId,
}: ClientWrapperProps) {
  // Safely handle initialMessages on the client side using useState initializer
  const [messages, setMessages] = useState<
    Array<{
      id?: string;
      message?: string;
      content?: string;
      type?: string;
      role?: string;
      timestamp?: Date | string;
    }>
  >(() => {
    // Initialize with initialMessages if they exist and are valid
    if (Array.isArray(initialMessages)) {
      return initialMessages;
    }
    return [];
  });
  const [mounted, setMounted] = useState(false);

  // Set up the correct endpoint based on whether we have a chatId
  const finalApiEndpoint = chatId ? `${apiEndpoint}/${chatId}` : apiEndpoint;

  useEffect(() => {
    // Mark as mounted
    setMounted(true);
  }, []);

  // Show a loading state until the component is mounted
  if (!mounted) {
    return <div className="p-4">Loading chat interface...</div>;
  }

  // Only render the SimpleClientChat component once we're on the client
  return (
    <SimpleClientChatNoSSR
      initialMessages={messages}
      title={title}
      welcomeMessage={
        welcomeMessage || "How can I help with your legal questions today?"
      }
      apiEndpoint={finalApiEndpoint}
    />
  );
}
