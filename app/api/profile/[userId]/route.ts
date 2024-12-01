import { db } from '@/db'
import { userProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getSession } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'
import { ensureUserProfile } from '@/lib/auth/profile'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const MAX_RETRIES = 3;
  let lastError: any = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const session = await getSession()
      if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 })
      }

      if (!session.user.sub || !session.user.email) {
        // Wait a bit before retrying if Auth0 data isn't ready
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      const profile = await ensureUserProfile({
        sub: session.user.sub,
        email: session.user.email,
        name: session.user.name,
        picture: session.user.picture,
        username: session.user.nickname,
      })
      return NextResponse.json(profile)
    } catch (error) {
      lastError = error;
      console.error(`Profile GET error (attempt ${attempt}/${MAX_RETRIES}):`, error)
      
      if (attempt === MAX_RETRIES) {
        break;
      }
      
      // Exponential backoff between retries
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  // If we get here, all retries failed
  console.error('All profile fetch attempts failed. Last error:', lastError)
  return new NextResponse('Internal Error', { status: 500 })
}

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    console.log('body', body)
    
    const updatedProfile = await db
      .update(userProfiles)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, params.userId))
      .returning()

    return NextResponse.json(updatedProfile[0])
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 