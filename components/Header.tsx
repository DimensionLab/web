"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HamburgerMenu from "@/components/mobile/HamburgerMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";
import useClientOrigin from "@/lib/useClientOrigin";
import TrackingWrapper from "./tracking/TrackingWrapper";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileDropdown from "./organisms/ProfileDropdown";

const mainMenuItems = [
  {
    label: "Mission",
    href: "/#mission"
  },
  {
    label: "Product",
    href: "/#product"
  },
  {
    label: "Team",
    href: "/#team"
  },
  {
    label: "Blog",
    href: "/blog"
  },
  {
    label: "Case studies",
    href: "/case-studies"
  },
  {
    label: "Siml.ai",
    href: "/products/simlai"
  },
]

const simlMenuItems = [
  {
    label: "FEATURES",
    href: "/#features"
  },
  {
    label: "MODEL ENGINEER",
    href: "/#model-engineer"
  },
  {
    label: "SIMULATION STUDIO",
    href: "/#simulation-studio"
  },
  {
    label: "DOCS",
    href: "https://docs.siml.ai"
  },
  {
    label: "PRICING",
    href: "/products/simlai/pricing"
  },
  {
    label: "LEARN",
    href: "/products/simlai/university"
  },
  {
    label: "CASE STUDIES",
    href: "/case-studies"
  },
  {
    label: "PAPERS",
    href: "/papers"
  },
  {
    label: "BLOG",
    href: "/blog"
  },
]


export default function Header() {
  const { user } = useUser();
  const TOP_OFFSET = 50;
  const pathname = usePathname();
  const originUrl = useClientOrigin();
  const [showBackground, setShowBackground] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen])

  console.log(pathname)

  return (
    <div className={`w-full sticky top-0 left-0 z-30 xl:pr-0 duration-200 ${showBackground ? "bg-darkBg" : "bg-transparent"}`}>
      <TrackingWrapper />
      <nav className="flex max-w-[1280px] mx-auto w-full justify-between px-6 xl:px-0 py-4 xl:py-6 mx-auto">
        <Link href={originUrl + "/#"} className="flex opacity-100 hover:opacity-90 duration-300">
          <Image src={"/assets/branding/dl-title-intro.svg"} alt="DimensionLab" width={200} height={50} />
        </Link>
        <div className="flex">
          <ul className="max-xl:hidden flex flex-row gap-x-8 items-center font-bold text-sm">
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between w-full py-2 px-3 text-white hover:text-gray-300 duration-300 border-b border-gray-100 md:w-auto md:hover:bg-transparent md:border-0 md:p-0">Company <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="hidden xl:block absolute z-10 opacity-95 mt-4 w-44 -translate-x-[50px] text-sm border rounded-lg shadow-md border-gray-700 bg-gray-900">
                  <DropdownMenuItem className="px-4 py-2">
                    <Link href="/" className="text-white hover:text-gray-300">
                      Overview
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2">
                    <Link href="/#mission" className="text-white hover:text-gray-300">
                      Mission
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2">
                    <Link href="/#product" className="text-white hover:text-gray-300">
                      Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2">
                    <Link href="/#team" className="text-white hover:text-gray-300">
                      Team
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between w-full py-2 px-3 text-white hover:text-gray-300 duration-300 md:w-auto md:p-0">Siml.ai Platform <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="hidden xl:block absolute z-10 opacity-95 mt-4 w-[25rem] -translate-x-[200px] text-sm border rounded-lg shadow-md border-gray-700 bg-gray-900">
                  <div className="grid max-w-screen-xl px-4 py-2 mx-auto text-sm text-gray-500 md:grid-cols-2 md:px-6">
                    <ul className="space-y-1 mb-4 md:mb-0">
                      <DropdownMenuItem>
                        <Link href="/products/simlai/" className="text-white hover:text-gray-300">
                          Overview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/products/simlai/#features" className="text-white hover:text-gray-300">
                          Features
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/products/simlai/#model-engineer" className="text-white hover:text-gray-300">
                          Model Engineer
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/products/simlai/#simulation-studio" className="text-white hover:text-gray-300">
                          Simulation Studio
                        </Link>
                      </DropdownMenuItem>
                    </ul>
                    <ul className="mb-4 space-y-1 md:mb-0">
                      <DropdownMenuItem>
                        <Link href="/products/simlai/pricing" className="text-white hover:text-gray-300">
                          Pricing
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href="https://docs.siml.ai" className="text-white hover:text-gray-300" target="_blank">
                          Documentation
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/products/simlai/university" className="text-white hover:text-gray-300">
                          Learn
                        </Link>
                      </DropdownMenuItem>
                    </ul>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link href="/papers" replace target="">
                <span className="text-white hover:text-gray-300 duration-300">Papers</span>
              </Link>
            </li>
            <li>
              <Link href="/blog" replace target="">
                <span className="text-white hover:text-gray-300 duration-300">Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/case-studies" replace target="">
                <span className="text-white hover:text-gray-300 duration-300">Case studies</span>
              </Link>
            </li>
            {user ? <ProfileDropdown /> : (
              <>
              <li>
                <a href="/api/auth/signup">
                  <span className="px-4 py-2 -my-2 font-bold text-white hover:text-gray-300 hover:brightness-125 duration-300">Sign up</span>
                </a>
              </li>
              <li>
                <a href="/api/auth/login">
                  <button className="bg-btnPurple px-4 py-2 -my-2 rounded font-bold text-white hover:text-gray-300 hover:brightness-125 duration-300">Log in</button>
                </a>
              </li>
              </>
            )}
          </ul>
          <button onClick={() => toggleMenu()} className="xl:hidden">
            <Image src="/assets/hamburger-menu.svg" alt="Menu" width={30} height={30} />
          </button>
        </div>
      </nav>

      <HamburgerMenu className={menuOpen ? 'flex' : 'hidden'} toggleMenu={toggleMenu} />
    </div>
  )
}