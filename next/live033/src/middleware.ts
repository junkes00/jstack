import { NextRequest, NextResponse } from 'next/server';

const isSignedIn = true;

export function middleware(request: NextRequest) {
  console.log('Executou');

  if (request.nextUrl.pathname === '/contacts/create' && !isSignedIn) {
    console.log('Redirecionou')
    return NextResponse.redirect(new URL('/', request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: '/contacts/create'
}
