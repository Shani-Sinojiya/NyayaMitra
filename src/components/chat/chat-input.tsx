"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Square, ArrowUp } from "lucide-react";
import { FormEvent, useRef, useState, useEffect } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  onStopGeneration?: () => void;
  disabled?: boolean;
  placeholder?: string;
  chatId?: string;
  autoFocus?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  disabled = false,
  placeholder = "Type your message...",
  autoFocus = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea when content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");

      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div className="p-2 sm:p-4 w-full">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "text-white pl-3 pr-14 py-4 sm:pl-4 sm:pr-16 sm:py-6 rounded-2xl border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none",
              "bg-gray-800 min-h-[48px] sm:min-h-[56px] max-h-[120px] sm:max-h-[200px] w-full text-sm sm:text-base",
              "placeholder:text-gray-400 transition-all duration-200",
              "overflow-y-auto scrollbar-hide",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            )}
            rows={1}
          />
          <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex space-x-1 sm:space-x-2 text-gray-400">
            {isLoading ? (
              <Button
                type="button"
                onClick={onStopGeneration}
                className="rounded-full cursor-pointer bg-gray-700 hover:bg-gray-600 h-8 w-8 sm:h-10 sm:w-10 shrink-0"
                size="icon"
                variant="secondary"
              >
                <span className="sr-only">Stop</span>
                <Square className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!message.trim() || disabled}
                className={cn(
                  "rounded-full cursor-pointer h-8 w-8 sm:h-10 sm:w-10 shrink-0",
                  message.trim() && !disabled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-400 cursor-not-allowed"
                )}
                size="icon"
                variant="secondary"
              >
                <span className="sr-only">Send</span>
                {isLoading ? (
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            )}
          </div>
        </form>

        {/* Helper text */}
        <div className="flex items-center justify-center mt-1 sm:mt-2 text-xs text-gray-500 w-full">
          <span className="hidden sm:inline">
            NyayaMitra can make mistakes, so double-check it.
          </span>
          <span className="sm:hidden">
            NyayaMitra can make mistakes, so double-check.
          </span>
        </div>
      </div>
    </div>
  );
}
