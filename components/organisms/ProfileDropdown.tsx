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
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex text-[--light] body-compact-01 focus:border-transparent focus:outline-none select-none">
        <Avatar>
          <AvatarImage src={user?.picture ?? ""} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "bg-[--carbon-gray-100] border-0 text-[--light] body-compact-01 text-center"
        )}
      >
        {user?.name && (
          <>
            <DropdownMenuLabel className="font-normal text-[--secondary] text-xs">
              {user?.name}
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
