import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "@/components/CookieConsent";
import CoverLayout from "@/components/CoverLayout";
import HubLayout from "@/components/hub/layout/HubLayout";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { getSEOTags } from "@/lib/seo";
import { getSession } from "@auth0/nextjs-auth0";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getSEOTags();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const Layout = session?.user ? HubLayout : CoverLayout;
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <Providers>
            <Layout>{children}</Layout>
            <CookieConsent />
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
