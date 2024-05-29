"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import SocialsRow from "../SocialsRow";
import useClientOrigin from "@/lib/useClientOrigin";

const linksData = [
  {
    name: "Mission",
    href: "#mission"
  },
  {
    name: "Product",
    href: "/#product"
  },
  {
    name: "Team",
    href: "#team"
  },
];

export default function HamburgerMenu( { className, toggleMenu }: { className: string, toggleMenu: () => void } ){
  const originUrl = useClientOrigin();
  return (
    <div className={cn(`absolute top-0 left-0 flex h-screen w-screen flex-col justify-between bg-[#000] ${className}`)}>
      <section className="flex flex-col gap-y-12">
        <div className="w-full px-4">
          <nav className="flex py-4 justify-between w-full">
            <Link href={"#"} className="flex">
              <Image src={"/assets/logo_D.svg"} alt="Siml.ai" width={50} height={50} />
            </Link>
            <div className="flex gap-x-4">
              <button onClick={() => toggleMenu()}>
                <Image src="/assets/hamburger-menu.svg" alt="Menu" width={30} height={30} />
              </button>
            </div>
          </nav>
        </div>
        <ul className="w-full px-10 flex flex-col gap-y-6">
          {linksData.map((link, index) => (
            <li key={index} className="font-bold text-xl text-muted hover:text-white duration-300">
              <Link href={link.href.includes("https://") ? link.href : originUrl + link.href} onClick={() => toggleMenu()} replace target={link.href.includes("https://") ? "_blank" : ""}>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-10">
          <SocialsRow />
        </div>
      </section>
      <footer className="px-10 mb-6">
        <div className="flex w-full justify-between">
          <Link href={"https://www.dimensionlab.org/terms-and-conditions.html"} target="_blank">
              Terms & Conditions
          </Link>
          <Link href={"https://www.dimensionlab.org/privacy-policy.html"} target="_blank">
              Privacy Policy
          </Link>
        </div>
        <span className="text-muted text-xs">
          ©2021-{new Date().getFullYear()} DimensionLab, creators of Siml.ai
        </span>
      </footer>
    </div>
  );
}
