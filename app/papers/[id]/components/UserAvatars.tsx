import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type UserProfile } from "@/db/schema";

interface UserAvatarsProps {
  users: Pick<UserProfile, "id" | "full_name" | "avatar_url">[];
  totalCount?: number;
}

export function UserAvatars({ users, totalCount }: UserAvatarsProps) {
  const displayUsers = users.slice(0, 5);
  const remainingCount = totalCount
    ? totalCount - displayUsers.length
    : users.length - displayUsers.length;

  return (
    <div className="flex -space-x-2 items-center">
      {displayUsers.map((user) => (
        <Avatar
          key={user.id}
          className="h-8 w-8 border-2 border-white dark:border-gray-800"
        >
          <AvatarImage src={user.avatar_url ?? ""} />
          <AvatarFallback>
            {user.full_name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 dark:border-gray-800 dark:bg-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-200">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
