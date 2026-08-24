import { useLang } from '../LanguageContext'
import { t } from '../i18n'

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} · {t('footer', lang)}</p>
    </footer>
  )
}