import type { NextRequest } from 'next/server'
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log('middleware session', session);
  const currentUser = session?.user;
  console.log('middleware currentUser', currentUser);

  // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return Response.redirect(new URL('/dashboard', request.url))
  // }
  //
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/login', request.url))
  // }
}

export const config = {
  matcher: ['/dashboard', '/login'],
}