import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import posts from '../data/posts'

export default function Blog() {
  const { lang } = useLang()
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="page blog-page">
      <div className="page-title-block">
        <h1>{t('blog.title', lang)}</h1>
        <p>{t('blog.desc', lang)}</p>
      </div>

      {sorted.length > 0 && (
        <div className="post-list-full">
          {sorted.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id} className="post-card-full">
              <h2 className="post-card-full-title">{post.title}</h2>
              <p className="post-card-full-summary">{post.summary}</p>
              <span className="post-card-full-date">{post.date}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}