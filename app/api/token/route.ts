import { getSession } from "@auth0/nextjs-auth0"

export async function GET() {
  const session = await getSession();

  if (!session) { 
    // @ts-ignore
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // @ts-ignore
  return Response.json({ accessToken: session.accessToken }, { status: 200 });
}
