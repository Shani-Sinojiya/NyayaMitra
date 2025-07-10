"use client";

import { useState, useCallback, useRef } from "react";
import { Message } from "@/components/chat";

export interface UseChatOptions {
  initialMessages?: Message[];
  onResponse?: (message: Message) => void;
  onError?: (error: Error) => void;
  api?: string;
  maxRetries?: number;
  chatId?: string;
  userId?: string;
  sessionId?: string;
  saveChatHistory?: boolean;
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  regenerateResponse: (messageId: string) => Promise<void>;
  stopGeneration: () => void;
  retry: () => Promise<void>;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const {
    initialMessages = [],
    onResponse,
    onError,
    api = "/api/chat",
    maxRetries = 3,
    chatId,
    userId,
    sessionId,
    saveChatHistory = true,
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string>("");

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;

      lastUserMessageRef.current = content;
      setError(null);
      setIsLoading(true);

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        message: content,
        type: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        // Create abort controller
        abortControllerRef.current = new AbortController();

        // Use chatId in the API endpoint if provided
        const apiEndpoint = chatId ? `${api}/${chatId}` : api;

        // Prepare request body with additional metadata
        const requestBody = {
          messages: [...messages, userMessage],
          userId,
          sessionId,
          saveChatHistory,
        };

        // Call API
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          message: "",
          type: "ai",
          timestamp: new Date(),
        };

        // Add empty assistant message
        setMessages((prev) => [...prev, assistantMessage]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    assistantContent += parsed.content;

                    // Update assistant message
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      const lastMessage = newMessages[newMessages.length - 1];
                      if (lastMessage.type === "ai") {
                        lastMessage.message = assistantContent;
                      }
                      return newMessages;
                    });
                  }
                } catch (e) {
                  console.error("Error parsing streaming response:", e);
                }
              }
            }
          }
        }

        // Final assistant message
        const finalMessage: Message = {
          ...assistantMessage,
          message:
            assistantContent ||
            "Sorry, I encountered an error generating a response.",
        };

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = finalMessage;
          return newMessages;
        });

        onResponse?.(finalMessage);
        setRetryCount(0);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          // Request was aborted
          setMessages((prev) => prev.slice(0, -1)); // Remove the empty assistant message
          return;
        }

        const error =
          err instanceof Error ? err : new Error("Unknown error occurred");
        setError(error);
        onError?.(error);

        // Remove the empty assistant message on error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading, api, onResponse, onError]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setRetryCount(0);
  }, []);

  const regenerateResponse = useCallback(
    async (messageId: string) => {
      const messageIndex = messages.findIndex((msg) => msg.id === messageId);
      if (messageIndex === -1) return;

      const previousUserMessage = messages[messageIndex - 1];
      if (!previousUserMessage || previousUserMessage.type !== "user") return;

      // Remove the message we're regenerating
      setMessages((prev) => prev.slice(0, messageIndex));

      // Resend the previous user message
      await sendMessage(previousUserMessage.message);
    },
    [messages, sendMessage]
  );

  const retry = useCallback(async () => {
    if (retryCount >= maxRetries) {
      setError(new Error(`Max retries (${maxRetries}) exceeded`));
      return;
    }

    setRetryCount((prev) => prev + 1);
    await sendMessage(lastUserMessageRef.current);
  }, [retryCount, maxRetries, sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    regenerateResponse,
    stopGeneration,
    retry,
  };
}
