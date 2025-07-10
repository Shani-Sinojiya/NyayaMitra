import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // In a real application, you would fetch this from a database
    const res = await fetch(`${process.env.API_URL}/getchatbyid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: id }),
    });

    const chat = await res.json();

    // Make sure the response always has a messages array
    if (!chat || typeof chat !== "object") {
      return NextResponse.json({
        id,
        title: "Legal AI Assistant",
        messages: [],
      });
    }

    // Handle the case where the API returns chat array instead of messages array
    if (
      chat.chat &&
      Array.isArray(chat.chat) &&
      (!chat.messages || !Array.isArray(chat.messages))
    ) {
      chat.messages = chat.chat;
    }

    // Ensure messages is an array
    if (!chat.messages || !Array.isArray(chat.messages)) {
      chat.messages = [];
    }

    return NextResponse.json(chat);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { message } = await request.json();

    const res = await fetch(`${process.env.API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: session.user.id,
        sessionId: id,
        message,
      }),
    });

    const { output } = await res.json();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send the entire string at once for better reliability
        controller.enqueue(encoder.encode(output));
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
