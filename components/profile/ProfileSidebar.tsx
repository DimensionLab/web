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
    <div className="w-80 border-r border-border dark:border-gray-800 p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile avatar */}
          <div className="h-36 w-36 rounded-full bg-transparent border border-border dark:border-gray-800">
            {profile?.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName || ""}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profile?.fullName}</h2>
            <p className="text-sm text-muted-foreground">
              {profile?.userName ? `@${profile?.userName}` : "Add username in profile settings"}
            </p>
          </div>

          {/* Add social icons row */}
          <div className="flex items-center justify-center space-x-3">
            {(profile?.socialLinks as any[])?.map((link, index) => {
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

          {/* Job and specialization details */}
          <div className="space-y-2 text-sm text-center">
            {(profile?.jobTitle || profile?.company) && (
              <div className="text-muted-foreground">
                {profile.jobTitle}
                {profile.jobTitle && profile.company && " @ "}
                {profile.company}
              </div>
            )}
            
            {profile?.specializations && profile?.specializations?.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {profile.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground/75"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Links section */}
        <div className="space-y-2 text-sm">
          {profile?.personalWebsite && (
            <Link
              href={profile.personalWebsite}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span>🔗</span>
              <span>{profile?.personalWebsite}</span>
            </Link>
          )}
        </div>

        {/* Navigation links */}
        <nav className="space-y-2">
          {!isPublic && (
            <Link
              href="/profile/settings"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 duration-150 hover:bg-muted/20"
            >
              <span>Profile Settings</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
