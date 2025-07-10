import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract message and chatId from request body
    const body = await request.json();
    const { message, chatid } = body;

    // Generate a new session ID if one wasn't provided
    const sessionId = chatid || uuidv7();

    const res = await fetch(`${process.env.API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: session.user.id,
        sessionId,
        message,
      }),
    });

    const data = await res.json();

    // Validate the response
    if (!data || !data.output) {
      return NextResponse.json(
        { error: "Invalid response from API" },
        { status: 500 }
      );
    }

    const { output } = data;

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
