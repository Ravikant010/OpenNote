import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { db } from '@/db/db';
import { notes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const user = url.searchParams.get('user');

    if (!user) {
      return NextResponse.json({ error: 'User parameter is required' }, { status: 400 });
    }

    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userNotes = await db
      .select()
      .from(notes)
      .orderBy(notes.createdAt);

    return NextResponse.json({ notes: userNotes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve notes' }, { status: 500 });
  }
}