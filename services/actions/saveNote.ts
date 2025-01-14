"use server"

import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { get_user } from "./user-action";

export async function create_note(note: {
  title: string;
  content: string;
  isPublic: boolean;
  tags: string[] | null;
}) {
  const user = await get_user();
  if (!user) throw new Error("User not found");

  const [savedNote] = await db
    .insert(notes)
    .values({
      ...note,
      userId: user.id,
    })
    .returning();

  return { success: true, data: savedNote };
}

// If you need saveNote functionality, add it here:
export async function saveNote(note: {
  title: string;
  content: string;
  isPublic: boolean;
  tags: string[] | null;
}) {
  return create_note(note);
}