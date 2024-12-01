import PrivateProfileContainer from "@/components/profile/PrivateProfileContainer";
import { getSupabase } from "@/utils/supabase/client";
import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default withPageAuthRequired(
  async function ProfilePage() {
    const session = await getSession();
    const supabase = await getSupabase(session?.user?.accessToken as string);
    console.log(supabase);
    const { data: todos } = await supabase.from('todo').select('*')
    console.log('todos', todos)

    // if (!session?.user) {
    //   return redirect("/signin");
    // }
    return (
      <div className="flex min-h-screen max-w-[1600px] mx-auto">
        <PrivateProfileContainer />
      </div>
    );
  },
  { returnTo: "/" }
);
