"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Copy, User, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useCallback, useMemo } from "react";

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
  const [codeCopied, setCodeCopied] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = useCallback(
    async (
      text: string,
      type: "message" | "code" = "message",
      codeId?: string
    ) => {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "message") {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else if (type === "code" && codeId) {
          setCodeCopied((prev) => ({ ...prev, [codeId]: true }));
          setTimeout(() => {
            setCodeCopied((prev) => ({ ...prev, [codeId]: false }));
          }, 2000);
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
    []
  );

  // Memoize the formatted message to prevent infinite re-renders
  const formattedMessage = useMemo(() => {
    if (isUser) {
      return message.message;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

            return !isInline && match ? (
              <div className="relative my-2 sm:my-4 w-full max-w-full overflow-hidden rounded-lg bg-gray-800 border border-gray-700">
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(String(children), "code", codeId)
                    }
                    className="h-6 w-6 p-0 opacity-70 hover:opacity-100 cursor-pointer bg-gray-700/50 hover:bg-gray-600"
                  >
                    {codeCopied[codeId] ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-gray-300" />
                    )}
                  </Button>
                </div>
                <div className="overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <SyntaxHighlighter
                    // @ts-expect-error - oneDark style type compatibility
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      paddingTop: "2.5rem",
                      borderRadius: "0",
                      fontSize: "0.75rem",
                      lineHeight: "1.4",
                      background: "transparent",
                      minWidth: "100%",
                      width: "max-content",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    }}
                    showLineNumbers={false}
                    wrapLines={false}
                    {...rest}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code
                className={cn(
                  "relative rounded-md bg-gray-700 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-gray-200 break-words max-w-full inline-block",
                  className
                )}
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <div className="relative my-2 sm:my-4 w-full max-w-full overflow-hidden rounded-lg bg-gray-800 border border-gray-700">
                <div className="overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <pre className="p-3 sm:p-4 text-xs sm:text-sm text-gray-200 font-mono whitespace-pre min-w-full w-max">
                    {children}
                  </pre>
                </div>
              </div>
            );
          },
          p: ({ children }) => (
            <p className="text-xs sm:text-sm leading-relaxed mb-1 sm:mb-2 last:mb-0 text-gray-200 break-words">
              {children}
            </p>
          ),
        }}
      >
        {message.message}
      </ReactMarkdown>
    );
  }, [message.message, copyToClipboard, codeCopied, isUser]);

  return (
    <div
      className={cn(
        "group relative flex items-start space-x-2 sm:space-x-3 px-1 sm:px-4 py-3 sm:py-6 w-full bg-gray-900",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 mt-1">
          <AvatarFallback className="bg-blue-600 text-white">
            <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
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
          {isUser ? "You" : "AI Assistant"}
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg min-w-0 w-full overflow-hidden",
            isUser
              ? "bg-blue-600 text-white ml-auto rounded-br-md"
              : "bg-gray-800 text-gray-100 mr-auto rounded-bl-md border border-gray-700"
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
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
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
            onClick={() => copyToClipboard(message.message, "message")}
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
          <AvatarFallback className="bg-blue-600 text-white">
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
