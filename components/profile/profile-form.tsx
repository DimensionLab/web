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

const sanitizeHandle = (handle: string): string => {
  return handle
    .trim()
    .toLowerCase()
    .replace(/[^\w-]/g, '')
    .replace(/^-+|-+$/g, '');
};

export function ProfileForm() {
  const { user } = useUser()
  const { data: profile, isLoading } = useProfile(user?.sub as string)
  const updateProfile = useUpdateProfile()
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      full_name: '',
      email: '',
      bio: '',
      avatar_url: '',
      website: '',
      social_links: [],
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
        username: profile.username || '',
        full_name: profile.full_name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        website: profile.website || '',
        social_links: profile.social_links || [],
      })
    }
  }, [profile, form])

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Validate all social links before submission
      const validatedSocialLinks = data.social_links?.map(link => {
        const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
        const handle = link.url.replace(platform?.baseUrl || '', '');
        const sanitizedHandle = sanitizeHandle(handle);
        return {
          platform: link.platform,
          url: platform?.baseUrl + sanitizedHandle
        };
      });

      await updateProfile.mutateAsync({
        id: user?.sub as string,
        created_at: null,
        updated_at: null,
        bio: data.bio || null,
        avatar_url: data.avatar_url || null,
        website: data.website || null,
        social_links: validatedSocialLinks || null,
        ...data,
      })
      toast({
        variant: 'default',
        title: 'Profile updated successfully',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update profile',
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
              {form.watch('avatar_url') && (
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={form.watch('avatar_url')}
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <FormField
                control={form.control}
                name="avatar_url"
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
              name="username"
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
                          form.setError('username', { message: result })
                        } else {
                          form.clearErrors('username')
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
              name="full_name"
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
              name="website"
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Social Links</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentLinks = form.getValues("social_links") || [];
                    const unusedPlatforms = SOCIAL_PLATFORMS.filter(
                      platform => !currentLinks.some(link => link.platform === platform.id)
                    );
                    
                    if (unusedPlatforms.length > 0) {
                      form.setValue("social_links", [
                        ...currentLinks,
                        { platform: unusedPlatforms[0].id, url: "" }
                      ]);
                    }
                  }}
                  disabled={form.watch("social_links")?.length === SOCIAL_PLATFORMS.length}
                >
                  Add Link
                </Button>
              </div>
              
              {form.watch("social_links")?.map((_, index) => (
                <div key={index} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`social_links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex">
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue(`social_links.${index}.url`, '');
                              }}
                            >
                              {SOCIAL_PLATFORMS.map((platform) => {
                                const isUsed = form
                                  .watch("social_links")
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
                    name={`social_links.${index}.url`}
                    render={({ field }) => {
                      const platform = SOCIAL_PLATFORMS.find(
                        p => p.id === form.watch(`social_links.${index}.platform`)
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
                      const currentLinks = form.getValues("social_links");
                      form.setValue(
                        "social_links",
                        currentLinks.filter((_, i) => i !== index)
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