"use client"

import React from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useProfile } from "@/lib/hooks/use-profile";
import CollectionsSection from "./CollectionsSection";
import PapersSection from "./PapersSection";

export default function PrivateProfileContainer() {
  const { user: auth0User } = useUser();
  const { data: profile, isLoading } = useProfile(auth0User?.sub as string);

  if (isLoading) {
    return <div className="w-80 border-r border-border p-6">Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <>
      <ProfileSidebar profile={profile} isPublic={false} />

      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          <CollectionsSection />
          <PapersSection userId={profile.userId} />
        </div>
      </div>
    </>
  );
}
