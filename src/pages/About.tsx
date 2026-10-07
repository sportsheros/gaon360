import { useTranslation } from 'react-i18next'
import { CheckCircle2, UserRound } from 'lucide-react'
import { PageHeader, Reveal, Section } from '../components/common/Section'
import { useT } from '../hooks/useLocalized'
import { useSeo } from '../hooks/useSeo'

const fields = ['education', 'experience', 'connection', 'contribution'] as const

export default function About() {
  useSeo('about')
  const { t } = useTranslation()
  const { list } = useT()

  return (
    <>
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.positioning')} />
      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <Reveal className="glass h-fit overflow-hidden lg:sticky lg:top-28">
            {/* Replace with <img src="/images/candidate.jpg" alt={t('about.photoAlt')} /> */}
            <div
              role="img"
              aria-label={t('about.photoAlt')}
              className="grid aspect-[4/5] place-items-center bg-gradient-to-br from-saffron/30 via-ink-800 to-leaf/30"
            >
              <UserRound className="h-28 w-28 text-white/30" aria-hidden="true" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{t('about.name')}</h2>
              <p className="text-marigold">{t('about.role')}</p>
            </div>
          </Reveal>

          <div className="space-y-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              {fields.map((f, i) => (
                <Reveal key={f} delay={i * 0.05} className="glass p-5">
                  <dt className="text-sm font-semibold uppercase tracking-wider text-marigold">{t(`about.fields.${f}`)}</dt>
                  <dd className="mt-2 text-slate-300">{t(`about.${f}`)}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal className="rounded-2xl border border-marigold/20 bg-gradient-to-br from-saffron/10 to-leaf/10 p-6 sm:p-8">
              <h2 className="text-2xl font-bold">{t('about.visionTitle')}</h2>
              <p className="mt-3 text-lg text-slate-200">{t('about.vision')}</p>
            </Reveal>

            <Reveal className="glass p-6 sm:p-8">
              <h2 className="text-2xl font-bold">{t('about.responsibilitiesTitle')}</h2>
              <ul className="mt-5 space-y-3">
                {list('about.responsibilities').map((r) => (
                  <li key={r} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
