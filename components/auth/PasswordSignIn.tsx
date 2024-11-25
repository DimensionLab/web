"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PasswordSignIn({ allowEmail, redirectMethod }: { allowEmail: boolean; redirectMethod: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(
      e,
      signInWithPassword,
      redirectMethod === "client" ? router : null,
    );
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full p-3 rounded-md"
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full p-3 rounded-md"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm font-light">
        <p>
          <Link href="/signin/password-signin" className="font-light text-sm">
            Sign in with email and password
          </Link>
        </p>
        {allowEmail && (
          <p>
            <Link href="/signin/email-signin" className="font-light text-sm">
              Sign in via magic link
            </Link>
          </p>
        )}
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signin/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
