import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, MessageCircle } from 'lucide-react'
import { contactInfo, suggestionOptions } from '../../data/contact'
import { Icon } from '../common/Icon'
import { Section, SectionHeading } from '../common/Section'

/** Phase 1: nothing is stored – the selection can only be shared via WhatsApp. */
export function Suggestion() {
  const { t } = useTranslation()
  const [picked, setPicked] = useState<string[]>([])
  const [shared, setShared] = useState(false)

  const toggle = (id: string) => {
    setShared(false)
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  const message = t('suggestion.message', { list: picked.map((id) => t(`suggestion.options.${id}`)).join(', ') })
  const href = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <Section>
      <div className="glass relative overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-leaf/15 blur-3xl" />
        <SectionHeading eyebrow={t('suggestion.eyebrow')} title={t('suggestion.title')} subtitle={t('suggestion.subtitle')} />
        <fieldset className="mt-10">
          <legend className="sr-only">{t('suggestion.title')}</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {suggestionOptions.map((o) => {
              const on = picked.includes(o.id)
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(o.id)}
                  className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition ${
                    on
                      ? 'border-marigold bg-marigold/15 text-white shadow-lg shadow-saffron/10'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {on && <Check className="absolute right-2.5 top-2.5 h-4 w-4 text-marigold" aria-hidden="true" />}
                  <Icon name={o.icon} className="h-6 w-6" />
                  {t(`suggestion.options.${o.id}`)}
                </button>
              )
            })}
          </div>
        </fieldset>
        <div className="mt-8 flex flex-col items-center gap-3">
          {picked.length ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setShared(true)}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t('suggestion.submit')}
            </a>
          ) : (
            <button type="button" className="btn-primary cursor-not-allowed opacity-50" disabled>
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t('suggestion.submit')}
            </button>
          )}
          <p className="text-sm text-slate-400" aria-live="polite">
            {shared ? t('suggestion.thanks') : !picked.length ? t('suggestion.selectFirst') : ''}
          </p>
        </div>
      </div>
    </Section>
  )
}
