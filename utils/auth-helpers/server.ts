"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getURL } from "@/lib/utils";
import { getAuthTypes } from "@/utils/auth-helpers/settings";

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get("pathName")).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return pathName;
  }

  return "/signin";
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  let redirectPath;

  if (!isValidEmail(email)) {
    redirectPath = "/signin/email-signin";
  }

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (!allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  });

  if (error) {
    redirectPath = "/studio";
  } else if (data) {
    cookieStore.set("preferredSignInView", "email-signin", { path: "/" });
    redirectPath = "/signin/email-signin";
  } else {
    redirectPath = "/signin/email-signin";
  }

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL("/auth/reset-password");

  // Get form data
  const email = String(formData.get("email")).trim();
  let redirectPath;

  if (!isValidEmail(email)) {
    redirectPath = "/signin/forgot-password";
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  });

  if (error) {
    redirectPath = "/signin/forgot-password";
  } else if (data) {
    redirectPath = "/signin/forgot-password";
  } else {
    redirectPath = "/signin/forgot-password";
  }

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  let redirectPath;

  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectPath = "/signin/password-signin";
  } else if (data.user) {
    cookieStore.set("preferredSignInView", "password-signin", { path: "/" });
    redirectPath = "/";
  } else {
    redirectPath = "/signin/password-signin";
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();
  let redirectPath;

  if (!isValidEmail(email)) {
    redirectPath = "/signin/signup";
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    redirectPath = "/signin/signup";
  } else if (data.session) {
    redirectPath = "/";
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = "/signin/signup";
  } else if (data.user) {
    redirectPath = "/";
  } else {
    redirectPath = "/signin/signup";
  }

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password")).trim();
  const passwordConfirm = String(formData.get("passwordConfirm")).trim();
  let redirectPath;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = "/signin/update-password";
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirectPath = "/signin/update-password";
  } else if (data.user) {
    redirectPath = "/account";
  } else {
    redirectPath = "/signin/update-password";
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get("newEmail")).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return "/account";
  }

  const supabase = createClient();

  const callbackUrl = getURL("/account");

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    }
  );

  if (error) {
    return "/account";
  } else {
    return "/account";
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get("fullName")).trim();
  const userId = String(formData.get("userId"));

  const supabase = createClient();
  const { error, data } = await supabase
    .from("users")
    .update({ full_name: fullName })
    .eq("id", userId)
    .select("full_name")
    .single();

  if (error) {
    return "/account";
  } else if (data) {
    return "/account";
  } else {
    return "/account";
  }
}
