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
                className="glass group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-white/25"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} text-ink-950`}>
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t(`nav.${f.navKey}`)}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-400">{t(`home.focus.${id}`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-marigold">
                  {t('common.learnMore')}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
