import 'iron-session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// Extend the default types to match your user structure
declare module 'iron-session' {
  interface IronSessionData {
    userId?: number;
    email?: string;
    username?: string;
  }
}

// Ensure the secret is at least 32 characters long
export const sessionOptions = {
  password: process.env.SESSION_SECRET || generateFallbackSecret(),
  cookieName: 'open-note-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  }
};

// Generate a fallback secret (only for development)
function generateFallbackSecret() {
  console.warn(
    '⚠️ NO SESSION SECRET FOUND. GENERATING A TEMPORARY SECRET. ' +
    'PLEASE SET SESSION_SECRET IN YOUR .env FILE!'
  );
  return 'fallback-secret-that-is-definitely-32-chars-long-x';
}

// Helper to get the session
export async function getSession() {
  const session = await getIronSession<import("iron-session").IronSessionData>(await cookies(), sessionOptions);
  return session;
}

// Helper to check if user is logged in
export async function isLoggedIn() {
  const session = await getSession();
  return !!session.userId;
}