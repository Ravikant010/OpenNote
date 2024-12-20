"use server";

import { z } from "zod";
import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Define the schema for the note ID
const noteIdSchema = z.number();

export const deleteNote = async (noteId: number) => {
  try {
    // Validate the note ID
    const validatedNoteId = noteIdSchema.parse(noteId);

    // Get current user session
    const session = await getSession();
    if (!session?.userId) {
      throw new Error("Unauthorized");
    }

    // Check if the note exists and belongs to the user
    const [note] = await db.select().from(notes).where(eq(notes.id, validatedNoteId));
    if (!note || note.userId !== session.userId) {
      throw new Error("Note not found or unauthorized");
    }

    // Delete the note
    await db.delete(notes).where(eq(notes.id, validatedNoteId));
    // await revalidatePath(`/peterparkerahere/notes`);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: (error as Error).message || "Failed to delete note" };
  }
};