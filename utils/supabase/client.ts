import { getSession } from "@auth0/nextjs-auth0";
import { createBrowserClient } from "@supabase/ssr";

// Define a function to create a Supabase client for client-side operations
export const createClient = () =>
  createBrowserClient(
    // Pass Supabase URL and anonymous key from the environment to the client
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async () => {
        const session = await getSession();

        return session?.user?.accessToken ?? "";
      },
    }
  );

export const getSupabase = (access_token: string) => {
  let options: any = {};

  if (access_token) {
    options = {
      // global: {
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //   },
      // },
      accessToken: async () => {
        const session = await getSession();

        return session?.user?.accessToken ?? "";
      },
    };
  }

  const supabase = createClient();

  return supabase;
};
