import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { Modal } from '../common/Modal'
import { buildSearchIndex, searchEntries } from '../../utils/search'

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const index = useMemo(() => {
    const alt = i18n.getFixedT(i18n.language === 'hi' ? 'en' : 'hi')
    return buildSearchIndex(t, alt)
  }, [t, i18n])

  const results = useMemo(() => searchEntries(index, query), [index, query])

  const go = (path: string) => {
    onClose()
    setQuery('')
    navigate(path)
  }

  return (
    <Modal open={open} onClose={onClose} label={t('search.title')} closeLabel={t('search.close')}>
      <form
        role="search"
        className="flex items-center gap-3 border-b border-white/10 px-5 py-4 pr-14"
        onSubmit={(e) => {
          e.preventDefault()
          if (results[0]) go(results[0].path)
        }}
      >
        <Search className="h-5 w-5 shrink-0 text-marigold" aria-hidden="true" />
        <label htmlFor="site-search" className="sr-only">
          {t('search.title')}
        </label>
        <input
          id="site-search"
          data-autofocus
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          autoComplete="off"
          className="w-full bg-transparent text-lg text-white placeholder:text-slate-500 focus:outline-none"
        />
      </form>
      <div className="overflow-y-auto p-3" aria-live="polite">
        {!query && <p className="px-3 py-6 text-center text-sm text-slate-400">{t('search.hint')}</p>}
        {query && results.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-slate-400">{t('search.noResults')}</p>
        )}
        {results.length > 0 && (
          <ul className="space-y-1">
            {results.map((r, i) => (
              <li key={`${r.path}-${i}`}>
                <button
                  type="button"
                  onClick={() => go(r.path)}
                  className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/5 focus-visible:bg-white/5"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-marigold">{r.section}</span>
                    <p className="font-semibold text-white">{r.title}</p>
                    <p className="line-clamp-1 text-sm text-slate-400">{r.snippet}</p>
                  </div>
                  <ArrowRight className="mt-5 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}
