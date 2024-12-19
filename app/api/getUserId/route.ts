import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ userId: session.userId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve user ID' }, { status: 500 });
  }
}