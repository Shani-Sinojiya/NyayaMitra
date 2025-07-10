"use client";

import { Mic, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useConversation } from "@elevenlabs/react";
import { Button } from "@/components/ui/button";

const VoiceUI = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch("/api/voice");
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const conversation = useConversation({
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await getSignedUrl();
      // Start the conversation with your agent
      await conversation.startSession({
        signedUrl,
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Rotating Orb */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 bg-[conic-gradient(at_top_left,_#00f,_#0ff,_#00f)]"
          style={{ animation: "spin 20s linear infinite" }}
        />

        {/* Call Button in Center */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center gap-2 bg-black/70 px-5 py-2 rounded-full backdrop-blur">
            {conversation.status === "connected" && (
              <>
                <Mic className="w-4 h-4" />
                <span className="font-medium text-white">
                  Call AI agent is{" "}
                  {conversation.isSpeaking ? "speaking" : "listening"}
                </span>
              </>
            )}

            {conversation.status === "connecting" && (
              <span className="font-medium text-white">
                Connecting to AI agent...
              </span>
            )}

            {conversation.status === "disconnecting" && (
              <span className="font-medium text-red-500">
                Disconnecting from AI agent...
              </span>
            )}

            {conversation.status === "disconnected" && (
              <span className="font-medium text-red-500">
                Disconnected from AI agent
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-6 flex items-center gap-6">
        <Button
          className="rounded-full size-14 cursor-pointer"
          variant={"secondary"}
          onClick={() => {
            if (conversation.status === "connected") {
              stopConversation();
            } else {
              startConversation();
            }
          }}
        >
          <Mic className="!w-6 !h-6" />
        </Button>

        <Button
          variant={"destructive"}
          className="rounded-full size-14 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <X className="!w-6 !h-6" />
        </Button>
      </div>
    </div>
  );
};

export default VoiceUI;
