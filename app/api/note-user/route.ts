import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const noteId = parseInt(url.searchParams.get('noteId') || '');

    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const [note] = await db.select().from(notes).where(eq(notes.id, noteId))
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, note.userId))
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ note, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve note and user' }, { status: 500 });
  }
}