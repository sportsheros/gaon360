import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import { longTermMilestones, roadmapPhases } from '../../data/roadmap'
import { useT } from '../../hooks/useLocalized'
import { Icon } from '../common/Icon'
import { Reveal } from '../common/Section'

/** Horizontal (desktop) / vertical (mobile) 5-year timeline. */
export function MilestoneTimeline() {
  const { t } = useTranslation()
  return (
    <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-saffron via-marigold to-leaf md:left-0 md:top-6 md:h-px md:w-full md:bg-gradient-to-r" aria-hidden="true" />
      {longTermMilestones.map((m, i) => (
        <li key={m.id} className="relative pl-16 md:pl-0 md:pt-16">
          <Reveal delay={i * 0.08}>
            <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink-800 text-marigold shadow-lg shadow-saffron/10 md:left-0">
              <Icon name={m.icon} className="h-5 w-5" />
            </span>
            <p className="font-display text-2xl font-bold text-gradient">{m.year}</p>
            <h3 className="mt-1 text-lg font-bold">{t(`development.milestones.${m.id}.title`)}</h3>
            <p className="mt-1 text-sm text-slate-400">{t(`development.milestones.${m.id}.desc`)}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

/** First 100 days & first year cards. */
export function PhaseCards() {
  const { t } = useTranslation()
  const { list } = useT()
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {roadmapPhases.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.1} className="glass relative h-full overflow-hidden p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-leaf text-ink-950">
              <Icon name={p.icon} className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-2xl font-bold">{t(`development.phases.${p.id}.title`)}</h3>
              <p className="text-sm text-marigold">{t(`development.phases.${p.id}.period`)}</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {list(`development.phases.${p.id}.items`).map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
