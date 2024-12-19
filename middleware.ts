import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
// adjust the import path as needed

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const path = req.nextUrl.pathname;

  // Public routes that logged-in users should not access
  const publicRoutes = ['/login', '/signup', '/'];

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings'
  ];
// if(path == "/" &&  !session.userId)
// {

// }
  // If trying to access a public route while logged in, redirect to dashboard
  if (publicRoutes.includes(path) && session.userId && path !== "/") {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // If trying to access a protected route without being logged in, redirect to login
  if (
    protectedRoutes.some(route => path.startsWith(route)) && 
    !session.userId
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access to the route
  return NextResponse.next();
}

// Specify which routes this middleware should check
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*'
  ]
};

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from './lib/session';

// export async function middleware(req: NextRequest) {
//   const session = await getSession();
//   const path = req.nextUrl.pathname;

//   // Public routes that logged-in users should not access
//   const publicRoutes = ['/login', '/signup'];

//   // Protected routes that require authentication
//   const protectedRoutes = [
//     '/dashboard',
//     '/profile',
//     '/settings'
//   ];

//   // If trying to access a public route while logged in
//   if (publicRoutes.includes(path) && session.userId) {
//     // Try to get the original destination from the referrer or default to dashboard
//     const referrer = req.headers.get('referer');
//     const originalDestination = referrer 
//       ? new URL(referrer).pathname 
//       : '/';

//     // Redirect to the original destination or dashboard
//     return NextResponse.redirect(new URL(originalDestination, req.url));
//   }

//   // If trying to access a protected route without being logged in
//   if (
//     protectedRoutes.some(route => path.startsWith(route)) && 
//     !session.userId
//   ) {
//     // Store the original destination in a cookie for post-login redirect
//     const response = NextResponse.redirect(new URL('/login', req.url));
//     response.cookies.set('originPath', path, {
//       httpOnly: true,
//       sameSite: 'strict',
//       maxAge: 60 * 5 // 5 minutes
//     });
//     return response;
//   }

//   // Allow access to the route
//   return NextResponse.next();
// }

// // Specify which routes this middleware should check
// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/signup',
//     '/dashboard/:path*',
//     '/profile/:path*',
//     '/settings/:path*'
//   ]
// };