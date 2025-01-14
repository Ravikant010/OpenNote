"use server"
import { noteSchema, Note } from "@/lib/schema/note";
import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";

export async function createNote(input: Note) {
  try {
    // Validate input
    const validated = noteSchema.parse(input);

    // Get current user session
    const session = await getSession();
    if (!session?.userId) {
      throw new Error("Unauthorized");
    }

    // Insert note
    const [newNote] = await db.insert(notes).values({
      ...validated,
      userId: session.userId,
      tags: validated.tags ? JSON.stringify(validated.tags) : null,
    }).returning();

    return { success: true, data: newNote };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to create note" };
  }
}

export async function getNotes() {
  try {
    // Get current user session
    const session = await getSession();
    if (!session?.userId) {
      throw new Error("Unauthorized");
    }

    // Fetch notes
    const userNotes = await db.select().from(notes).where(eq(notes.id, session.userId));

    return { success: true, data: userNotes };
  } catch (error) {
    return { success: false, error: "Failed to fetch notes" };
  }
}

export async function getAllNotes() {
  try {
    // Get current user session
    const session = await getSession();
    if (!session?.userId) {
      throw new Error("Unauthorized");
    }

    // Fetch all notes for the current user
    const userNotes = await db.select().from(notes).where(eq(notes.userId, session.userId));

    return { success: true, data: userNotes };
  } catch (error) {
    return { success: false, error: "Failed to fetch all notes" };
  }
}