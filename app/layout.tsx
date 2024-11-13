import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "@/components/CookieConsent";
import CoverLayout from "@/components/CoverLayout";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DimensionLab",
  description: "Next-generation engineering & scientific software",
  keywords: "physics, simulations, AI, machine learning, deep learning",
  icons: [
    {
      rel: "icon",
      url: "/assets/logo_D.svg",
    },
  ],
  openGraph: {
    title: "DimensionLab",
    description: "Next-generation engineering & scientific software",
    images: [
      {
        url: "https://www.dimensionlab.org/assets/dimensionlab-opengraph.png",
        width: 1200,
        height: 630,
        alt: "DimensionLab - Next-generation engineering & scientific software",
      },
    ],
    url: "https://dimensionlab.org/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TheDimensionLab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <Providers>
            <CoverLayout>{children}</CoverLayout>
            <CookieConsent />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
