import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import PrivateProfileContainer from "@/components/profile/PrivateProfileContainer";

export default withPageAuthRequired(
  async function ProfilePage() {
    return (
      <div className="flex min-h-screen max-w-[1600px] mx-auto">
        <PrivateProfileContainer />
      </div>
    );
  },
  { returnTo: "/" }
);
