import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, ScrollText } from 'lucide-react'

const Village3D = lazy(() => import('../Village3D/Village3D'))

export function Hero() {
  const { t } = useTranslation()
  const lines = [t('hero.line1'), t('hero.line2'), t('hero.line3')]

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-saffron/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-60 h-96 w-96 rounded-full bg-leaf/20 blur-3xl" />

      <div className="container-x relative grid items-center gap-10 pb-12 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pb-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="chip mb-6 border-marigold/30 text-marigold"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-marigold" aria-hidden="true" />
            {t('hero.badge')}
          </motion.span>

          <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.05] sm:text-6xl xl:text-7xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                className={`block ${i === 2 ? 'text-gradient pb-2' : ''}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-lg text-slate-300"
          >
            {t('hero.supporting')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link to="/vision" className="btn-primary">
              {t('hero.ctaVision')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/manifesto" className="btn-ghost">
              <ScrollText className="h-4 w-4" aria-hidden="true" /> {t('hero.ctaManifesto')}
            </Link>
            <a href="#village-3d" className="btn-ghost">
              <Compass className="h-4 w-4" aria-hidden="true" /> {t('hero.ctaExplore')}
            </a>
          </motion.div>
        </div>

        <motion.div
          id="village-3d"
          className="scroll-mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Suspense
            fallback={
              <div className="grid h-[360px] place-items-center rounded-3xl border border-white/10 bg-ink-800 text-sm text-slate-400 sm:h-[480px] lg:h-[560px]">
                {t('village3d.loading')}
              </div>
            }
          >
            <Village3D heightClass="h-[360px] sm:h-[480px] lg:h-[560px]" />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
