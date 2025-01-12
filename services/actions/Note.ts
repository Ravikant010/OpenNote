// app/actions/getNotes.ts
"use server";

import { db } from "@/db/db"; // Import your database client
import { notes } from "@/db/schema"; // Import the notes table schema
import { eq } from "drizzle-orm"; // Import Drizzle ORM utilities
import { get_user } from "./User";

export const get_notes = async () => {
  try {
    // Fetch all notes for the given user
    // const user_id = await get_user()
    const allNotes = await db
      .select()
      .from(notes)
    return allNotes;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes.");
  }
};