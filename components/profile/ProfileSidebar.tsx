import Link from "next/link";
import { SOCIAL_PLATFORMS } from "./social-platforms";
import { UserProfile } from "@/db/schema";

export function ProfileSidebar({
  profile,
  isPublic,
}: {
  profile: UserProfile;
  isPublic: boolean;
}) {
  return (
    <div className="w-80 border-r border-border p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile avatar */}
          <div className="h-36 w-36 rounded-full bg-muted">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || ""}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
            <p className="text-sm text-muted-foreground">
              @{profile?.username}
            </p>
          </div>

          {/* Add social icons row */}
          <div className="flex items-center justify-center space-x-3">
            {(profile?.social_links as any[])?.map((link, index) => {
              const platform = SOCIAL_PLATFORMS.find(
                (p) => p.id === link.platform
              );
              if (!platform) return null;

              return (
                <Link
                  key={index}
                  href={link.url}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 dark:text-muted-foreground dark:hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl">{<platform.icon />}</span>
                </Link>
              );
            })}
          </div>

          {/* Stats pills */}
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <div className="font-bold">{profile?.papers_count}</div>
              <div className="text-muted-foreground">Papers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{profile?.models_count}</div>
              <div className="text-muted-foreground">Models</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{profile?.datasets_count}</div>
              <div className="text-muted-foreground">Datasets</div>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="space-y-2 text-sm">
          {profile?.website && (
            <Link
              href={profile.website}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span>🔗</span>
              <span>{profile?.website}</span>
            </Link>
          )}
        </div>

        {/* Navigation links */}
        <nav className="space-y-2">
          {!isPublic && (
            <Link
              href="/profile/settings"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <span>Profile Settings</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
