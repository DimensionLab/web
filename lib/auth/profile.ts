import { db } from '@/db'
import { UserProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function ensureUserProfile(auth0User: {
  sub: string
  email: string
  name?: string
  picture?: string
  username: string
}) {
  try {
    // Validate required fields
    if (!auth0User.sub || !auth0User.email) {
      throw new Error('Missing required Auth0 user data')
    }

    // Check if profile exists
    const existingProfile = await db.query.UserProfiles.findFirst({
      where: eq(UserProfiles.id, auth0User.sub),
    })

    if (!existingProfile) {
      // Create new profile
      const newProfile = await db
        .insert(UserProfiles)
        .values({
          id: auth0User.sub,
          email: auth0User.email,
          full_name: auth0User.name || '',
          avatar_url: auth0User.picture || '',
          username: auth0User.username,
        })
        .returning()

      return newProfile[0]
    }

    return existingProfile
  } catch (error) {
    console.error('Error ensuring user profile:', error)
    throw error
  }
} 