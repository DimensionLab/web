import { z } from 'zod'

// Add this type for react-select options
type SelectOption = {
  value: string;
  label: string;
};

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
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(100).optional(),
  
  specializations: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).optional(),
  
  skills: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).optional(),
  
  interests: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).optional(),
  
  academicBackground: z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.number(),
    field: z.string(),
  }).optional(),
  
  projectHighlights: z.array(z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    technologies: z.array(z.string()).optional(),
  })).optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

// Optional: Export the SelectOption type if you need it elsewhere
export type { SelectOption } 