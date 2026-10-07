import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import hi from './locales/hi.json'
import en from './locales/en.json'

export const LANGUAGES = ['hi', 'en'] as const
export type Lang = (typeof LANGUAGES)[number]

const STORAGE_KEY = 'gaon360.lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'hi' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'hi'
}

i18n.use(initReactI18next).init({
  resources: { hi: { translation: hi }, en: { translation: en } },
  lng: initialLang(),
  fallbackLng: 'hi',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

function syncHtml(lng: string) {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* storage unavailable */
  }
}
syncHtml(i18n.language)
i18n.on('languageChanged', syncHtml)

export default i18n
