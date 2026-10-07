import { useTranslation } from 'react-i18next'
import type { Localized } from '../data/village'

/** Picks the current-language value from a `{ hi, en }` object. */
export function useLocalized() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'hi'
  return (value: Localized) => value[lang]
}

/** Typed helper for arrays/objects stored in locale files. */
export function useT() {
  const { t, i18n } = useTranslation()
  const list = <T = string>(key: string): T[] => {
    const v = t(key, { returnObjects: true }) as unknown
    return Array.isArray(v) ? (v as T[]) : []
  }
  return { t, i18n, list }
}

export function formatNumber(n: number, lang: string) {
  return new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN').format(n)
}
