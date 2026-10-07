import type { IconName } from '../components/common/Icon'

export const roadmapPhases: { id: 'days100' | 'year1'; icon: IconName }[] = [
  { id: 'days100', icon: 'ClipboardList' },
  { id: 'year1', icon: 'Hammer' },
]

/** Long-term milestones; years are configurable once the final manifesto is approved. */
export const longTermMilestones: { year: string; id: string; icon: IconName }[] = [
  { year: '2026', id: 'foundation', icon: 'Flag' },
  { year: '2027', id: 'education', icon: 'GraduationCap' },
  { year: '2028', id: 'employment', icon: 'Briefcase' },
  { year: '2029', id: 'smart', icon: 'Wifi' },
  { year: '2030/31', id: 'model', icon: 'Award' },
]
