"use server"
import { db } from '@/db/db';
import { notes } from '@/db/schema';
import { noteSchema } from '@/models';// Assuming you have a validation schema for notes
import { get_user_id } from './User';
/**
 * Creates a new note for the authenticated user.
 * @param {object} note - The note data to be validated and inserted.
 * @returns {Promise<object | null>} The newly created note or null if an error occurs.
 */
export async function create_note(note: unknown) {
  try {
    // Fetch the authenticated user's ID
    let userId = await get_user_id();

    // Check if the user is authenticated
    if (!userId) {
      console.warn("Unauthorized: User ID not found.");
      return null;
    }
    userId = Number(userId)
    // Validate the note data using the schema
    const validatedNote = noteSchema.parse(note);

    // Insert the note into the database
    const [newNote] = await db.insert(notes).values({ ...validatedNote, userId }).returning();

    // Return the newly created note
    return newNote;
  } catch (error) {
    // Log the error and return null
    console.error("Error creating note:", error);
    return null;
  }
}