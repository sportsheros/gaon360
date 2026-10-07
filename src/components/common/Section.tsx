import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', as = 'h2' }: SectionHeadingProps) {
  const Heading = as
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-marigold">{eyebrow}</p>
      )}
      <Heading className={as === 'h1' ? 'text-4xl font-bold sm:text-5xl lg:text-6xl' : 'text-3xl font-bold sm:text-4xl'}>
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-base text-slate-400 sm:text-lg">{subtitle}</p>}
    </motion.div>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`container-x py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  )
}

/** Hero-style header used at the top of inner pages. */
export function PageHeader({ eyebrow, title, subtitle, children }: SectionHeadingProps & { children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_0%,rgb(245_158_11/0.15),transparent)]" />
      <div className="container-x relative pb-14 pt-32 sm:pb-20 sm:pt-40">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </header>
  )
}

/** Fade-up wrapper for staggered grid items. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
