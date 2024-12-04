"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useProfile, useUpdateProfile } from '@/lib/hooks/use-profile'
import { profileFormSchema, type ProfileFormValues } from '@/lib/schemas/profile'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useCallback } from 'react'
import { SOCIAL_PLATFORMS } from './social-platforms'
import CreatableSelect from 'react-select/creatable';
import { useTheme } from 'next-themes';

const sanitizeHandle = (handle: string): string => {
  return handle
    .trim()
    .toLowerCase()
    .replace(/[^\w-]/g, '')
    .replace(/^-+|-+$/g, '');
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase(),
});

const getSelectStyles = (theme: 'light' | 'dark') => ({
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    borderColor: state.isFocused 
      ? '#c7c7c7' 
      : '#c7c7c7',
    borderRadius: 'var(--radius)',
    '&:hover': {
      borderColor: '#c7c7c7'
    },
    boxShadow: state.isFocused ? '0 0 0 1px #c7c7c7' : 'none',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    border: '1px solid #c7c7c7',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused 
      ? theme === 'dark' ? 'gray' : 'white'
      : 'transparent',
    color: state.isFocused
      ? theme === 'dark' ? 'white' : 'black'
      : theme === 'dark' ? 'white' : 'black',
  }),
  input: (base: any) => ({
    ...base,
    color: theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: theme === 'dark' ? '#2e2e2e' : '#ededed',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: theme === 'dark' ? 'hsl(var(--accent-foreground))' : 'hsl(var(--accent-foreground))',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: theme === 'dark' ? 'white' : 'black',
    ':hover': {
      backgroundColor: '#ff6161',
      color: 'white',
    },
  }),
});
export function ProfileForm() {
  const { user } = useUser()
  const { data: profile, isLoading } = useProfile(user?.sub as string)
  const updateProfile = useUpdateProfile()
  const { toast } = useToast()
  const { theme } = useTheme();
  console.log(profile)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      userName: '',
      fullName: '',
      email: '',
      bio: '',
      avatarUrl: '',
      personalWebsite: '',
      socialLinks: [],
      jobTitle: '',
      company: '',
      yearsOfExperience: undefined,
      specializations: [],
      skills: [],
      interests: [],
      academicBackground: undefined,
      projectHighlights: [],
    },
  })

  // Add debounced username check
  const checkUsername = useCallback(async (username: string) => {
    if (!username) return true
    try {
      const response = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`)
      const { available } = await response.json()
      return available || 'This username is already taken'
    } catch (error) {
      return true // Allow client-side validation to pass on error
    }
  }, [])

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      form.reset({
        userName: profile.userName || '',
        fullName: profile.fullName || '',
        email: profile.email || '',
        bio: profile.bio || '',
        avatarUrl: profile.avatarUrl || '',
        personalWebsite: profile.personalWebsite || '',
        socialLinks: Array.isArray(profile.socialLinks) ? profile.socialLinks : [],
        jobTitle: profile.jobTitle || '',
        company: profile.company || '',
        yearsOfExperience: profile.yearsOfExperience || undefined,
        specializations: Array.isArray(profile.specializations) 
          ? profile.specializations.map(item => ({ value: item, label: item }))
          : [],
        skills: Array.isArray(profile.skills)
          ? profile.skills.map(createOption)
          : [],
        interests: Array.isArray(profile.interests)
          ? profile.interests.map(createOption)
          : [],
        academicBackground: profile.academicBackground || undefined,
        projectHighlights: Array.isArray(profile.projectHighlights) 
          ? (profile.projectHighlights as Array<{
              title: string;
              description: string;
              url?: string;
              technologies?: string[];
            }>) 
          : [],
      })
    }
  }, [profile, form])

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Validate all social links before submission
      const validatedSocialLinks = data.socialLinks?.map(link => {
        const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
        const handle = link.url.replace(platform?.baseUrl || '', '');
        const sanitizedHandle = sanitizeHandle(handle);
        return {
          platform: link.platform,
          url: platform?.baseUrl + sanitizedHandle
        };
      });

      await updateProfile.mutateAsync({
        id: profile?.id as string,
        userId: user?.sub as string,
        userName: data.userName,
        email: data.email,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl || null,
        bio: data.bio || null,
        personalWebsite: data.personalWebsite ? new URL(data.personalWebsite).toString() : null,
        socialLinks: validatedSocialLinks || null,
        jobTitle: data.jobTitle || null,
        company: data.company || null,
        yearsOfExperience: data.yearsOfExperience || null,
        specializations: data.specializations?.map(item => item.value) || null,
        skills: data.skills?.map(item => item.value) || null,
        interests: data.interests?.map(item => item.value) || null,
        academicBackground: data.academicBackground || null,
        projectHighlights: data.projectHighlights || null,
        billingAddress: null,
        paymentMethod: null,
        createdAt: null,
        updatedAt: null,
      })
      toast({
        variant: 'default',
        title: 'Profile updated successfully',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to update profile',
        description: error?.message as string,
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6 mb-6">
              {form.watch('avatarUrl') && (
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={form.watch('avatarUrl')}
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {profile?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your-username" 
                      {...field}
                      onChange={async (e) => {
                        field.onChange(e)
                        const result = await checkUsername(e.target.value)
                        if (typeof result === 'string') {
                          form.setError('userName', { message: result })
                        } else {
                          form.clearErrors('userName')
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      {...field} 
                      disabled
                      className="opacity-60 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0}
                      placeholder="5" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specializations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specializations</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isMulti
                      value={field.value || []}
                      onChange={(newValue) => {
                        field.onChange(newValue || []);
                      }}
                      styles={getSelectStyles(theme as 'light' | 'dark')}
                      placeholder="Select or type to add specializations"
                      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                      components={{
                        DropdownIndicator: null,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isMulti
                      value={field.value || []}
                      onChange={(newValue) => {
                        field.onChange(newValue || []);
                      }}
                      styles={getSelectStyles(theme as 'light' | 'dark')}
                      placeholder="Select or type to add skills"
                      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                      components={{
                        DropdownIndicator: null,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isMulti
                      value={field.value || []}
                      onChange={(newValue) => {
                        field.onChange(newValue || []);
                      }}
                      styles={getSelectStyles(theme as 'light' | 'dark')}
                      placeholder="Select or type to add interests"
                      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                      components={{
                        DropdownIndicator: null,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Social Links</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentLinks = form.getValues("socialLinks") || [];
                    const unusedPlatforms = SOCIAL_PLATFORMS.filter(
                      platform => !currentLinks.some(link => link.platform === platform.id)
                    );
                    
                    if (unusedPlatforms.length > 0) {
                      form.setValue("socialLinks", [
                        ...currentLinks,
                        { platform: unusedPlatforms[0].id, url: "" }
                      ]);
                    }
                  }}
                  disabled={form.watch("socialLinks")?.length === SOCIAL_PLATFORMS.length}
                >
                  Add Link
                </Button>
              </div>
              
              {form.watch("socialLinks")?.map((_, index) => (
                <div key={index} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex">
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue(`socialLinks.${index}.url`, '');
                              }}
                            >
                              {SOCIAL_PLATFORMS.map((platform) => {
                                const isUsed = form
                                  .watch("socialLinks")
                                  ?.some((link, i) => 
                                    i !== index && link.platform === platform.id
                                  );
                                if (isUsed && field.value !== platform.id) return null;
                                
                                return (
                                  <option key={platform.id} value={platform.id}>
                                    {platform.name}
                                  </option>
                                );
                              })}
                            </select>
                            {field.value && (
                              <div className="flex items-center px-3">
                                {(() => {
                                  const Icon = SOCIAL_PLATFORMS.find(p => p.id === field.value)?.icon;
                                  return Icon && <Icon size={20} />;
                                })()}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.url`}
                    render={({ field }) => {
                      const platform = SOCIAL_PLATFORMS.find(
                        p => p.id === form.watch(`socialLinks.${index}.platform`)
                      );
                      
                      return (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="relative flex w-full rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                              <span className="w-fit flex items-center pl-3 text-sm text-muted-foreground whitespace-nowrap">
                                {platform?.baseUrl}
                              </span>
                              <Input 
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder={platform?.placeholder}
                                value={field.value.replace(platform?.baseUrl || '', '')}
                                onChange={(e) => {
                                  const sanitizedHandle = sanitizeHandle(e.target.value);
                                  field.onChange(platform?.baseUrl + sanitizedHandle);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const currentLinks = form.getValues("socialLinks");
                      form.setValue(
                        "socialLinks",
                        currentLinks?.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 