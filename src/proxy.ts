import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const allCookies = request.cookies.getAll();
  const sessionCookie = allCookies.find(
    (c) =>
      c.name === 'better-auth.session_token' ||
      c.name === '__Secure-better-auth.session_token' ||
      c.name.endsWith('.session_token') ||
      c.name.includes('session_token') ||
      c.name.includes('session_data')
  );

  if (!sessionCookie || !sessionCookie.value) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/profile/:path*'],
};
