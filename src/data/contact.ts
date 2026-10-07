import type { IconName } from '../components/common/Icon'

/** Placeholder contact details – replace before going live. */
export const contactInfo = {
  phone: '+910000000000',
  phoneDisplay: '+91 00000 00000',
  whatsapp: '910000000000',
  email: 'contact@gaon360.in',
  mapsQuery: 'Bathain Khurd, Chhata, Mathura, Uttar Pradesh 281403',
  social: [
    { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/' },
    { id: 'youtube', label: 'YouTube', url: 'https://youtube.com/' },
    { id: 'x', label: 'X', url: 'https://x.com/' },
  ],
}

export const suggestionOptions: { id: string; icon: IconName }[] = [
  { id: 'road', icon: 'Route' },
  { id: 'water', icon: 'Droplets' },
  { id: 'drainage', icon: 'Waves' },
  { id: 'streetlights', icon: 'Lightbulb' },
  { id: 'education', icon: 'GraduationCap' },
  { id: 'healthcare', icon: 'HeartPulse' },
  { id: 'employment', icon: 'Briefcase' },
  { id: 'cleanliness', icon: 'Sparkles' },
]
