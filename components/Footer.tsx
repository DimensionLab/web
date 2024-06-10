"use client";

import Image from 'next/image'
import SocialsRow from './SocialsRow';
import Link from 'next/link';
import useClientOrigin from '@/lib/useClientOrigin';

const mainPoints = ["COMPANY", "PRODUCT", "LINKS"];

const companyLinks = [
  {
    name: "Mission",
    href: "/#mission",
  },
  {
    name: "Product",
    href: "/#product",
  },
  {
    name: "Team",
    href: "/#team"
  },
  {
    name: "Case Studies",
    href: "/case-studies"
  },
];

const productLinks = [
  {
    name: "Features",
    href: "/simlai/#features",
  },
  {
    name: "Model Engineer",
    href: "/simlai/#model-engineer",
  },
  {
    name: "Simulation Studio",
    href: "/simlai/#simulation-studio",
  },
  {
    name: "Docs",
    href: "https://docs.siml.ai",
  },
];

const otherLinks = [
  {
    name: "Contact",
    href: "mailto:hello@dimensionlab.org"
  },
  {
    name: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  }
];

export default function Footer() {
  const origin = useClientOrigin();
  return (
    <footer className="bg-lightBg w-full">
      <section className="flex flex-col py-12 gap-y-6 px-20 xl:px-0 items-center">

        <ul className='flex flex-col gap-y-6 lg:flex-row w-full lg:justify-between lg:max-w-4xl'>
          <div className='flex flex-col gap-y-6 max-w-[60%]'>
            <Image src={"/assets/branding/dl-title-intro.svg"} alt="DimensionLab" width={150} height={50} />
            <SocialsRow />
            <ul className="text-white flex flex-col">
              <li className="inline-flex py-1">
                <img src="/assets/component-assets/footer/location-icon.svg" alt="" />
                <div className="ml-2 text-xs flex flex-col">Lomnická 2, 040 01 Košice, Slovakia</div>
              </li>
              <li className="inline-flex py-1">
                <img src="/assets/component-assets/footer/phone-icon.svg" alt="" />
                <div className="ml-2 text-xs">+421 911 334 797</div>
              </li>
              <li className="inline-flex py-1">
                <img src="/assets/component-assets/footer/email-icon.svg" alt="" />
                <a href="mailto:hello@dimensionlab.org">
                  <div className="ml-2 text-xs">hello@dimensionlab.org</div>
                </a>
              </li>
            </ul>
          </div>
          {mainPoints.map((point, index) => (
            <li key={index} className="text-md text-muted">
              <span className="font-bold">{point}</span>
              {point === "COMPANY" && (
                <ul className="flex flex-col pt-2">
                  {companyLinks.map((link, index) => (
                    <li key={index} className="font-light text-md text-white">
                      <Link href={link.href.startsWith("https://") || link.href.startsWith("mailto:") ? link.href : origin + link.href} target={link.href.startsWith("https://") ? "_blank" : ""}>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {point === "PRODUCT" && (
                <ul className="flex flex-col pt-2">
                  {productLinks.map((link, index) => (
                    <li key={index} className="font-light text-md text-white">
                      <Link href={link.href.startsWith("https://") || link.href.startsWith("mailto:") ? link.href : origin + link.href} target={link.href.startsWith("https://") ? "_blank" : ""}>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {point == "LINKS" && (
                <ul className="flex flex-col pt-2">
                  {otherLinks.map((link, index) => (
                    <li key={index} className="text-md text-white">
                      <Link href={link.href.startsWith("https://") || link.href.startsWith("mailto:") ? link.href : origin + link.href} target={link.href.startsWith("https://") ? "_blank" : ""} >
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className='w-full flex mx-auto pt-4'>
          <footer className="text-gray-500 text-xs text-center mx-auto w-[fit-content]">
            ©2021-{new Date().getFullYear()} DimensionLab s.r.o. All rights reserved.
          </footer>
        </div>
      </section>
    </footer>
  )
}
