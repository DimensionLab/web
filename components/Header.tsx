"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HamburgerMenu from "@/components/mobile/HamburgerMenu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useClientOrigin from "@/lib/useClientOrigin";

const menuItems = [
  {
    label: "Mission",
    href: "#mission"
  },
  {
    label: "What we do",
    href: "/#what-we-do"
  },
  {
    label: "Product",
    href: "/#product"
  },
  {
    label: "Team",
    href: "#team"
  },
]


export default function Header() {
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

  const doHighlight = (label: string) => {
    if (
      pathname.includes(label.toLowerCase()) ||
      (pathname.includes("university") && label === "LEARN")
    ) {
      return "text-white";
    } else {
      return "text-muted";
    }
  }
  return (
    <div className={`w-full px-4 sticky top-0 left-0 py-2 z-30 xl:pr-0 duration-200 bg-[#0D101B] ${showBackground && "opacity-80"}`}>
      <nav className="flex max-w-[1280px] mx-auto w-full py-4 justify-between xl:py-0 mx-auto">
        <Link href={originUrl + "/#"} className="flex pt-2">
          <Image src={"/assets/branding/header-logo-dl.svg"} alt="DimensionLab" width={23} height={23} />
        </Link>
        <div className="flex gap-x-4">
          <ul className="max-xl:hidden flex flex-row gap-x-6 items-center text-muted font-bold text-sm">
            { menuItems.map((item, index) => (
              <li key={index}>
                <Link  href={item.href.includes("https://") ? item.href : originUrl + item.href} replace target={item.href.includes("https://") ? "_blank" : ""}>
                  <span className={cn(`${doHighlight(item.label)} hover:text-white duration-300`)}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => toggleMenu()} className="xl:hidden">
            <Image src="/assets/hamburger-menu.svg" alt="Menu" width={30} height={30} />
          </button>
        </div>
      </nav>
      <HamburgerMenu className={menuOpen ? 'flex' : 'hidden'} toggleMenu={toggleMenu}/>
    </div>
  )
}