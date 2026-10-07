import { useTranslation } from 'react-i18next'
import { Globe, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { contactInfo } from '../../data/contact'
import { Reveal } from '../common/Section'

export function ContactCards() {
  const { t } = useTranslation()
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.mapsQuery)}`
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.mapsQuery)}&z=14&output=embed`

  const items = [
    { icon: Phone, label: t('contact.phone'), value: contactInfo.phoneDisplay, href: `tel:${contactInfo.phone}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: contactInfo.phoneDisplay, href: `https://wa.me/${contactInfo.whatsapp}` },
    { icon: Mail, label: t('contact.email'), value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue'), href: mapsUrl },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${contactInfo.phone}`} className="btn-primary flex-1">
            <Phone className="h-5 w-5" aria-hidden="true" /> {t('contact.callNow')}
          </a>
          <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn flex-1 bg-[#25D366] text-ink-950 hover:brightness-110">
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t('contact.whatsappBtn')}
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1">
            <Navigation className="h-5 w-5" aria-hidden="true" /> {t('contact.directions')}
          </a>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((it, i) => (
            <li key={it.label}>
              <Reveal delay={i * 0.05}>
                <a
                  href={it.href}
                  target={it.href.startsWith('http') ? '_blank' : undefined}
                  rel={it.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass flex h-full items-start gap-3 p-4 transition hover:border-white/25"
                >
                  <it.icon className="mt-0.5 h-5 w-5 shrink-0 text-marigold" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-slate-400">{it.label}</span>
                    <span className="block break-all font-semibold text-white">{it.value}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="glass p-4">
          <p className="mb-3 flex items-center gap-2 text-xs text-slate-400">
            <Globe className="h-4 w-4" aria-hidden="true" /> {t('contact.social')}
          </p>
          <ul className="flex flex-wrap gap-2">
            {contactInfo.social.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="chip min-h-10 px-4 hover:border-white/25 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass overflow-hidden">
        <p className="flex items-center gap-2 px-4 py-3 text-xs text-slate-400">
          <MapPin className="h-4 w-4" aria-hidden="true" /> {t('contact.location')}
        </p>
        <iframe
          title={t('contact.location')}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full border-0 lg:h-[calc(100%-2.75rem)] lg:min-h-96"
        />
      </div>
    </div>
  )
}
