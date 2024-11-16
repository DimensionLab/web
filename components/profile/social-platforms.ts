import { Github, Twitter, Linkedin, Facebook } from "lucide-react"

export const SOCIAL_PLATFORMS = [
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      icon: Twitter,
      baseUrl: 'https://x.com/',
      placeholder: 'username (without @)'
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: Github,
      baseUrl: 'https://github.com/',
      placeholder: 'username'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin,
      baseUrl: 'https://linkedin.com/in/',
      placeholder: 'profile-id'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook,
      baseUrl: 'https://facebook.com/',
      placeholder: 'username'
    },
  ] as const;