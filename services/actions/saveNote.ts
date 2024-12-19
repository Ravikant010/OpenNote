"use server"
import { z } from "zod";
import { db } from "@/db/db";
import { notes } from "@/db/schema";
import { Note, noteSchema } from "@/lib/schema/note";

export const saveNote = async (note: Note, userId: number) => {
  const validatedNote = noteSchema.parse(note);
  const [newNote] = await db.insert(notes).values({ ...validatedNote, userId }).returning();
  return newNote;
};