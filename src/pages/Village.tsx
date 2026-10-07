import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Reveal, Section, SectionHeading } from '../components/common/Section'
import { Statistics } from '../components/Statistics/Statistics'
import { Icon } from '../components/common/Icon'
import { galleryItems, village } from '../data/village'
import { useLocalized, useT } from '../hooks/useLocalized'
import { useSeo } from '../hooks/useSeo'

const Village3D = lazy(() => import('../components/Village3D/Village3D'))

export default function Village() {
  useSeo('village')
  const { t } = useTranslation()
  const { list } = useT()
  const L = useLocalized()

  const facts = [
    ['name', L(village.name)],
    ['panchayat', L(village.gramPanchayat)],
    ['block', L(village.block)],
    ['tehsil', L(village.tehsil)],
    ['district', L(village.district)],
    ['state', L(village.state)],
    ['pincode', village.pincode],
    ['area', `${village.areaHectares} ha`],
    ['literacy', `${village.literacyRate}%`],
  ] as const

  return (
    <>
      <PageHeader eyebrow={t('village.eyebrow')} title={t('village.title')} subtitle={t('village.subtitle')} />

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal className="glass p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{t('village.introTitle')}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {facts.map(([key, value]) => (
                <div key={key} className="rounded-xl bg-white/[0.03] p-3">
                  <dt className="text-xs text-slate-400">{t(`village.fields.${key}`)}</dt>
                  <dd className="mt-0.5 font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 text-lg font-bold">{t('village.geoTitle')}</h3>
            <p className="mt-2 text-slate-300">{t('village.geo')}</p>
          </Reveal>
          <Suspense fallback={<div className="h-[420px] rounded-3xl bg-ink-800" />}>
            <Village3D />
          </Suspense>
        </div>
      </Section>

      <Statistics showHeading={false} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title={t('village.historyTitle')} />
            <div className="mt-6 space-y-4 border-l-2 border-marigold/40 pl-6">
              {list('village.history').map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-slate-300">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading align="left" title={t('village.cultureTitle')} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {list<{ title: string; desc: string }>('village.culture').map((c, i) => (
                <li key={c.title}>
                  <Reveal delay={i * 0.06} className="glass h-full p-5">
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title={t('village.galleryTitle')} subtitle={t('village.gallerySubtitle')} />
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {galleryItems.map((g, i) => (
            <li key={g.id} className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
              <Reveal delay={i * 0.05} className="h-full">
                <figure
                  className="group relative grid aspect-[4/3] h-full w-full place-items-center overflow-hidden rounded-2xl border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, hsl(${g.hue} 70% 35% / 0.55), hsl(${(g.hue + 60) % 360} 60% 20% / 0.6))`,
                  }}
                >
                  {/* Replace with <img src="/images/..." alt="..." loading="lazy" /> once photos are available */}
                  <Icon name={g.icon} className="h-12 w-12 text-white/40 transition group-hover:scale-110" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-semibold text-white">
                    {t(`village.gallery.${g.id}`)}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
