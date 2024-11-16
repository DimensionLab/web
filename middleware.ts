import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db } from '@/db'
import { UserProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const session = await getSession(req, res)

  if (session?.user) {
    try {
      // Check if user profile exists
      const existingProfile = await db.query.UserProfiles.findFirst({
        where: eq(UserProfiles.id, session.user.sub),
      })

      // If profile doesn't exist, create it
      if (!existingProfile) {
        await db.insert(UserProfiles).values({
          id: session.user.sub,
          email: session.user.email!,
          full_name: session.user.name || '',
          avatar_url: session.user.picture || '',
        })
      }
    } catch (error) {
      console.error('Error in profile middleware:', error)
    }
  }

  return res
}

// Only run middleware on routes that need authentication
export const config = {
  matcher: [
    '/profile/:path*',
    '/hub/:path*',
    // Add other protected routes here
  ]
}