import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, ChevronDown, Menu, Search, X } from 'lucide-react'
import { navItems, primaryNav } from '../../data/navigation'
import { LanguageSwitch } from './LanguageSwitch'

interface NavbarProps {
  onSearch: () => void
  onAssistant: () => void
}

export function Navbar({ onSearch, onAssistant }: NavbarProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    const onDown = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMoreOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  const primary = navItems.filter((n) => primaryNav.includes(n.key))
  const more = navItems.filter((n) => !primaryNav.includes(n.key))
  const moreActive = more.some((n) => n.path === pathname)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-full px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
      isActive ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center gap-3 sm:h-20" aria-label="Main">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="GAON 360 – Home">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            GAON <span className="text-gradient">360</span>
          </span>
        </Link>

        <ul className="ml-6 hidden items-center gap-1 xl:flex">
          {primary.map((item) => (
            <li key={item.key}>
              <NavLink to={item.path} end={item.path === '/'} className={linkClass}>
                {t(`nav.${item.key}`)}
              </NavLink>
            </li>
          ))}
          <li className="relative" ref={moreRef}>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((v) => !v)}
              className={linkClass({ isActive: moreActive }) + ' inline-flex items-center gap-1'}
            >
              {t('nav.more')}
              <ChevronDown className={`h-4 w-4 transition ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="glass-strong absolute left-0 top-full mt-2 w-64 p-2 shadow-2xl"
                >
                  {more.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                        }
                      >
                        {t(`nav.${item.key}`)}
                      </NavLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="grid h-11 w-11 place-items-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white lg:flex lg:w-auto lg:gap-2 lg:border lg:border-white/10 lg:px-4"
            aria-label={t('header.search')}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="hidden text-sm lg:inline">{t('header.search')}</span>
            <kbd className="hidden rounded border border-white/15 px-1.5 text-[10px] text-slate-500 lg:inline">/</kbd>
          </button>
          <LanguageSwitch className="hidden sm:flex" />
          <button
            type="button"
            onClick={onAssistant}
            className="btn-primary hidden !min-h-10 !px-4 !py-2 !text-sm md:inline-flex"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
            {t('header.assistant')}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
            aria-label={mobileOpen ? t('header.close') : t('header.menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-y-auto border-t border-white/10 bg-ink-900/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x py-6">
              <div className="mb-6 flex flex-wrap items-center gap-3 sm:hidden">
                <LanguageSwitch />
              </div>
              <ul className="grid gap-1 sm:grid-cols-2">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `flex min-h-12 items-center rounded-xl px-4 text-base font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`
                      }
                    >
                      {t(`nav.${item.key}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  onAssistant()
                }}
                className="btn-primary mt-6 w-full md:hidden"
              >
                <Bot className="h-5 w-5" aria-hidden="true" />
                {t('ai.button')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
