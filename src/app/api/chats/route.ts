import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure this route is always dynamic
export const revalidate = 0; // Disable static generation for this route
export const fetchCache = "force-no-store"; // Disable caching for this route

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("Fetching chat list for user:", session.user);

    const res = await fetch(`${process.env.API_URL}/chatlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: session.user.id }),
    });

    const data = await res.json();

    // Check if the data object is empty
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No chats found" }, { status: 404 });
    }

    return NextResponse.json([...data]);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
