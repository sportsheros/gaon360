import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import { PageHeader, Section, SectionHeading } from '../components/common/Section'
import { MilestoneTimeline, PhaseCards } from '../components/Roadmap/Roadmap'
import { useSeo } from '../hooks/useSeo'

export default function Development() {
  useSeo('development')
  const { t } = useTranslation()
  return (
    <>
      <PageHeader eyebrow={t('development.eyebrow')} title={t('development.title')} subtitle={t('development.subtitle')} />
      <Section>
        <PhaseCards />
      </Section>
      <Section>
        <SectionHeading title={t('development.longTermTitle')} subtitle={t('development.longTermSubtitle')} />
        <div className="mt-14">
          <MilestoneTimeline />
        </div>
        <p className="mx-auto mt-12 flex max-w-2xl items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden="true" />
          {t('development.note')}
        </p>
      </Section>
    </>
  )
}
