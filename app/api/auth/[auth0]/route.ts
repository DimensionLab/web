import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

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
    })
  }
);