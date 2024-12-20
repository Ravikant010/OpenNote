import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes } from '@/db/schema';
import { getSession } from '@/lib/session';
import { and, eq } from 'drizzle-orm';

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.userId;
    const url = new URL(req.url);
    const noteId = url.searchParams.get('noteId');

    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    // Delete the specific note associated with the user
    const result = await db.delete(notes).where(and(eq(notes.id, parseInt(noteId)), eq(notes.userId, userId))).execute();

    if (result.count === 0) {
      return NextResponse.json({ error: 'Note not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}