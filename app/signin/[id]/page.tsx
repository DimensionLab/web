// import Logo from "@/components/icons/Logo";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from "@/utils/auth-helpers/settings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordSignIn from "@/components/auth/PasswordSignIn";
import EmailSignIn from "@/components/auth/EmailSignIn";
import { Separator } from "@/components/ui/separator";
import OauthSignIn from "@/components/auth/OauthButtons";
import ForgotPassword from "@/components/auth/ForgotPassword";
import UpdatePassword from "@/components/auth/UpdatePassword";
import SignUp from "@/components/auth/Signup";
import config from "@/config";
import Link from "next/link";

export default async function SignIn({ params }: { params: { id: string } }) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get("preferredSignInView")?.value || "password-signin";
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && viewProp !== "update-password") {
    return redirect("/");
  } else if (!user && viewProp === "update-password") {
    return redirect("/signin");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            <img
              src="/icon-rounded.png"
              alt={`${config.appName} logo`}
              className="w-10 h-10 mr-2"
            />
            Heatbot.io
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800 dark:text-gray-200">
              {viewProp === "forgot-password"
                ? "Reset Password"
                : viewProp === "update-password"
                ? "Update Password"
                : viewProp === "signup"
                ? "Sign Up"
                : "Sign In"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {viewProp === "password-signin" && (
              <PasswordSignIn
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === "email-signin" && (
              <EmailSignIn
                allowPassword={allowPassword}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === "forgot-password" && (
              <ForgotPassword
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === "update-password" && (
              <UpdatePassword redirectMethod={redirectMethod} />
            )}
            {viewProp === "signup" && (
              <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
            )}
            {viewProp !== "update-password" &&
              viewProp !== "signup" &&
              allowOauth && (
                <>
                  <Separator className="my-4" />
                  <div className="text-sm font-light text-center text-gray-600 dark:text-gray-400">
                    Third-party sign-in
                  </div>
                  <OauthSignIn />
                </>
              )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
