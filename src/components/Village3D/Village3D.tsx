import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Hand, Move3d, X } from 'lucide-react'
import { landmarks, type LandmarkId } from '../../data/village'
import { useIsMobile, useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery'
import { VillageScene } from './VillageScene'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

interface Village3DProps {
  className?: string
  /** Height classes for the canvas container. */
  heightClass?: string
}

export default function Village3D({ className = '', heightClass = 'h-[420px] sm:h-[520px]' }: Village3DProps) {
  const { t, i18n } = useTranslation()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<LandmarkId | null>(null)
  const [webgl] = useState(hasWebGL)
  const [inView, setInView] = useState(true)
  // On touch screens the canvas would swallow page scrolling, so 3D controls stay locked until the user taps in.
  const isTouch = useMediaQuery('(pointer: coarse)')
  const [touchActive, setTouchActive] = useState(false)
  const locked = webgl && isTouch && !touchActive
  const containerRef = useRef<HTMLDivElement>(null)

  // Pause rendering when the canvas is off-screen to save battery on mobile.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const labels = useMemo(
    () =>
      Object.fromEntries(landmarks.map((l) => [l.id, t(`village3d.locations.${l.id}.name`)])) as Record<LandmarkId, string>,
    [t, i18n.language],
  )

  const current = landmarks.find((l) => l.id === selected)
  const numberFmt = new Intl.NumberFormat(i18n.language === 'hi' ? 'hi-IN' : 'en-IN')

  return (
    <div className={`min-w-0 ${className}`}>
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/40 ${heightClass}`}
      >
        {webgl ? (
          <Suspense
            fallback={
              <div className="grid h-full place-items-center text-sm text-slate-400">{t('village3d.loading')}</div>
            }
          >
            <Canvas
              shadows={!isMobile}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              frameloop={inView ? 'always' : 'never'}
              camera={{ position: isMobile ? [23, 21, 26] : [18, 16, 20], fov: isMobile ? 50 : 40, near: 0.1, far: 200 }}
              gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
              aria-label={t('village3d.title')}
              role="img"
            >
              <VillageScene
                selected={selected}
                onSelect={setSelected}
                labels={labels}
                lowPower={isMobile}
                animate={!reducedMotion}
              />
            </Canvas>
          </Suspense>
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-leaf/20 via-ink-800 to-saffron/20 p-6 text-center text-slate-300">
            {t('village3d.fallback')}
          </div>
        )}

        {locked && (
          <button
            type="button"
            onClick={() => setTouchActive(true)}
            className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-ink-950/60 via-transparent to-transparent pb-5"
            style={{ touchAction: 'pan-y' }}
          >
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-ink-900/85 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur">
              <Move3d className="h-4 w-4 text-marigold" aria-hidden="true" />
              {t('village3d.tapToExplore')}
            </span>
          </button>
        )}

        {webgl && isTouch && touchActive && (
          <button
            type="button"
            onClick={() => setTouchActive(false)}
            className="absolute right-3 top-3 z-10 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink-900 shadow-lg"
          >
            <Check className="h-4 w-4" aria-hidden="true" /> {t('village3d.done')}
          </button>
        )}

        {webgl && !selected && !locked && (
          <div className="pointer-events-none absolute left-3 top-3 hidden max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full bg-ink-900/70 px-3 py-1.5 text-xs text-slate-300 backdrop-blur sm:flex">
            <Hand className="h-3.5 w-3.5 text-marigold" aria-hidden="true" />
            {t('hero.hint')}
          </div>
        )}

        <AnimatePresence>
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="glass-strong absolute inset-x-3 bottom-3 z-20 p-4 shadow-2xl sm:inset-x-auto sm:left-4 sm:bottom-4 sm:w-80"
              role="region"
              aria-live="polite"
              aria-label={labels[current.id]}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label={t('village3d.close')}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 pr-8">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: current.color }} aria-hidden="true" />
                <h3 className="text-lg font-bold">{labels[current.id]}</h3>
              </div>
              <p className="mt-1 text-sm text-slate-300">{t(`village3d.locations.${current.id}.desc`)}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2">
                {current.facts.map((f) => (
                  <div key={f.key} className="rounded-xl bg-white/5 p-2 text-center">
                    <dd className="font-display text-xl font-bold text-white">
                      {typeof f.value === 'number' ? numberFmt.format(f.value) : f.value}
                    </dd>
                    <dt className="text-[11px] leading-tight text-slate-400">{t(`village3d.facts.${f.key}`)}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[11px] text-slate-500">{t('village3d.staticNote')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Keyboard / screen-reader accessible list of places */}
      <div className="mt-3">
        <h3 className="sr-only">{t('village3d.places')}</h3>
        <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
          {landmarks.map((l) => (
            <li key={l.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={selected === l.id}
                onClick={() => setSelected(selected === l.id ? null : l.id)}
                className={`flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-sm transition ${
                  selected === l.id
                    ? 'border-white/40 bg-white/15 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                {labels[l.id]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
