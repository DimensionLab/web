import PrivateProfileContainer from "@/components/profile/PrivateProfileContainer";
import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    return redirect("/signin");
  }
  return (
    <div className="flex min-h-screen max-w-[1600px] mx-auto">
      <PrivateProfileContainer />
    </div>
  );
}
