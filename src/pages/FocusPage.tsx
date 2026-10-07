import { useTranslation } from 'react-i18next'
import { Info, Quote } from 'lucide-react'
import { PageHeader, Reveal, Section, SectionHeading } from '../components/common/Section'
import { FlowSteps } from '../components/CareerRoadmap/FlowSteps'
import { Icon } from '../components/common/Icon'
import { focusPages, type FocusId } from '../data/vision'
import { useT } from '../hooks/useLocalized'
import { useSeo } from '../hooks/useSeo'

/**
 * Shared layout for the audience pages (Children & Career, Youth, Seniors, Women, Farmers).
 * Content comes from locales under focus.<id>; icons and accent from data/vision.ts.
 */
export function FocusPage({ id }: { id: FocusId }) {
  const config = focusPages[id]
  useSeo(config.navKey)
  const { t } = useTranslation()
  const { list } = useT()
  const sections = list<{ title: string; desc: string }>(`focus.${id}.sections`)

  return (
    <>
      <PageHeader eyebrow={t(`focus.${id}.eyebrow`)} title={t(`focus.${id}.title`)}>
        <Reveal className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-marigold/20 bg-marigold/5 p-5 text-left">
          <Quote className="h-6 w-6 shrink-0 text-marigold" aria-hidden="true" />
          <p className="text-lg text-slate-200">{t(`focus.${id}.objective`)}</p>
        </Reveal>
      </PageHeader>

      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 4) * 0.06} className="glass group h-full p-6 transition hover:-translate-y-1 hover:border-white/20">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${config.accent} text-ink-950`}>
                  <Icon name={config.icons[i] ?? config.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
                <p className="mt-1.5 text-sm text-slate-400">{s.desc}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading title={t(`focus.${id}.flowTitle`)} />
        <div className="mt-10">
          <FlowSteps steps={list(`focus.${id}.flow`)} accent={config.accent} />
        </div>
        <p className="mx-auto mt-10 flex max-w-2xl items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden="true" />
          {t(`focus.${id}.note`)}
        </p>
      </Section>
    </>
  )
}
