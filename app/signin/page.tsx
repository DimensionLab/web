import { redirect } from "next/navigation";
import { getDefaultSignInView } from "@/utils/auth-helpers/settings";
import { cookies } from "next/headers";

export default function SignIn() {
  const preferredSignInView =
    cookies().get("preferredSignInView")?.value || "password-signin";
  // Force it for now
  const defaultView = getDefaultSignInView(preferredSignInView);
  return redirect(`/signin/${defaultView}`);
}
