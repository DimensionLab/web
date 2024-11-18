import { ensureUserProfile } from '@/lib/auth/profile';
import { handleAuth, handleCallback, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

console.log('the AUTH0_SECRET env var is set: ', !!process.env.AUTH0_SECRET);

export const GET = handleAuth(
  {
    login: handleLogin({
      returnTo: "/",
    }),
    signup: handleLogin({
      authorizationParams: {
        screen_hint: "signup",
      },
      returnTo: "/",
    }),
    logout: handleLogout({
      returnTo: "/",
    }),
    callback: handleCallback({
      async afterCallback(req: any, session: any) {
        // Create profile after successful authentication
        if (session?.user) {
          await ensureUserProfile(session.user)
        }
        return session
      },
    }),
  }
);