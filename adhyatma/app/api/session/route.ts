import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "../../../lib/mongodb";
import SadhanaSession from "../../../models/SadhanaSession";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in" },
        { status: 401 },
      );
    }

    const userId = (session.user as any).id;

    await connectToDatabase();

    const body = await request.json();
    const { japaRounds, meditationMinutes } = body;

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
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in" },
        { status: 401 },
      );
    }

    const userId = (session.user as any).id;

    await connectToDatabase();

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
