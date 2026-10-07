import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUp, Mail, MessageCircle, Phone } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { focusOrder, focusPages } from '../../data/vision'
import { contactInfo } from '../../data/contact'

export function Footer() {
  const { t } = useTranslation()
  const quick = navItems.filter((n) => ['home', 'village', 'vision', 'development', 'manifesto', 'about', 'contact'].includes(n.key))

  return (
    <footer className="relative mt-10 border-t border-white/10 bg-ink-950/60">
      <div className="container-x py-14">
        <blockquote className="mx-auto mb-14 max-w-3xl text-center font-display text-xl font-semibold text-white sm:text-2xl">
          “{t('footer.coreMessage')}”
        </blockquote>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/favicon.svg" alt="" width={36} height={36} className="h-9 w-9" />
              <span className="font-display text-xl font-bold text-white">
                GAON <span className="text-gradient">360</span>
              </span>
            </Link>
            <p className="mt-2 font-medium text-marigold">{t('brand.tagline')}</p>
            <p className="text-sm text-slate-400">{t('brand.taglineEn')}</p>
            <p className="mt-4 text-sm text-slate-400">{t('footer.about')}</p>
          </div>

          <nav aria-label={t('footer.quickLinks')}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">{t('footer.quickLinks')}</h2>
            <ul className="space-y-2.5 text-sm">
              {quick.map((n) => (
                <li key={n.key}>
                  <Link to={n.path} className="text-slate-400 hover:text-white">
                    {t(`nav.${n.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.focusLinks')}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">{t('footer.focusLinks')}</h2>
            <ul className="space-y-2.5 text-sm">
              {focusOrder.map((id) => (
                <li key={id}>
                  <Link to={focusPages[id].path} className="text-slate-400 hover:text-white">
                    {t(`nav.${focusPages[id].navKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">{t('nav.contact')}</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {contactInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-slate-400 hover:text-white">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p>{t('footer.phase')}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 px-3 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> {t('common.backToTop')}
          </button>
        </div>
      </div>
    </footer>
  )
}
