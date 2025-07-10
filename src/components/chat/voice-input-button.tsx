"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

interface VoiceInputButtonProps {
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function VoiceInputButton({
  disabled = false,
  size = "md",
}: VoiceInputButtonProps) {
  const [mounted, setMounted] = useState(false);

  // Only run client-side code after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-8 w-8 sm:h-10 sm:w-10",
    lg: "h-10 w-10 sm:h-12 sm:w-12",
  };

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-3 w-3 sm:h-4 sm:w-4",
    lg: "h-4 w-4 sm:h-5 sm:w-5",
  };

  // Simple placeholder button without actual voice functionality
  return (
    <Button
      type="button"
      disabled={disabled}
      className={cn(
        "rounded-full cursor-pointer transition-all duration-300 shrink-0",
        sizeClasses[size],
        "hover:bg-gray-700 text-gray-400 hover:text-gray-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      size="icon"
      variant="ghost"
      title="Voice input (Not implemented)"
    >
      <span className="sr-only">Voice input</span>
      <Mic className={iconSizeClasses[size]} />
    </Button>
  );
}

/* Voice visualization component with dynamic bars */
interface VoiceVisualizationProps {
  isListening: boolean;
  className?: string;
  interimTranscript?: string;
}

export function VoiceVisualization({
  isListening,
  className,
  error,
  interimTranscript,
}: VoiceVisualizationProps & {
  error?: string | null;
}) {
  // Use useRef for state that shouldn't cause hydration warnings
  const [levels, setLevels] = useState<number[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "good" | "weak" | "error"
  >("good");
  const [isStopping, setIsStopping] = useState(false);

  // Initialize on client-side only
  useEffect(() => {
    if (!initialized) {
      setLevels([0.3, 0.5, 0.7, 0.5, 0.3]);
      setInitialized(true);
    }
  }, [initialized]);

  // Handle transition from listening to not listening with an animation
  useEffect(() => {
    if (initialized && !isListening && levels.some((l) => l > 0.1)) {
      // When stopping, animate bars down
      setIsStopping(true);

      // Gradually reduce the levels to create fade out effect
      const fadeOutInterval = setInterval(() => {
        setLevels((prev) => {
          const newLevels = prev.map((l) => Math.max(l - 0.1, 0.1));
          // Check if we've completed the fade out
          if (newLevels.every((l) => l <= 0.1)) {
            clearInterval(fadeOutInterval);
            setIsStopping(false);
          }
          return newLevels;
        });
      }, 50);

      return () => clearInterval(fadeOutInterval);
    }
  }, [isListening, initialized, levels]);

  // Check if there's a network-related error - client-side only
  useEffect(() => {
    if (
      error &&
      (error.includes("network") ||
        error.includes("offline") ||
        error.includes("connection"))
    ) {
      setConnectionStatus("error");
    } else if (error) {
      setConnectionStatus("weak");
    } else {
      setConnectionStatus("good");
    }
  }, [error]);

  // Simulate voice level changes - client-side only
  useEffect(() => {
    if ((!isListening && !isStopping) || !initialized) {
      return;
    }

    const interval = setInterval(() => {
      if (connectionStatus === "error") {
        // Flatline for connection error
        setLevels([0.1, 0.1, 0.1, 0.1, 0.1]);
      } else if (connectionStatus === "weak") {
        // Low levels for weak connection
        setLevels((prev) => prev.map(() => 0.1 + Math.random() * 0.3));
      } else {
        // Normal levels for good connection
        setLevels((prev) => prev.map(() => 0.3 + Math.random() * 0.7));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isListening, isStopping, connectionStatus, initialized]);

  // Don't render anything during server-side rendering or if not active
  if (!initialized || (!isListening && !isStopping)) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-1",
        "h-5 py-1",
        className
      )}
    >
      {levels.map((level, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-150",
            connectionStatus === "good" &&
              "bg-gradient-to-t from-red-600 to-red-400",
            connectionStatus === "weak" &&
              "bg-gradient-to-t from-orange-600 to-orange-400",
            connectionStatus === "error" &&
              "bg-gradient-to-t from-gray-600 to-gray-400"
          )}
          style={{
            height: `${Math.max(level * 100, 15)}%`,
            opacity: Math.min(level + 0.3, 1),
          }}
        />
      ))}
    </div>
  );
}
