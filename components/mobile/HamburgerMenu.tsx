"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import SocialsRow from "@/components/SocialsRow";
import useClientOrigin from "@/lib/useClientOrigin";
import SimlSocialsRow from "../SimlSocialsRow";

export default function HamburgerMenu({
  className,
  toggleMenu,
}: {
  className: string;
  toggleMenu: () => void;
}) {
  const originUrl = useClientOrigin();
  return (
    <div
      className={cn(
        `absolute top-0 left-0 flex h-screen w-screen flex-col justify-between bg-[#000] ${className}`
      )}
    >
      <section className="flex flex-col gap-y-12">
        <div className="w-full px-4">
          <nav className="flex py-4 justify-between w-full">
            <Link href={"#"} className="flex">
              <Image
                src={"/assets/logo_D.svg"}
                alt="Siml.ai"
                width={50}
                height={50}
              />
            </Link>
            <div className="flex gap-x-4">
              <button onClick={() => toggleMenu()}>
                <Image
                  src="/assets/hamburger-menu.svg"
                  alt="Menu"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </nav>
        </div>
        <ul className="w-full px-10 flex flex-col gap-y-2">
          <div>Company</div>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/" onClick={() => toggleMenu()}>
              <span>Overview</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/#mission" onClick={() => toggleMenu()}>
              <span>Mission</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/#product" onClick={() => toggleMenu()}>
              <span>Product</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/#team" onClick={() => toggleMenu()}>
              <span>Team</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/blog" onClick={() => toggleMenu()}>
              <span>Blog</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/case-studies" onClick={() => toggleMenu()}>
              <span>Case studies</span>
            </Link>
          </li>
        </ul>
        <ul className="w-full px-10 flex flex-col gap-y-2">
          <div>Siml.ai Platform</div>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/" onClick={() => toggleMenu()}>
              <span>Overview</span>
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link
              href="/products/simlai/#features"
              onClick={() => toggleMenu()}
            >
              Features
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link
              href="/products/simlai/#model-engineer"
              onClick={() => toggleMenu()}
            >
              Model Engineer
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link
              href="/products/simlai/#simulation-studio"
              onClick={() => toggleMenu()}
            >
              Simulation Studio
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link href="/products/simlai/pricing" onClick={() => toggleMenu()}>
              Pricing
            </Link>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <a
              href="https://docs.siml.ai"
              target="_blank"
              onClick={() => toggleMenu()}
            >
              Documentation
            </a>
          </li>
          <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link
              href="/products/simlai/university"
              onClick={() => toggleMenu()}
            >
              Learn
            </Link>
          </li>
          {/* <li className="font-bold text-xl text-muted hover:text-white duration-300">
            <Link
              href="https://meetings-eu1.hubspot.com/takac"
              target="_blank"
              onClick={() => toggleMenu()}
            >
              Book a demo
            </Link>
          </li> */}
        </ul>
        <div className="px-10">
          <h4 className="text-lg text-muted py-1">Follow DimensionLab</h4>
          <SocialsRow customSocialsData={[
  {
    icon: "/assets/component-assets/footer/linkedin-logo.svg",
    href: "https://www.linkedin.com/company/dimensionlab",
  },
  {
    icon: "/assets/component-assets/footer/facebook-logo.svg",
    href: "https://www.facebook.com/dimensionlab/",
  },
  {
    icon: "/assets/component-assets/footer/twitter-logo.svg",
    href: "https://twitter.com/TheDimensionLab",
  },
]} />
        </div>
        <div className="px-10">
          <h4 className="text-lg text-muted py-1">Follow Siml.ai Platform</h4>
          <SimlSocialsRow customSocialsData={[
  {
    icon: "/assets/facebook-logo.svg",
    href: "https://www.facebook.com/dl.simlai",
  },
  {
    icon: "/assets/twitter-logo.svg",
    href: "https://twitter.com/siml_ai",
  },
  {
    icon: "/assets/ig-logo.svg",
    href: "https://www.instagram.com/siml.ai",
  },
  {
    icon: "/assets/discord-logo.png",
    href: "https://discord.gg/UxQyC9PEqt",
  },
  {
    icon: "/assets/reddit-logo.png",
    href: "https://www.reddit.com/r/simlai/"
  }
]} />
        </div>
      </section>
      <footer className="px-10 mb-6">
        <div className="flex flex-col w-full">
          <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
        </div>
        <div className="py-2">
          <span className="text-muted text-xs">
            ©2021-{new Date().getFullYear()} DimensionLab, creators of Siml.ai
          </span>
        </div>
      </footer>
    </div>
  );
}
