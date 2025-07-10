import React from "react";
import Header from "../../../header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header title="Chat Not Found" />
      <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">
            Chat Not Found
          </h2>
          <p className="text-gray-400 mb-6">
            The chat you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <Button asChild>
            <Link href="/chat/new">Start a New Chat</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
