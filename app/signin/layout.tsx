import config from "@/config";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: `Sign-in to ${config.appName}`,
  canonicalUrlRelative: "/auth/signin",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
