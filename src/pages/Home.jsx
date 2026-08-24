import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import profile from '../data/profile'
import works from '../data/works'
import posts from '../data/posts'

export default function Home() {
  const { lang } = useLang()
  const featuredWorks = works.slice(0, 3)
  const recentPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-avatar">
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-tagline">{profile[`tagline_${lang}`] || profile.tagline_en || profile.tagline}</p>
        <p className="hero-bio">{profile[`bio_${lang}`] || profile.bio_en || profile.bio}</p>
        <div className="hero-actions">
          <Link to="/works" className="btn btn-primary">{t('home.myWorks', lang)}</Link>
          <Link to="/about" className="btn btn-outline">{t('home.aboutMe', lang)}</Link>
        </div>
      </section>

      {featuredWorks.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>{t('home.works', lang)}</h2>
            <Link to="/works" className="section-more">{t('home.allWorks', lang)}</Link>
          </div>
          <div className="works-grid">
            {featuredWorks.map(work => (
              <Link to={`/works/${work.id}`} key={work.id} className="work-card">
                <div className="work-card-cover">
                  <img src={work.cover} alt={work.title} />
                  <span className={`work-status status-${work.status === '已完结' ? 'done' : 'ongoing'}`}>
                    {work.status}
                  </span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-type">{work.type}</span>
                  <h3 className="work-card-title">{work.title}</h3>
                  <p className="work-card-desc">{work.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>{t('home.latestPosts', lang)}</h2>
            <Link to="/blog" className="section-more">{t('home.allPosts', lang)}</Link>
          </div>
          <div className="post-list">
            {recentPosts.map(post => (
              <Link to={`/blog/${post.id}`} key={post.id} className="post-card">
                <div className="post-card-body">
                  <h3 className="post-card-title">{post.title}</h3>
                  <p className="post-card-summary">{post.summary}</p>
                  <span className="post-card-date">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}