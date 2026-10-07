import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Hero } from '../components/Hero/Hero'
import { Statistics } from '../components/Statistics/Statistics'
import { VisionCards } from '../components/VisionCards/VisionCards'
import { MilestoneTimeline } from '../components/Roadmap/Roadmap'
import { FocusGrid } from '../components/common/FocusGrid'
import { Reveal, Section, SectionHeading } from '../components/common/Section'
import { Suggestion } from '../components/Contact/Suggestion'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo('home')
  const { t } = useTranslation()

  return (
    <>
      <Hero />
      <Statistics />

      <Section>
        <SectionHeading eyebrow={t('home.pillarsEyebrow')} title={t('home.pillarsTitle')} subtitle={t('home.pillarsSubtitle')} />
        <div className="mt-12">
          <VisionCards />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t('home.focusEyebrow')} title={t('home.focusTitle')} subtitle={t('home.focusSubtitle')} />
        <div className="mt-12">
          <FocusGrid />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t('home.roadmapEyebrow')} title={t('home.roadmapTitle')} />
        <div className="mt-14">
          <MilestoneTimeline />
        </div>
        <div className="mt-10 text-center">
          <Link to="/development" className="btn-ghost">
            {t('home.roadmapCta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <Section>
        <Reveal className="relative overflow-hidden rounded-3xl border border-marigold/20 bg-gradient-to-br from-saffron/20 via-ink-800 to-leaf/20 p-8 text-center sm:p-14">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl">{t('home.manifestoTitle')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">{t('home.manifestoText')}</p>
          <Link to="/manifesto" className="btn-primary mt-8">
            {t('home.manifestoCta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>

      <Suggestion />
    </>
  )
}
