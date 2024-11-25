"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuth } from "@/utils/auth-helpers/client";
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { useState } from "react";

export default function OauthSignIn() {
  const oAuthProviders = [
    {
      name: "google",
      displayName: "Google",
      icon: <SiGoogle className="h-5 w-5" />,
    },
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="outline"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            <span>Login with {provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
