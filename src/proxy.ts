import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (c) =>
      c.name === 'better-auth.session_token' ||
      c.name === '__Secure-better-auth.session_token' ||
      c.name.endsWith('.session_token') ||
      c.name.includes('session_token') ||
      c.name.includes('session_data')
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname === '/' || pathname === '/signin' || pathname === '/signup';

  if (isPublic || hasSessionCookie(request)) {
    return NextResponse.next();
  }

  const signInUrl = new URL('/signin', request.url);
  signInUrl.searchParams.set('callbackUrl', pathname);
  signInUrl.searchParams.set('reason', 'protected');
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ['/product/:path*', '/profile', '/profile/:path*', '/category/:path*'],
};
