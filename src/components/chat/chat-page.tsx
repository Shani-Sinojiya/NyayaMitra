"use client";

import { ChatInterface } from "@/components/chat";
import { useChat } from "@/hooks/use-chat";
import { useChatNavigation } from "@/hooks/use-chat-navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface ChatPageProps {
  initialMessages?: Array<{
    id?: string;
    message?: string;
    type?: "user" | "ai" | "system";
    timestamp?: Date | string;
  }>;
  apiEndpoint?: string;
  title?: string;
  welcomeMessage?: string;
}

export default function ChatPage({
  initialMessages = [],
  apiEndpoint = "/api/chat",
  title = "Legal AI Assistant",
  welcomeMessage = "Hello! I'm your legal AI assistant. How can I help you with your legal questions today?",
}: ChatPageProps) {
  // Ensure all timestamps are Date objects and convert from old format to new format
  const formattedInitialMessages = initialMessages.map((msg) => ({
    id: msg.id,
    message: msg.message || msg.content || "",
    type: msg.type || (msg.role === "assistant" ? "ai" : msg.role || "user"),
    timestamp:
      msg.timestamp instanceof Date
        ? msg.timestamp
        : new Date(msg.timestamp as string),
  }));

  // Get the chat navigation hook
  const { navigateToNewChat, getPendingMessage, isNewChat } =
    useChatNavigation();
  const params = useParams() as { id?: string };
  const chatId = params?.id && params.id !== "new" ? params.id : undefined;

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    regenerateResponse,
    stopGeneration,
    retry,
  } = useChat({
    initialMessages: formattedInitialMessages,
    api: apiEndpoint, // Base API endpoint
    chatId, // Pass the chatId to the hook
    saveChatHistory: true,
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  // Check if there's a pending message that needs to be sent
  // This will happen after navigation from /chat/new
  useEffect(() => {
    const pendingMessage = getPendingMessage();
    if (pendingMessage && !isNewChat) {
      // Send the pending message
      sendMessage(pendingMessage);
    }
  }, [getPendingMessage, isNewChat, sendMessage]);

  // Wrap sendMessage to handle navigation for new chats
  const handleSendMessage = (content: string) => {
    if (isNewChat) {
      // If we're on /chat/new, try to navigate to a new chat ID
      const didNavigate = navigateToNewChat(content);

      // If navigation failed for some reason, fall back to sending in the current context
      if (!didNavigate) {
        sendMessage(content);
      }
    } else {
      // For existing chats, just send the message normally
      sendMessage(content);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 overflow-hidden">
      {/* Error Alert */}
      {error && (
        <div className="shrink-0 w-full">
          <Alert className="m-2 sm:m-4 mb-0 border-red-500 bg-red-950/50 text-red-200">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="flex items-center justify-between">
              <span className="flex-1 min-w-0 mr-2">{error.message}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={retry}
                disabled={isLoading}
                className="border-red-500 text-red-400 hover:bg-red-950/70 shrink-0"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden w-full min-h-0">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          onClearChat={clearMessages}
          isLoading={isLoading}
          onStopGeneration={stopGeneration}
          title={title}
          welcomeMessage={welcomeMessage}
          chatId={chatId}
          inputPlaceholder="Ask a legal question..."
          autoFocusInput={true}
        />
      </div>
    </div>
  );
}
