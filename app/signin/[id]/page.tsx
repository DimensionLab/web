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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update-password") {
    return redirect("/");
  } else if (!user && viewProp === "update-password") {
    return redirect("/signin");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="flex flex-col items-center justify-center">
          <Link
            href="/"
            className="flex mx-auto items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              src="/icon-rounded.png"
              alt={`${config.appName} logo`}
              className="w-8 mr-2"
              width={32}
              height={32}
            />
            Heatbot.io
          </Link>
        </div>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {viewProp === "forgot-password"
                ? "Reset Password"
                : viewProp === "update-password"
                  ? "Update Password"
                  : viewProp === "signup"
                    ? "Sign Up"
                    : "Sign In"}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                  <div className="text-sm font-light my-4">Third-party sign-in</div>
                  <OauthSignIn />
                </>
              )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
