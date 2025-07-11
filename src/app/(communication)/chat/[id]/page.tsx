import React, { Fragment, Suspense } from "react";
import Header from "../../../header";
import { notFound, redirect } from "next/navigation";
import ClientWrapper from "./client-wrapper";
import ChatLoader from "./chat-loader";
import { auth } from "@/auth";

// These Next.js config options ensure the page is always fetched fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Define the Message type
type Message = {
  id: string;
  message: string;
  type: "user" | "ai" | "system";
  timestamp: Date;
};

type ChatData = {
  id: string;
  title: string;
  messages: Array<{
    message: string;
    type: "human" | "ai" | "system";
  }>;
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

    let data;
    try {
      data = await response.json();
    } catch {
      return {
        id,
        title: "Legal AI Assistant",
        messages: [],
      };
    } // Validate the structure of the returned data
    if (!data || typeof data !== "object") {
      return {
        id,
        title: "Legal AI Assistant",
        messages: [],
      };
    }

    // Handle case where API returns chat array instead of messages array
    if (
      data.chat &&
      Array.isArray(data.chat) &&
      (!data.messages || !Array.isArray(data.messages))
    ) {
      data.messages = data.chat;
    }

    // Ensure messages is an array
    if (!data.messages || !Array.isArray(data.messages)) {
      data.messages = [];
    }

    // Make sure id and title exist
    if (!data.id) data.id = id;
    if (!data.title) data.title = "Legal AI Assistant";

    return data;
  } catch {
    // Return a default structured object instead of throwing
    return {
      id,
      title: "Legal AI Assistant",
      messages: [],
    };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = (await params).id;

  // If the ID is "new", we render an empty chat
  if (chatId === "new") {
    return {
      title: "New Chat | Legal AI Assistant",
      description:
        "Start a new chat with our AI assistant to get answers to your questions, brainstorm ideas, or just have a conversation.",
    };
  }

  // Fetch chat data for metadata
  let chatData: ChatData = {
    id: chatId,
    title: "Legal AI Assistant",
    messages: [],
  };

  try {
    const fetchedData = await getChatById(chatId);
    if (fetchedData) {
      chatData = fetchedData;
    }
  } catch {
    // Use default values if fetching fails
  }

  return {
    title: chatData.title || "Legal AI Assistant",
    description:
      "Continue your conversation with our AI assistant. Ask questions, get legal advice, and more.",
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const chatId = (await params).id;

  if (!session || !session.user) {
    if (chatId == "new") {
      return redirect("/login?callbackUrl=/chat/new");
    }
    return redirect(`/login`);
  }

  // If the ID is "new", we render an empty chat
  if (chatId === "new") {
    return (
      <Fragment>
        <Header title="New Chat" />
        <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
          <Suspense
            fallback={
              <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
                <ChatLoader />
              </div>
            }
          >
            <ClientWrapper
              title="Legal AI Assistant"
              welcomeMessage="I can help with legal questions, draft documents, explain legal concepts, and more. Try one of the suggestions below or ask your own question."
              apiEndpoint={`/api/chat`}
            />
          </Suspense>
        </div>
      </Fragment>
    );
  }

  // Fetch chat data
  let chatData: ChatData = {
    id: chatId,
    title: "Legal AI Assistant",
    messages: [],
  };

  try {
    const fetchedData = await getChatById(chatId);

    if (!fetchedData) {
      return notFound();
    }

    chatData = fetchedData;

    // Double-check if messages array exists and is valid
    if (!chatData.messages || !Array.isArray(chatData.messages)) {
      // Provide empty messages array as fallback
      chatData.messages = [];
    }
  } catch {
    // Already initialized with defaults above
  }

  // Ensure messages is an array
  const messagesArray = Array.isArray(chatData.messages)
    ? chatData.messages
    : [];

  // Convert messages to the format expected by ChatPage
  const formattedMessages: Message[] = messagesArray.map((msg: unknown) => {
    const messageObj = msg as Record<string, unknown>;
    return {
      id:
        (messageObj?.id as string) ||
        `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      message:
        (messageObj?.message as string) ||
        (messageObj?.content as string) ||
        "",
      type: ((messageObj?.type as string) === "human" ||
      (messageObj?.role as string) === "user"
        ? "user"
        : (messageObj?.type as string) === "ai" ||
          (messageObj?.role as string) === "assistant"
        ? "ai"
        : "system") as "user" | "ai" | "system",
      timestamp: messageObj?.timestamp
        ? new Date(messageObj.timestamp as string)
        : new Date(),
    };
  });

  return (
    <Fragment>
      <Header title={chatData.title || "Legal AI Assistant"} />
      <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
        <Suspense fallback={<div className="p-4">Loading chat...</div>}>
          <ClientWrapper
            initialMessages={formattedMessages}
            title={chatData.title || "Legal AI Assistant"}
            welcomeMessage="How can I help with your legal questions today?"
            apiEndpoint="/api/chat"
            chatId={chatId}
          />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Page;
