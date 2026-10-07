import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { focusOrder, focusPages } from '../../data/vision'
import { Icon } from './Icon'
import { Reveal } from './Section'

/** Home-page cards linking to the five audience pages. */
export function FocusGrid() {
  const { t } = useTranslation()
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {focusOrder.map((id, i) => {
        const f = focusPages[id]
        return (
          <li key={id}>
            <Reveal delay={i * 0.06} className="h-full">
              <Link
                to={f.path}
                className="glass group flex h-full items-center gap-4 p-5 transition hover:-translate-y-1 hover:border-white/25 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} text-ink-950 sm:h-12 sm:w-12`}>
                  <Icon name={f.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="min-w-0 flex-1 sm:flex sm:flex-col">
                  <h3 className="text-lg font-bold sm:mt-5">{t(`nav.${f.navKey}`)}</h3>
                  <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:flex-1">{t(`home.focus.${id}`)}</p>
                  <span className="mt-4 hidden items-center gap-1 text-sm font-semibold text-marigold sm:inline-flex">
                    {t('common.learnMore')}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-marigold sm:hidden" aria-hidden="true" />
              </Link>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
