'use client';

import { createClient } from '@/utils/supabase/client';
import { getURL } from '@/lib/utils';
import { redirectToPath } from './server';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Provider } from '@supabase/supabase-js';

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
) {
  // Prevent default form submission refresh
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl = await requestFunc(formData);
  
  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get("provider")).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = await createClient();
  const redirectURL = getURL("/auth/callback");
  console.log(redirectURL);
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL
    }
  });
}