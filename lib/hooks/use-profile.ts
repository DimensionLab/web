import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileFormSchema } from '../schemas/profile'
import type { UserProfile } from '@/db/schema'

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${userId}`)
      if (!res.ok) throw new Error('Failed to fetch profile')
      return res.json() as Promise<UserProfile>
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: UserProfile) => {
      const res = await fetch(`/api/profile/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update profile')
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] })
    },
  })
} 