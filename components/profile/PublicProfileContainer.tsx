"use client"

import React from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import CollectionsSection from "./CollectionsSection";
import PapersSection from "./PapersSection";
import { UserProfile } from "@/db/schema";

export default function PublicProfileContainer({ profile }: { profile: UserProfile }) {
  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <>
      <ProfileSidebar profile={profile} isPublic={true} />

      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          <CollectionsSection />
          <PapersSection userId={profile.id} />
        </div>
      </div>
    </>
  );
}
