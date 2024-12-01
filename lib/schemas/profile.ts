import { z } from 'zod'

export const profileFormSchema = z.object({
  userName: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  personalWebsite: z.string().url().optional().or(z.literal('')),
  socialLinks: z.array(
    z.object({
      platform: z.enum(['twitter', 'github', 'linkedin', 'facebook']),
      url: z.string().url(),
    })
  ).optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema> 