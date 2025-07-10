"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ChatInterface } from "./chat-interface";
import { useChat } from "@/hooks/use-chat";
import { useChatNavigation } from "@/hooks/use-chat-navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Message } from "./index";

interface UnifiedChatProps {
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
  useAdvancedFeatures?: boolean;
}

// Format initial messages consistently
const formatMessages = (messages: unknown[]): Message[] => {
  return messages.map((msg: unknown) => {
    const messageObj = msg as Record<string, unknown>;
    return {
      id:
        (messageObj.id as string) ||
        `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      message:
        (messageObj.message as string) || (messageObj.content as string) || "",
      type: ((messageObj.type as string) ||
        (messageObj.role === "assistant"
          ? "ai"
          : messageObj.role || "user")) as "user" | "ai" | "system",
      timestamp:
        messageObj.timestamp instanceof Date
          ? messageObj.timestamp
          : new Date((messageObj.timestamp as string) || Date.now()),
    };
  });
};

// Custom hook for basic chat functionality
const useBasicChat = (initialMessages: Message[], apiEndpoint: string) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Abort any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        message: content,
        type: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Call API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        message: "",
        type: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle streaming response
      const reader = response.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let assistantContent = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;

            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              if (lastIndex >= 0 && newMessages[lastIndex].type === "ai") {
                newMessages[lastIndex] = {
                  ...newMessages[lastIndex],
                  message: assistantContent,
                };
              }
              return newMessages;
            });
          }
        } catch (streamError) {
          if (
            streamError instanceof Error &&
            streamError.name !== "AbortError"
          ) {
            console.error("Stream reading error:", streamError);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
  };

  const retry = () => {
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopGeneration,
    retry,
  };
};

export function UnifiedChat({
  initialMessages = [],
  apiEndpoint = "/api/chat",
  title = "Legal AI Assistant",
  welcomeMessage = "Hello! I'm your legal AI assistant. How can I help you with your legal questions today?",
  useAdvancedFeatures = true,
}: UnifiedChatProps) {
  const formattedInitialMessages = formatMessages(initialMessages);

  // Navigation for advanced features
  const params = useParams() as { id?: string };
  const chatId = params?.id && params.id !== "new" ? params.id : undefined;

  // Always call hooks at the top level
  const navigation = useChatNavigation();
  const advancedChat = useChat({
    initialMessages: formattedInitialMessages,
    api: apiEndpoint,
    saveChatHistory: true,
  });

  const basicChat = useBasicChat(formattedInitialMessages, apiEndpoint);

  // Select the appropriate chat interface based on feature flag
  const chat = useAdvancedFeatures ? advancedChat : basicChat;

  // Handle pending messages for advanced features
  useEffect(() => {
    if (useAdvancedFeatures && advancedChat && navigation) {
      const pendingMessage = navigation.getPendingMessage();
      if (pendingMessage && !navigation.isNewChat) {
        advancedChat.sendMessage(pendingMessage);
      }
    }
  }, [useAdvancedFeatures, navigation?.isNewChat]); // Remove advancedChat from dependencies to avoid infinite loops

  // Handle send message
  const handleSendMessage = (content: string) => {
    if (useAdvancedFeatures && navigation) {
      if (navigation.isNewChat) {
        const didNavigate = navigation.navigateToNewChat(content);
        if (!didNavigate) {
          advancedChat.sendMessage(content);
        }
      } else {
        advancedChat.sendMessage(content);
      }
    } else {
      basicChat.sendMessage(content);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 overflow-hidden">
      {/* Error Alert */}
      {chat.error && (
        <div className="shrink-0 w-full">
          <Alert className="m-2 sm:m-4 mb-0 border-red-500 bg-red-950/50 text-red-200">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="flex items-center justify-between">
              <span className="flex-1 min-w-0 mr-2">{chat.error.message}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={chat.retry}
                disabled={chat.isLoading}
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
          messages={chat.messages}
          onSendMessage={handleSendMessage}
          onClearChat={chat.clearMessages}
          isLoading={chat.isLoading}
          onStopGeneration={chat.stopGeneration}
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
