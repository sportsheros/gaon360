import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'framer-motion'
import { Baby, GraduationCap, HandHeart, House, Users, Wheat, type LucideIcon } from 'lucide-react'
import { statKeys, village, type StatKey } from '../../data/village'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { Reveal, Section, SectionHeading } from '../common/Section'

const statIcons: Record<StatKey, LucideIcon> = {
  population: Users,
  families: House,
  students: GraduationCap,
  seniorCitizens: HandHeart,
  farmers: Wheat,
  youth: Baby,
}

function CountUp({ value, lang }: { value: number; lang: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setDisplay(value)
      return
    }
    const start = performance.now()
    const duration = 1400
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])

  return (
    <span ref={ref} aria-label={String(value)}>
      {new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN').format(display)}
    </span>
  )
}

export function Statistics({ showHeading = true }: { showHeading?: boolean }) {
  const { t, i18n } = useTranslation()
  return (
    <Section>
      {showHeading && <SectionHeading eyebrow={t('stats.eyebrow')} title={t('stats.title')} subtitle={t('stats.subtitle')} />}
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 ${showHeading ? 'mt-12' : ''}`}>
        {statKeys.map((key, i) => {
          const Icon = statIcons[key]
          return (
            <li key={key}>
              <Reveal delay={i * 0.05} className="glass group h-full p-5 transition hover:-translate-y-1 hover:border-white/20">
                <Icon className="h-6 w-6 text-marigold transition group-hover:scale-110" aria-hidden="true" />
                <p className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                  <CountUp value={village[key]} lang={i18n.language} />
                </p>
                <p className="mt-1 text-sm text-slate-400">{t(`stats.${key}`)}</p>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
