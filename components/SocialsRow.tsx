import Link from "next/link"
import Image from "next/image"

const socialsData = [
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
]

export default function SocialsRow() {

  return (
    <ul className="flex w-full gap-x-2 xl:gap-x-4">
      {socialsData.map((social, index) => (
        <li key={index} className="flex gap-x-4">
          <Link href={social.href} target="_blank">
            <Image src={social.icon} alt="Social" width={30} height={30} />
          </Link>
        </li>
      ))}
    </ul>
  )
}