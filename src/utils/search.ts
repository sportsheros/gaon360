import type { TFunction } from 'i18next'
import { focusOrder, focusPages, visionPillars } from '../data/vision'
import { manifestoItems } from '../data/manifesto'
import { landmarks } from '../data/village'

export interface SearchEntry {
  title: string
  snippet: string
  path: string
  section: string
  /** Extra text (incl. other-language words) used only for matching. */
  haystack: string
}

/**
 * Builds a search index from the static locale content for the active language.
 * `tAlt` is the other language, so that typing "school" also matches Hindi content and vice versa.
 */
export function buildSearchIndex(t: TFunction, tAlt: TFunction): SearchEntry[] {
  const entries: SearchEntry[] = []
  const add = (path: string, section: string, titleKey: string, snippetKey: string) => {
    entries.push({
      path,
      section,
      title: t(titleKey),
      snippet: t(snippetKey),
      haystack: [t(titleKey), t(snippetKey), tAlt(titleKey), tAlt(snippetKey)].join(' '),
    })
  }
  const pages: [string, string][] = [
    ['/', 'home'],
    ['/village', 'village'],
    ['/vision', 'vision'],
    ['/development', 'development'],
    ['/manifesto', 'manifesto'],
    ['/about', 'about'],
    ['/contact', 'contact'],
  ]
  for (const [path, key] of pages) add(path, t(`nav.${key}`), `nav.${key}`, `meta.${key}.description`)

  for (const p of visionPillars) {
    add('/vision', t('nav.vision'), `vision.pillars.${p.id}.title`, `vision.pillars.${p.id}.desc`)
  }

  for (const id of focusOrder) {
    const { path, navKey } = focusPages[id]
    add(path, t(`nav.${navKey}`), `focus.${id}.title`, `focus.${id}.objective`)
    const sections = t(`focus.${id}.sections`, { returnObjects: true }) as unknown
    if (Array.isArray(sections)) {
      sections.forEach((_, i) =>
        add(path, t(`nav.${navKey}`), `focus.${id}.sections.${i}.title`, `focus.${id}.sections.${i}.desc`),
      )
    }
  }

  for (const m of manifestoItems) {
    add(`/manifesto#${m.id}`, t('nav.manifesto'), `manifesto.items.${m.id}.title`, `manifesto.items.${m.id}.vision`)
  }

  for (const l of landmarks) {
    add('/#village-3d', t('village3d.eyebrow'), `village3d.locations.${l.id}.name`, `village3d.locations.${l.id}.desc`)
  }

  for (const phase of ['days100', 'year1']) {
    add('/development', t('nav.development'), `development.phases.${phase}.title`, `development.phases.${phase}.period`)
  }

  return entries
}

const normalize = (s: string) => s.toLowerCase().normalize('NFC')

export function searchEntries(index: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return index
    .map((e) => {
      const title = normalize(e.title)
      const hay = normalize(e.haystack)
      let score = 0
      for (const term of terms) {
        if (!hay.includes(term)) return null
        score += title.includes(term) ? 3 : 1
      }
      return { e, score }
    })
    .filter((x): x is { e: SearchEntry; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e)
}
