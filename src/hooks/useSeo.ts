import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://gaon360.in'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Sets title, description, Open Graph and canonical URL for the current page and language. */
export function useSeo(pageKey: string) {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const title = t(`meta.${pageKey}.title`)
    const description = t(`meta.${pageKey}.description`)
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:locale', i18n.language === 'hi' ? 'hi_IN' : 'en_IN')

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [pageKey, pathname, t, i18n.language])
}
