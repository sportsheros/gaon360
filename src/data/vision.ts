import type { IconName } from '../components/common/Icon'

export const visionPillars: { id: string; icon: IconName; accent: string }[] = [
  { id: 'education', icon: 'GraduationCap', accent: 'from-amber-400 to-orange-500' },
  { id: 'healthcare', icon: 'HeartPulse', accent: 'from-rose-400 to-pink-500' },
  { id: 'employment', icon: 'Briefcase', accent: 'from-sky-400 to-blue-500' },
  { id: 'infrastructure', icon: 'Construction', accent: 'from-slate-300 to-slate-500' },
  { id: 'women', icon: 'Users', accent: 'from-fuchsia-400 to-purple-500' },
  { id: 'seniors', icon: 'HandHeart', accent: 'from-orange-300 to-amber-500' },
  { id: 'agriculture', icon: 'Wheat', accent: 'from-lime-400 to-green-500' },
  { id: 'environment', icon: 'Leaf', accent: 'from-emerald-400 to-teal-500' },
]

export type FocusId = 'education' | 'youth' | 'seniors' | 'women' | 'farmers'

/** Focus pages: icons per section, text in locales under focus.<id>. */
export const focusPages: Record<FocusId, { path: string; navKey: string; icon: IconName; icons: IconName[]; accent: string }> = {
  education: {
    path: '/education',
    navKey: 'education',
    icon: 'GraduationCap',
    icons: ['BookOpen', 'Compass', 'Laptop', 'Trophy', 'Target', 'Award', 'Lightbulb', 'Wrench'],
    accent: 'from-amber-400 to-orange-500',
  },
  youth: {
    path: '/youth',
    navKey: 'youth',
    icon: 'Rocket',
    icons: ['Wrench', 'Laptop', 'Rocket', 'MapPin', 'Landmark', 'Compass', 'Store', 'BadgeIndianRupee'],
    accent: 'from-sky-400 to-blue-500',
  },
  seniors: {
    path: '/senior-citizens',
    navKey: 'seniors',
    icon: 'HandHeart',
    icons: ['HandHeart', 'Stethoscope', 'FileText', 'Wallet', 'Siren', 'CalendarHeart', 'Smartphone'],
    accent: 'from-orange-300 to-amber-500',
  },
  women: {
    path: '/women',
    navKey: 'women',
    icon: 'Users',
    icons: ['Users', 'Scissors', 'Home', 'Rocket', 'Smartphone', 'PiggyBank', 'FileText', 'ShieldCheck'],
    accent: 'from-fuchsia-400 to-purple-500',
  },
  farmers: {
    path: '/farmers',
    navKey: 'farmers',
    icon: 'Wheat',
    icons: ['Sprout', 'Droplets', 'FlaskConical', 'Info', 'FileText', 'GraduationCap', 'Handshake'],
    accent: 'from-lime-400 to-green-500',
  },
}

export const focusOrder: FocusId[] = ['education', 'youth', 'seniors', 'women', 'farmers']
