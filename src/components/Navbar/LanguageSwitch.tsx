import { useTranslation } from 'react-i18next'

const options = [
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'English' },
] as const

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  return (
    <div
      role="group"
      aria-label={t('header.switchLang')}
      className={`flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-sm ${className}`}
    >
      {options.map((o, i) => {
        const active = i18n.language === o.code
        return (
          <span key={o.code} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="px-0.5 text-slate-600">|</span>}
            <button
              type="button"
              lang={o.code}
              aria-pressed={active}
              onClick={() => i18n.changeLanguage(o.code)}
              className={`min-h-9 rounded-full px-3 font-medium transition ${
                active ? 'bg-white text-ink-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              {o.label}
            </button>
          </span>
        )
      })}
    </div>
  )
}
