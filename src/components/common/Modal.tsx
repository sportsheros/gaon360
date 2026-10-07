import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  closeLabel: string
  children: ReactNode
  position?: 'top' | 'right'
}

/** Accessible dialog: Escape closes, focus moves inside and returns to the trigger. */
export function Modal({ open, onClose, label, closeLabel, children, position = 'top' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      const target = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panelRef.current
      target?.focus()
    })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [open, onClose])

  const panelClass =
    position === 'right'
      ? 'ml-auto h-full w-full max-w-md rounded-none sm:rounded-l-2xl'
      : 'mx-auto mt-[10vh] max-h-[80vh] w-[calc(100%-2rem)] max-w-2xl'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex bg-ink-950/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={`glass-strong relative flex flex-col overflow-hidden shadow-2xl outline-none ${panelClass} ${position === 'top' ? 'self-start' : ''}`}
            initial={position === 'right' ? { x: 40, opacity: 0 } : { y: -16, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={position === 'right' ? { x: 40, opacity: 0 } : { y: -16, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
