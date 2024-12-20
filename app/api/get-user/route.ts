import { NextResponse } from 'next/server';
import { get_user } from '@/services/actions/user-action';

export async function GET() {
  try {
    const user = await get_user();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}