import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes } from '@/db/schema';

export async function GET(req: Request) {
  try {
    const allNotes = await db.select().from(notes).orderBy(notes.createdAt);

    return NextResponse.json({ notes: allNotes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve all notes' }, { status: 500 });
  }
}