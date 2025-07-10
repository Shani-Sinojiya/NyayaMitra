"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Copy, User, Check } from "lucide-react";
import { LegalMarkdownRenderer } from "@/components/ui/legal-markdown-renderer";
import { useState, useCallback, useMemo } from "react";
import Logo from "../logo";
import { useSession } from "next-auth/react";

interface ChatMessageProps {
  message: {
    id: string;
    message: string;
    type: "user" | "ai" | "system";
    timestamp?: Date | string;
  };
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isUser = message.type === "user";
  const isAssistant = message.type === "ai";
  const [copied, setCopied] = useState(false);
  const session = useSession();

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  // Memoize the formatted message to prevent infinite re-renders
  const formattedMessage = useMemo(() => {
    if (isUser) {
      return message.message;
    }

    // Use our professional legal markdown renderer for AI responses
    return (
      <LegalMarkdownRenderer
        content={message.message}
        variant="compact"
        className="text-gray-100 [&_h1]:text-gray-100 [&_h2]:text-gray-100 [&_h3]:text-gray-100 [&_h4]:text-gray-100 [&_h5]:text-gray-100 [&_h6]:text-gray-100 [&_p]:text-gray-100 [&_li]:text-gray-100 [&_td]:text-gray-100 [&_th]:text-gray-100"
      />
    );
  }, [message.message, isUser]);

  return (
    <div
      className={cn(
        "group relative flex items-start space-x-2 sm:space-x-3 px-1 sm:px-4 py-3 sm:py-6 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 mt-1">
          <AvatarFallback className="bg-white">
            <Logo className="h-3 w-3 sm:h-4 sm:w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col space-y-1 sm:space-y-2 min-w-0 flex-1",
          isUser
            ? "items-end max-w-[90%] sm:max-w-[85%] md:max-w-[75%]"
            : "items-start max-w-[90%] sm:max-w-[85%] md:max-w-[75%]"
        )}
      >
        {/* Role Label */}
        <div className="text-xs text-gray-400 font-medium px-1">
          {isUser ? "You" : "NyayaMitra AI Assistant"}
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg min-w-0 w-full overflow-hidden",
            isUser
              ? "bg-blue-600 text-white ml-auto rounded-br-md"
              : "bg-primary/10 mr-auto rounded-bl-md border border-primary/20"
          )}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words text-sm sm:text-sm leading-relaxed w-full overflow-hidden">
              {formattedMessage}
            </div>
          ) : (
            <div className="prose prose-sm max-w-none prose-invert prose-headings:text-gray-100 prose-p:text-gray-100 prose-strong:text-gray-100 prose-code:text-gray-100 prose-pre:bg-gray-800 [&>*]:text-sm sm:[&>*]:text-sm [&>p]:mb-1 sm:[&>p]:mb-2 [&>h1]:text-base sm:[&>h1]:text-lg [&>h2]:text-sm sm:[&>h2]:text-base [&>h3]:text-sm [&>code]:text-xs sm:[&>code]:text-sm w-full overflow-hidden">
              {formattedMessage}
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && isAssistant && (
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          className={cn(
            "flex items-center space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity px-1",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          {/* Copy button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(message.message)}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-800 cursor-pointer"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>

          {/* Timestamp */}
          {message.timestamp && (
            <div className="text-xs text-gray-500 hidden sm:block">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Avatar for user */}
      {isUser && (
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 mt-1">
          {session?.data?.user?.image ? (
            <AvatarImage src={session.data.user.image} />
          ) : null}
          <AvatarFallback className="bg-blue-600 text-white">
            {session.data?.user?.name
              ? session.data.user.name.charAt(0).toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
