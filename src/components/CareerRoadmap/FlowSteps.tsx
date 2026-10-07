import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

/** Step-by-step flow (e.g. Class 10 → … → Career). Vertical on mobile, horizontal on large screens. */
export function FlowSteps({ steps, accent = 'from-saffron to-leaf' }: { steps: string[]; accent?: string }) {
  return (
    <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass relative w-full p-4 text-center lg:min-h-28 lg:place-content-center"
          >
            <span className={`mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${accent} text-sm font-bold text-ink-950`}>
              {i + 1}
            </span>
            <p className="font-semibold text-white">{step}</p>
          </motion.div>
          {i < steps.length - 1 && (
            <>
              <ArrowDown className="h-5 w-5 shrink-0 text-marigold lg:hidden" aria-hidden="true" />
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-marigold lg:block" aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ol>
  )
}
