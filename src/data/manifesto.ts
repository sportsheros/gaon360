import type { IconName } from '../components/common/Icon'

export type Priority = 'high' | 'medium' | 'long'
export type Timeline = 'd100' | 'y1' | 'y5'

export interface ManifestoItem {
  id: string
  icon: IconName
  priority: Priority
  timeline: Timeline
}

/** Text for each item lives in locales under manifesto.items.<id> (title, problem, vision, approach). */
export const manifestoItems: ManifestoItem[] = [
  { id: 'water', icon: 'Droplets', priority: 'high', timeline: 'd100' },
  { id: 'drainage', icon: 'Waves', priority: 'high', timeline: 'y1' },
  { id: 'roads', icon: 'Route', priority: 'high', timeline: 'y1' },
  { id: 'streetlights', icon: 'Lightbulb', priority: 'high', timeline: 'd100' },
  { id: 'school', icon: 'School', priority: 'high', timeline: 'y1' },
  { id: 'career', icon: 'Compass', priority: 'medium', timeline: 'y1' },
  { id: 'skills', icon: 'Wrench', priority: 'medium', timeline: 'y1' },
  { id: 'health', icon: 'HeartPulse', priority: 'medium', timeline: 'y1' },
  { id: 'seniors', icon: 'HandHeart', priority: 'high', timeline: 'd100' },
  { id: 'women', icon: 'Users', priority: 'medium', timeline: 'y1' },
  { id: 'farmers', icon: 'Wheat', priority: 'medium', timeline: 'y1' },
  { id: 'cleanliness', icon: 'Sparkles', priority: 'high', timeline: 'd100' },
  { id: 'green', icon: 'TreePine', priority: 'long', timeline: 'y5' },
  { id: 'transparency', icon: 'Eye', priority: 'high', timeline: 'd100' },
  { id: 'digital', icon: 'Wifi', priority: 'long', timeline: 'y5' },
]
