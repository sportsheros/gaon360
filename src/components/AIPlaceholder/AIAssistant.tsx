import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bot, ChevronDown, Sparkles } from 'lucide-react'
import { Modal } from '../common/Modal'
import { useT } from '../../hooks/useLocalized'

/** Phase 1: static FAQ-style assistant. Phase 4 will replace the body with a real AI chat. */
export function AIAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const { list } = useT()
  const [expanded, setExpanded] = useState<number | null>(0)
  const faqs = list<{ q: string; a: string }>('ai.faqs')
  const future = list('ai.future')

  return (
    <Modal open={open} onClose={onClose} label={t('ai.title')} closeLabel={t('ai.close')} position="right">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="border-b border-white/10 bg-gradient-to-br from-saffron/15 to-leaf/10 p-6 pr-14">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-leaf text-ink-950">
              <Bot className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold">{t('ai.title')}</h2>
              <p className="text-sm text-marigold">{t('ai.comingSoon')}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300">{t('ai.intro')}</p>
        </div>

        <div className="flex-1 p-4">
          <h3 className="mb-3 px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">{t('ai.faqTitle')}</h3>
          <ul className="space-y-2">
            {faqs.map((f, i) => {
              const isOpen = expanded === i
              return (
                <li key={f.q} className="glass overflow-hidden">
                  <button
                    type="button"
                    data-autofocus={i === 0 ? true : undefined}
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-medium text-white"
                  >
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {isOpen && <p className="px-4 pb-4 text-sm text-slate-300">{f.a}</p>}
                </li>
              )
            })}
          </ul>

          <h3 className="mb-3 mt-8 px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">{t('ai.futureTitle')}</h3>
          <ol className="flex flex-col items-center gap-1 px-2">
            {future.map((step, i) => (
              <li key={step} className="flex flex-col items-center">
                <span className={`chip ${i === future.length - 1 ? 'border-marigold/40 text-marigold' : ''}`}>
                  {i === future.length - 1 && <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
                  {step}
                </span>
                {i < future.length - 1 && <span aria-hidden="true" className="text-slate-600">↓</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Modal>
  )
}
