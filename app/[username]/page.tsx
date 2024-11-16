import { db } from "@/db";
import { notFound } from "next/navigation";
import PublicProfileContainer from "@/components/profile/PublicProfileContainer";

interface PublicProfileProps {
  params: {
    username: string;
  };
}

async function getPublicProfile(username: string) {
  const profile = await db.query.UserProfiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username),
    columns: {
      id: true,
      username: true,
      full_name: true,
      bio: true,
      created_at: true,
      updated_at: true,
      email: true,
      avatar_url: true,
      website: true,
      social_links: true,
    },
    // with: {
    //   collections: {
    //     columns: {
    //       id: true,
    //       title: true,
    //       description: true,
    //       updated_at: true,
    //     }
    //   },
    //   papers: {
    //     columns: {
    //       id: true,
    //       title: true,
    //       description: true,
    //       published_at: true,
    //       citations: true,
    //     }
    //   }
    // },
  });

  return profile;
}

export default async function PublicProfilePage({ params }: PublicProfileProps) {
  const profile = await getPublicProfile(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="flex min-h-screen max-w-[1600px] mx-auto">
      <PublicProfileContainer profile={profile} />
    </div>
  );
} 