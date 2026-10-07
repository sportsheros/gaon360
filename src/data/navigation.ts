export const navItems = [
  { key: 'home', path: '/' },
  { key: 'village', path: '/village' },
  { key: 'vision', path: '/vision' },
  { key: 'development', path: '/development' },
  { key: 'education', path: '/education' },
  { key: 'youth', path: '/youth' },
  { key: 'seniors', path: '/senior-citizens' },
  { key: 'women', path: '/women' },
  { key: 'farmers', path: '/farmers' },
  { key: 'manifesto', path: '/manifesto' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
] as const

export type NavKey = (typeof navItems)[number]['key']

/** Shown directly in the desktop bar; the rest go into the "More" menu. */
export const primaryNav: NavKey[] = ['home', 'village', 'vision', 'development', 'manifesto']
