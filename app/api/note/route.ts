import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { get_user } from '@/services/actions/user-action';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    console.log(url, "url")
    const noteId = parseInt(url.searchParams.get('noteId') || '');
    const user_in_db = await get_user();

    if (!user_in_db) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const [note] = await db.select().from(notes).where(eq(notes.id, noteId));

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Verify note ownership
    if (note.userId !== user_in_db.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json({ error: 'Failed to fetch note details' }, { status: 500 });
  }
}