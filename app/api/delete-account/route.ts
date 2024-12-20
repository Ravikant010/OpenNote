import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { notes, users, comments, likes } from '@/db/schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.userId;

    // Delete all comments associated with the user
    await db.delete(comments).where(eq(comments.userId, userId)).execute();

    // Delete all likes associated with the user
    await db.delete(likes).where(eq(likes.userId, userId)).execute();

    // Delete all notes associated with the user
    await db.delete(notes).where(eq(notes.userId, userId)).execute();

    // Delete the user account
    await db.delete(users).where(eq(users.id, userId)).execute();

    // Destroy the session
    await session.destroy();

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}