// app/api/notes/route.ts
import { NextResponse } from "next/server";


import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    // Get current user session
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all notes for the current user
    const userNotes = await db.select().from(notes).where(eq(notes.userId, session.userId));

    return NextResponse.json({ success: true, data: userNotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch all notes" }, { status: 500 });
  }
}