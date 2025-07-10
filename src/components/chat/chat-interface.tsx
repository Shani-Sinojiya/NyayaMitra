"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ChatSuggestions } from "./chat-suggestions";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import "./mobile-optimizations.css";
import { Message } from "./index";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearChat?: () => void;
  isLoading?: boolean;
  onStopGeneration?: () => void;
  className?: string;
  title?: string;
  welcomeMessage?: string;
  chatId?: string;
  inputPlaceholder?: string;
  autoFocusInput?: boolean;
  disabled?: boolean;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  className,
  title = "AI Assistant",
  welcomeMessage = "Hello! How can I help you today?",
  chatId,
  inputPlaceholder = "Ask me anything...",
  autoFocusInput = false,
  disabled = false,
}: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: shouldAutoScroll ? "auto" : "smooth",
        });
        setShouldAutoScroll(true);
        setShowScrollButton(false);
      }
    }
  }, [shouldAutoScroll]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll, scrollToBottom]);

  // Monitor scroll position
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const viewport = scrollArea.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (!viewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setShouldAutoScroll(isAtBottom);
      setShowScrollButton(!isAtBottom && messages.length > 0);
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [messages.length]);

  return (
    <div
      className={cn(
        "flex flex-col h-full w-full bg-gray-900 text-white relative overflow-hidden",
        className
      )}
    >
      {/* Messages */}
      <div className="flex-1 relative overflow-hidden min-h-0 w-full">
        <ScrollArea ref={scrollAreaRef} className="h-full w-full">
          <div className="px-2 py-2 sm:px-4 sm:py-4 min-h-full w-full">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center w-full pb-4 sm:pb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-3 sm:mb-5">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white px-4">
                  Welcome to {title}
                </h3>
                <p className="text-gray-400 max-w-md text-xs sm:text-sm leading-relaxed mb-6 sm:mb-10 px-4">
                  {welcomeMessage}
                </p>

                {/* Chat Suggestions */}
                <div className="w-full max-w-4xl">
                  <h4 className="text-sm text-gray-300 font-medium mb-3 sm:mb-4 text-center px-4">
                    Try asking about one of these topics:
                  </h4>
                  <ChatSuggestions onSelectSuggestion={onSendMessage} />
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 w-full">
                {messages.map((message, index) => (
                  <div
                    key={message.id || `message-${index}`}
                    className="group relative w-full"
                  >
                    <ChatMessage
                      message={{
                        ...message,
                        id: message.id || `message-${index}`,
                      }}
                      isLoading={
                        isLoading &&
                        index === messages.length - 1 &&
                        message.type === "ai"
                      }
                    />
                  </div>
                ))}
                <div className="h-4 sm:h-6" /> {/* Bottom spacing */}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={scrollToBottom}
              className="rounded-full shadow-lg bg-gray-800 hover:bg-gray-700 text-white border-gray-700 text-xs sm:text-sm px-3 sm:px-4"
            >
              <span className="hidden sm:inline">↓ Scroll to bottom</span>
              <span className="sm:hidden">↓</span>
            </Button>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-gray-700 w-full">
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          onStopGeneration={onStopGeneration}
          placeholder={inputPlaceholder}
          chatId={chatId}
          autoFocus={autoFocusInput}
          disabled={disabled || isLoading}
        />
      </div>
    </div>
  );
}
