import React, { Fragment } from "react";
import Header from "../../header";
import ChatLoader from "./chat-loader";
import { ChatPage, Message } from "@/components/chat";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // This page should always be dynamic
export const revalidate = 0; // Disable static generation for this page
export const fetchCache = "force-no-store"; // Disable caching for this page

type ChatData = {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    content: string;
    role: "user" | "assistant" | "system";
    timestamp: string; // ISO date string from API
  }>;
  createdAt: string;
  updatedAt: string;
};

async function getChatById(id: string): Promise<ChatData | null> {
  try {
    // In a production environment, you would use your API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/chat/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch chat: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const chatId = (await params).id;

  // If the ID is "new", we render an empty chat
  if (chatId === "new") {
    return (
      <Fragment>
        <Header title="New Chat" />
        <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
          <ChatPage
            title="Legal AI Assistant"
            welcomeMessage="I can help with legal questions, draft documents, explain legal concepts, and more. Try one of the suggestions below or ask your own question."
          />
        </div>
      </Fragment>
    );
  }

  // Fetch chat data
  const chatData = await getChatById(chatId);

  // If chat not found, return 404
  if (!chatData) {
    notFound();
  }

  // Convert ISO date strings to Date objects for proper timestamp handling
  const formattedMessages: Message[] = chatData.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));

  return (
    <Fragment>
      <Header title={chatData.title || "Legal AI Assistant"} />
      <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
        <ChatPage
          initialMessages={formattedMessages}
          title={chatData.title}
          welcomeMessage="How can I help with your legal questions today?"
        />
      </div>
    </Fragment>
  );
};

export default Page;
