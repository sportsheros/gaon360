import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Bot } from 'lucide-react'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { SearchModal } from './components/Search/SearchModal'
import { AIAssistant } from './components/AIPlaceholder/AIAssistant'
import Home from './pages/Home'

// Code-split every page except Home.
const Village = lazy(() => import('./pages/Village'))
const Vision = lazy(() => import('./pages/Vision'))
const Development = lazy(() => import('./pages/Development'))
const Education = lazy(() => import('./pages/Education'))
const Youth = lazy(() => import('./pages/Youth'))
const Seniors = lazy(() => import('./pages/Seniors'))
const Women = lazy(() => import('./pages/Women'))
const Farmers = lazy(() => import('./pages/Farmers'))
const Manifesto = lazy(() => import('./pages/Manifesto'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { t } = useTranslation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const closeAi = useCallback(() => setAiOpen(false), [])

  // "/" or Ctrl/Cmd+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.closest('input, textarea, [contenteditable="true"]')
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900"
      >
        {t('header.skip')}
      </a>
      <ScrollToTop />
      <Navbar onSearch={() => setSearchOpen(true)} onAssistant={() => setAiOpen(true)} />

      <main id="main" className="min-h-screen">
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-slate-400">{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/village" element={<Village />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/development" element={<Development />} />
            <Route path="/education" element={<Education />} />
            <Route path="/youth" element={<Youth />} />
            <Route path="/senior-citizens" element={<Seniors />} />
            <Route path="/women" element={<Women />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Floating AI assistant button (mobile & tablet) */}
      <button
        type="button"
        onClick={() => setAiOpen(true)}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-saffron to-leaf text-ink-950 shadow-xl shadow-black/40 transition hover:scale-105 md:hidden"
        aria-label={t('header.assistant')}
      >
        <Bot className="h-6 w-6" aria-hidden="true" />
      </button>

      <SearchModal open={searchOpen} onClose={closeSearch} />
      <AIAssistant open={aiOpen} onClose={closeAi} />
    </MotionConfig>
  )
}
