import { Link, useLocation } from 'react-router-dom'
import { useLang, LANGUAGES } from '../LanguageContext'
import { useTheme } from '../ThemeContext'
import { t } from '../i18n'

export default function Header() {
  const location = useLocation()
  const { lang, setLang } = useLang()
  const { dark, toggle } = useTheme()

  const links = [
    { to: '/', label: t('nav.home', lang) },
    { to: '/works', label: t('nav.works', lang) },
    { to: '/blog', label: t('nav.blog', lang) },
    { to: '/about', label: t('nav.about', lang) },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">PoppyInNovember_11</Link>
        <nav className="nav">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <select
            className="lang-select"
            value={lang}
            onChange={e => setLang(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}