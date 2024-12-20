import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const path = req.nextUrl.pathname;

  // Public routes that logged-in users should not access
  const publicRoutes = ['/login', '/signup'];

  // Protected routes that require authentication
  const protectedRoutes = [
    '/note/create',
    '/profile',
    '/settings'
  ];

  // Public API routes that do not require authentication
  const publicApiRoutes = ['/api/all-notes', '/api/note-user', "/api/note"];

  // Public routes that do not require authentication
  const publicNoteRoutes = new RegExp('^/[^/]+/note/[^/]+$');

  // If trying to access a public route while logged in, redirect to profile
  if (publicRoutes.includes(path) && session?.userId) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // If trying to access a protected route without being logged in, redirect to login
  if (
    protectedRoutes.some(route => path.startsWith(route)) && 
    !session?.userId
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If trying to access a protected API route without being logged in, return unauthorized
  if (
    path.startsWith('/api') &&
    !publicApiRoutes.includes(path) &&
    !session?.userId
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Allow access to public note routes
  if (publicNoteRoutes.test(path)) {
    return NextResponse.next();
  }

  // Allow access to the route
  return NextResponse.next();
}

// Specify which routes this middleware should check
export const config = {
  matcher: [
    '/',
    '/note/create',
    '/login',
    '/signup',
    '/profile/:path*',
    '/settings/:path*',
    '/api/:path*',
    '/:username/note/:noteId'
  ]
};