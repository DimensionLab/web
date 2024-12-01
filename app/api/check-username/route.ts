import { db } from '@/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ available: false })
  }

  try {
    const existingUser = await db.query.userProfiles.findFirst({
      where: (profiles, { eq }) => eq(profiles.userName, username)
    })

    return NextResponse.json({ available: !existingUser })
  } catch (error) {
    return NextResponse.json({ available: false }, { status: 500 })
  }
} 