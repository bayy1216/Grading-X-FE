import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'


export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    jwt({ token,user}) {
      // console.log('auth.ts jwt', token);
      // console.log('auth.ts jwt user', user);
      return { ...user, ...token };// 로그인에서 user에 넣은 정보를 FE JWT에 넣어준다.
    },
    session({ session, token}) {
      // console.log('auth.ts session callback', session, token);
      session.backendJwt = {
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string
      }// jwt 콜백에서 넣었던 BE jwt를 FE 세션에 넣어준다.
      return session;
    }
  },
  events: {
    signOut(data) {
      // console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
      console.log('auth.ts events signout');
    },
    session(data) {
      // console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
      console.log('auth.ts events session');
    }
  },
  providers: [
    CredentialsProvider({
      credentials : {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.BE_BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
        let setCookie = authResponse.headers.get('Set-Cookie');
        console.log('set-cookie', setCookie);
        if (setCookie) {
          // const parsed = cookie.parse(setCookie);
          //cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse.ok) {
          return null
        }

        const backendJwt = await authResponse.json()
        // path: '/'로 설정하면 해당 쿠키는 사이트 내의 모든 페이지에서 유효하게 됩니다.
        cookies().set('be-access-token', backendJwt.accessToken, {
          path: '/' ,
          maxAge: 60 * 60 * 24, // 24시간
          httpOnly: true,
        });
        // httpOnly 플래그를 사용하여 쿠키를 HTTP 요청에만 전송되도록 할 수 있습니다.
        // 이렇게하면 JavaScript에서는 쿠키에 액세스할 수 없으므로 보안이 강화됩니다
        cookies().set('be-refresh-token', backendJwt.refreshToken, {
          path: '/api/auth/reissue' ,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 14 // 14일
        });
        console.log('login resp json is ', backendJwt);
        return {
          email: credentials.email,
          ...backendJwt,
        }
      }
    }),
  ]
});