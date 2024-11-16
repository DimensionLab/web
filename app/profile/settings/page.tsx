import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ProfileForm } from '@/components/profile/profile-form'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(
  async function ProfileSettingsPage() {
    return (
      <div className="container max-w-4xl py-8">
      <Link 
        href="/profile" 
        className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Profile
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences
        </p>
      </div>
      <ProfileForm />
    </div>
    )
  },
  { returnTo: "/" }
);
