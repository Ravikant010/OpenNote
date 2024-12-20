import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const user = url.searchParams.get('user');
    const noteId = parseInt(url.searchParams.get('noteId') || '');

    if (!user || isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid user or note ID' }, { status: 400 });
    }

    const [note] = await db.select().from(notes).where(eq(notes.id, noteId))

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch note details' }, { status: 500 });
  }
}