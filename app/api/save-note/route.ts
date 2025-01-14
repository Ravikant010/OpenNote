import { getSession } from '@/lib/session';
import { create_note } from '@/services/actions/saveNote';
import { z } from 'zod';
import { get_user } from '@/services/actions/user-action';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const noteData = await req.json();
    noteData.createdAt = new Date(noteData.createdAt);
    noteData.updatedAt = new Date(noteData.updatedAt);
    console.log(noteData)
    const newNote = await create_note(noteData);
    const user = await get_user();
    console.log(user)
  return new Response(JSON.stringify({ success: true, data: {...newNote, ...user} }))
  //  return NextResponse.redirect(`/${user?.username}/notes`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
  }
}