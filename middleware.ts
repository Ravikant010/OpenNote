import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const path = req.nextUrl.pathname;

  // Auth pages that logged-in users shouldn't access
  const AUTH_PAGES = ['/login', '/signup'];
  
  // Protected routes that require authentication
  const PROTECTED_ROUTES = ['/note/create', '/profile', '/settings',];
  
  // Check if current path is an auth page
  const isAuthPage = AUTH_PAGES.includes(path);
  
  // Check if current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    path.startsWith(route) || path === route
  );

  // Redirect logged-in users trying to access auth pages
  if (isAuthPage && session?.userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirect non-logged-in users trying to access protected routes
  if (isProtectedRoute && !session?.userId) {
    console.log('Unauthorized access attempt to:', path);
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('from', path);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/note/create',
    '/profile/:path*',
    '/settings/:path*',
    '/dashboard/:path*',
  ]
};