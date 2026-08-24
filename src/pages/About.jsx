import { useState } from 'react'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import profile from '../data/profile'
import works from '../data/works'

export default function About() {
  const { lang } = useLang()
  const totalWorks = works.length
  const totalWords = works.reduce((sum, w) => sum + (w.content?.length || 0), 0)
  const [copied, setCopied] = useState(false)
  const isZh = lang === 'zh'

  function copyEmail() {
    navigator.clipboard.writeText(profile.social.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page about-page">
      <div className="about-header">
        <div className="about-avatar">
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <h1>{profile.name}</h1>
        <p className="about-tagline">{profile[`tagline_${lang}`] || profile.tagline_en || profile.tagline}</p>
      </div>

      <div className="about-body">
        <section className="about-section">
          <h2>{t('about.title', lang)}</h2>
          <p>{profile[`bio_${lang}`] || profile.bio_en || profile.bio}</p>
        </section>

        <section className="about-section">
          <h2>{t('about.skills', lang)}</h2>
          <div className="skill-tags">
            {(profile[`skills_${lang}`] || profile.skills_en || profile.skills).map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>{t('about.stats', lang)}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{totalWorks}</span>
              <span className="stat-label">{t('about.works', lang)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalWords.toLocaleString()}</span>
              <span className="stat-label">{t('about.totalWords', lang)}</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>{t('about.contact', lang)}</h2>
          <div className="contact-links">
            <button className="contact-link email-btn" onClick={copyEmail}>
              📧 {profile.social.email} {copied && <span className="copied-hint">{isZh ? '已复制' : 'Copied!'}</span>}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}