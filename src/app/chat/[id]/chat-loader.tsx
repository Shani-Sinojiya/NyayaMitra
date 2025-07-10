import React from "react";
import { Loader2 } from "lucide-react";

const ChatLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
        <p className="text-gray-500 text-sm">Loading chat...</p>
      </div>
    </div>
  );
};

export default ChatLoader;
