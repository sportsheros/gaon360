import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Clock, Compass, Eye, Flag } from 'lucide-react'
import { PageHeader, Section } from '../components/common/Section'
import { Icon } from '../components/common/Icon'
import { manifestoItems, type Priority } from '../data/manifesto'
import { useT } from '../hooks/useLocalized'
import { useSeo } from '../hooks/useSeo'

const priorityStyle: Record<Priority, string> = {
  high: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  long: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
}

const filters: (Priority | 'all')[] = ['all', 'high', 'medium', 'long']

export default function Manifesto() {
  useSeo('manifesto')
  const { t } = useTranslation()
  const { list } = useT()
  const { hash } = useLocation()
  const [filter, setFilter] = useState<Priority | 'all'>('all')

  const items = manifestoItems.filter((m) => filter === 'all' || m.priority === filter)

  // Scroll to a manifesto point when arriving via search (e.g. /manifesto#water).
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
  }, [hash])

  return (
    <>
      <PageHeader eyebrow={t('manifesto.eyebrow')} title={t('manifesto.title')} subtitle={t('manifesto.subtitle')}>
        <ol className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {list('manifesto.questions').map((q, i) => (
            <li key={q} className="glass p-4 text-center">
              <span className="font-display text-2xl font-bold text-gradient">{i + 1}</span>
              <p className="mt-1 text-sm font-semibold text-white">{q}</p>
            </li>
          ))}
        </ol>
      </PageHeader>

      <Section>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div role="group" aria-label={t('manifesto.filterLabel')} className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-10 rounded-full border px-4 text-sm font-medium transition ${
                  filter === f ? 'border-white bg-white text-ink-900' : 'border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
                }`}
              >
                {f === 'all' ? t('manifesto.filterAll') : t(`manifesto.priority.${f}`)}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400">{t('manifesto.count', { count: items.length })}</p>
        </div>

        <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.li
                key={m.id}
                id={m.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="glass flex scroll-mt-28 flex-col p-6 target:border-marigold"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-saffron to-leaf text-ink-950">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <h2 className="text-xl font-bold">{t(`manifesto.items.${m.id}.title`)}</h2>
                  </div>
                </div>

                <dl className="mt-5 flex-1 space-y-4 text-sm">
                  <div>
                    <dt className="flex items-center gap-1.5 font-semibold text-rose-300">
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" /> {t('manifesto.labels.problem')}
                    </dt>
                    <dd className="mt-1 text-slate-300">{t(`manifesto.items.${m.id}.problem`)}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 font-semibold text-marigold">
                      <Eye className="h-4 w-4" aria-hidden="true" /> {t('manifesto.labels.vision')}
                    </dt>
                    <dd className="mt-1 text-slate-300">{t(`manifesto.items.${m.id}.vision`)}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 font-semibold text-leaf">
                      <Compass className="h-4 w-4" aria-hidden="true" /> {t('manifesto.labels.approach')}
                    </dt>
                    <dd className="mt-1 text-slate-300">{t(`manifesto.items.${m.id}.approach`)}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  <span className={`chip ${priorityStyle[m.priority]}`}>
                    <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">{t('manifesto.labels.priority')}:</span>
                    {t(`manifesto.priority.${m.priority}`)}
                  </span>
                  <span className="chip">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">{t('manifesto.labels.timeline')}:</span>
                    {t(`manifesto.timeline.${m.timeline}`)}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-400">
          {t('manifesto.disclaimer')}
        </p>
      </Section>
    </>
  )
}
