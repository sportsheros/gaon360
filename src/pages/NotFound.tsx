import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo('notFound')
  const { t } = useTranslation()
  return (
    <section className="container-x grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-3xl font-bold">{t('common.notFound')}</h1>
        <p className="mt-2 text-slate-400">{t('common.notFoundText')}</p>
        <Link to="/" className="btn-primary mt-8">
          {t('common.backHome')}
        </Link>
      </div>
    </section>
  )
}
