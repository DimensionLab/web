import { ensureUserProfile } from '@/lib/auth/profile';
import { handleAuth, handleCallback, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import jwt from 'jsonwebtoken'

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
        try {
          const payload = {
            userId: session.user.sub,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          }
          session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET!)
        
          if (session?.user) {
            console.log('session.user', session.user)
            await ensureUserProfile(session.user)
          }
        
          return session
        } catch (error: any) {
          console.log('afterCalback error', error)
          console.error(error);
        }
      }
  }),
    // callback: handleCallback({
    //   async afterCallback(req: any, session: any) {
    //     const payload = {
    //       userId: session.user.sub,
    //       exp: Math.floor(Date.now() / 1000) + 60 * 60,
    //     }
    //     const 
      
    //     session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      
    //     // Create profile after successful authentication
    //     if (session?.user) {
    //       console.log('session.user', session.user)
    //       // await ensureUserProfile(session.user)
    //     }
    //     return session
    //   },
    // }),
  }
);