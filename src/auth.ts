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
      console.log('auth.ts jwt', token);
      console.log('auth.ts jwt user', user);
      return { ...user, ...token };
    },
    session({ session, token}) {
      console.log('auth.ts session', session, token);
      session.user = token as any;
      return session;
    }
  },
  events: {
    signOut(data) {
      console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
    },
    session(data) {
      console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
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
        // if (setCookie) {
        //   const parsed = cookie.parse(setCookie);
        //   cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
        // }
        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log('login resp json is ', user);
        return {
          email: credentials.email,
          ...user,
        }
      }
    }),
  ]
});