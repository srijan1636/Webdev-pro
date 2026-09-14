import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import SadhanaSession from "../../../models/SadhanaSession";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { userId, japaRounds, meditationMinutes } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    const newSession = await SadhanaSession.create({
      userId,
      japaRounds: japaRounds || 0,
      meditationMinutes: meditationMinutes || 0,
    });

    return NextResponse.json({ success: true, session: newSession });
  } catch (error) {
    console.error("Error saving session:", error);
    return NextResponse.json(
      { error: "Failed to save session" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    const sessions = await SadhanaSession.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 },
    );
  }
}
