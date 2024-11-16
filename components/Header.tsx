"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HamburgerMenu from "@/components/mobile/HamburgerMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import useClientOrigin from "@/lib/useClientOrigin";
import TrackingWrapper from "./tracking/TrackingWrapper";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileDropdown from "./organisms/ProfileDropdown";
import { useQueryStripeCustomerCredits } from "@/queries/client/stripe";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";
import DimensionLabLogo from "./DimensionLabLogo";

const mainMenuItems = [
  {
    label: "Mission",
    href: "/#mission",
  },
  {
    label: "Product",
    href: "/#product",
  },
  {
    label: "Team",
    href: "/#team",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Case studies",
    href: "/case-studies",
  },
  {
    label: "Siml.ai",
    href: "/products/simlai",
  },
];

const simlMenuItems = [
  {
    label: "FEATURES",
    href: "/#features",
  },
  {
    label: "MODEL ENGINEER",
    href: "/#model-engineer",
  },
  {
    label: "SIMULATION STUDIO",
    href: "/#simulation-studio",
  },
  {
    label: "DOCS",
    href: "https://docs.siml.ai",
  },
  {
    label: "PRICING",
    href: "/products/simlai/pricing",
  },
  {
    label: "LEARN",
    href: "/products/simlai/university",
  },
  {
    label: "CASE STUDIES",
    href: "/case-studies",
  },
  {
    label: "PAPERS",
    href: "/papers",
  },
  {
    label: "BLOG",
    href: "/blog",
  },
];

export default function Header() {
  const { user } = useUser();
  const TOP_OFFSET = 50;
  const pathname = usePathname();
  const originUrl = useClientOrigin();
  const [showBackground, setShowBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useQueryStripeCustomerCredits();
  const { theme, setTheme } = useTheme();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <div
      className={`w-full sticky top-0 left-0 z-30 xl:pr-0 duration-200 ${
        showBackground
          ? "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <TrackingWrapper />
      <nav className="flex max-w-[1280px] mx-auto w-full justify-between px-6 xl:px-0 py-4 xl:py-6 mx-auto">
        <Link
          href={originUrl + "/#"}
          className="flex opacity-100 hover:opacity-90 duration-300 cursor-pointer text-gray-900 dark:text-white"
        >
          <DimensionLabLogo
            color={theme === "dark" ? "#EBEDFA" : "#000"}
            width={200}
            height={50}
          />
        </Link>
        <div className="flex">
          <div className="max-xl:hidden flex flex-row gap-x-8 items-center font-bold text-sm text-gray-900 dark:text-gray-50">
            {user ? (
              <NavigationMenu className="flex items-center">
                <NavigationMenuList className="flex gap-x-8">
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/blog">
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Blog
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/papers">
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Papers
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <Link
                      href="https://platform.siml.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Siml.ai
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <span className="text-gray-900 dark:text-gray-50">
                      Credits: {data?.credits}
                    </span>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
                      >
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <ProfileDropdown />
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <NavigationMenu className="flex items-center">
                <NavigationMenuList className="flex gap-x-8">
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuTrigger className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 bg-transparent p-0 h-auto font-bold text-sm">
                      Company
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white dark:bg-gray-900 min-w-[200px] p-2">
                      <div className="grid gap-2">
                        <Link
                          href="/"
                          className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 p-2"
                        >
                          Overview
                        </Link>
                        <Link
                          href="/#mission"
                          className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 p-2"
                        >
                          Mission
                        </Link>
                        <Link
                          href="/#product"
                          className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 p-2"
                        >
                          Product
                        </Link>
                        <Link
                          href="/#team"
                          className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 p-2"
                        >
                          Team
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 bg-transparent p-0 h-auto font-bold text-sm">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white dark:bg-gray-900 min-w-[500px]">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                            Siml.ai Platform
                          </h4>
                          <div className="grid gap-2">
                            <Link
                              href="/products/simlai/"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Overview
                            </Link>
                            <Link
                              href="/products/simlai/#features"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Features
                            </Link>
                            <Link
                              href="/products/simlai/#model-engineer"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Model Engineer
                            </Link>
                            <Link
                              href="/products/simlai/#simulation-studio"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Simulation Studio
                            </Link>
                          </div>
                        </div>
                        <div className="border-l border-gray-700 pl-4">
                          <div className="grid gap-2">
                            <Link
                              href="/products/simlai/pricing"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Pricing
                            </Link>
                            <a
                              href="https://docs.siml.ai"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                              target="_blank"
                            >
                              Documentation
                            </a>
                            <Link
                              href="/products/simlai/university"
                              className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              Learn
                            </Link>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/blog" replace target="">
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Blog
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/papers" replace target="">
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Papers
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/case-studies" replace target="">
                      <span className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 duration-300 font-bold text-sm">
                        Case studies
                      </span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <a href="/api/auth/signup">
                      <span className="px-4 py-2 font-bold text-sm text-white hover:text-gray-300 hover:brightness-125 duration-300">
                        Sign up
                      </span>
                    </a>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="flex items-center">
                    <a href="/api/auth/login">
                      <button className="bg-btnPurple px-4 py-2 rounded font-bold text-sm text-white hover:text-gray-300 hover:brightness-125 duration-300">
                        Log in
                      </button>
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          <button
            onClick={() => toggleMenu()}
            className="xl:hidden text-gray-900 dark:text-gray-50"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5H25M5 15H25M5 22.5H25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <HamburgerMenu
        className={menuOpen ? "flex" : "hidden"}
        toggleMenu={toggleMenu}
      />
    </div>
  );
}
