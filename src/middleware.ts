import authConfig from '@/auth.config';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const res = NextResponse;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return res.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return res.redirect(new URL('/auth/login', nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
/**
 *  The below matcher is for invoking the above auth(middleware) function whenever a route satisfies the below configuration and not PRIVATE/PUBLIC routes
 */

export const config = {
  //from Clerk middleware documentation
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)',
  ], // Run middleware on API routes
};
