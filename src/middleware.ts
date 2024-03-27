import {NextRequest, NextResponse} from 'next/server'
import { auth } from "./auth";
import {func} from "prop-types";
import {signOut} from "next-auth/react";

export async function middleware(request: NextRequest) {
  const session = await auth();
  //console.log('middleware session', session);
  if(session && accessTokenCheck(session.backendJwt.accessToken, 60)){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/reissue`, {
      method: "POST",
    });
    if(!res.ok) {
      await signOut({callbackUrl: '/login'});
      return;
    }
    const accessToken = await res.text();
    const response =  NextResponse.next();
    response.cookies.set('access_token', accessToken, {
      path: '/' ,
      maxAge: 60 * 60 * 24, // 24시간
      httpOnly: true,
    });
    return response;

  }

  //matcher에서 로그인 되어있을때, 로그인페이지로 접근하려고 하면 대시보드로 리다이렉트
  if (session && isLoginPath(request)) {
    console.log('로그인페이지로 접근하려고 하면 대시보드로 리다이렉트')
    return Response.redirect(new URL('/dashboard', request.url))
  }

  //matcher에서 로그인 안되었을때, 로그인화면이 아닌 다른 페이지로 접근하려고 하면 로그인페이지로 리다이렉트
  if (!session && !isLoginPath(request)) {
    console.log('로그인화면이 아닌 다른 페이지로 접근하려고 하면 로그인페이지로 리다이렉트')
    return Response.redirect(new URL('/login', request.url))
  }

}
function isLoginPath(request: NextRequest) {
  return request.nextUrl.pathname.startsWith('/login')
}

function accessTokenCheck(accessToken: string, minute: number) {
  //accessToken 유효기간 확인
  const payload = JSON.parse(atob(accessToken.split('.')[1]));
  const exp = payload.exp * 1000;
  const now = Date.now();
  return exp - now < minute * 60 * 1000;

}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}