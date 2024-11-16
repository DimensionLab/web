import { mdiAccount } from "@mdi/js";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Icon } from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/hooks/use-profile";

const items = [
  { label: "My Account", href: "/profile", icon: mdiAccount },
  { label: "Billing", href: "/billing", icon: mdiAccount },
  {
    label: "Support",
    href: "https://share-eu1.hsforms.com/1K3kq8CzUTNOuMjKtSgpwWgfzcwl",
    icon: mdiAccount,
  },
];

export default function ProfileDropdown() {
  const { user: auth0User } = useUser();
  const { data: profile, isLoading } = useProfile(auth0User?.sub as string);

  const userData = {
    name: profile?.full_name || auth0User?.name,
    picture: profile?.avatar_url || auth0User?.picture,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex text-[--light] body-compact-01 focus:border-transparent focus:outline-none select-none cursor-pointer">
        <Avatar>
          <AvatarImage src={userData.picture ?? ""} />
          <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="hidden xl:block absolute z-10 opacity-95 mt-4 w-44 -translate-x-[50px] text-sm border rounded-lg shadow-md border-gray-700 bg-gray-900"
      >
        {userData.name && (
          <>
            <DropdownMenuLabel className="font-normal text-[--secondary] text-xs">
              {userData.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[--secondary]" />
          </>
        )}
        {items?.length > 0 &&
          items.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
            >
              <DropdownMenuItem
                key={index}
                className={cn(
                  "flex gap-x-2 text-[--cool-gray-30] focus:bg-[--carbon-gray-80] focus:text-[--light] focus:cursor-pointer"
                )}
              >
                {item.icon && <Icon path={item.icon} className="w-4" />}
                <span>{item.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        <a href="/api/auth/logout" className="hover:cursor-pointer w-full">
          <DropdownMenuItem
            className={cn(
              "flex gap-x-2 text-[--cool-gray-30] focus:bg-[--carbon-gray-80] focus:text-[--light] focus:cursor-pointer"
            )}
          >
            <Icon path={mdiLogout} className="w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
