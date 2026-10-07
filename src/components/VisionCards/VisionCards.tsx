import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { visionPillars } from '../../data/vision'
import { useT } from '../../hooks/useLocalized'
import { Icon } from '../common/Icon'
import { Reveal } from '../common/Section'

export function VisionCards({ detailed = false }: { detailed?: boolean }) {
  const { t } = useTranslation()
  const { list } = useT()
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visionPillars.map((p, i) => (
        <li key={p.id}>
          <Reveal
            delay={(i % 4) * 0.06}
            className="glass group relative h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-6"
          >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${p.accent} opacity-10 blur-2xl transition group-hover:opacity-25`} />
            {/* Mobile: icon beside text to keep the list short. sm+: stacked card. */}
            <div className="flex items-start gap-4 sm:block">
              <div className="flex shrink-0 items-center justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${p.accent} text-ink-950 shadow-lg sm:h-12 sm:w-12`}>
                  <Icon name={p.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="hidden font-display text-3xl font-bold text-white/10 sm:inline">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold sm:mt-5 sm:text-xl">{t(`vision.pillars.${p.id}.title`)}</h3>
                <p className="mt-1 text-sm text-slate-400 sm:mt-2">{t(`vision.pillars.${p.id}.desc`)}</p>
              </div>
            </div>
            {detailed && (
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {list(`vision.pillars.${p.id}.points`).map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
