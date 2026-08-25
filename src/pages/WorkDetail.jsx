import { useParams, Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import works from '../data/works'

export default function WorkDetail() {
  const { id } = useParams()
  const { lang } = useLang()
  const work = works.find(w => w.id === Number(id))

  if (!work) {
    return (
      <div className="page not-found">
        <h1>{t('works.notFound', lang)}</h1>
        <Link to="/works" className="btn btn-primary">{t('works.back', lang)}</Link>
      </div>
    )
  }

  return (
    <div className="page work-detail-page">
      <Link to="/works" className="back-link">&larr; {t('works.back', lang)}</Link>

      <div className="work-detail-header">
        <div className="work-detail-cover">
          <img src={work.cover} alt={work.title} />
        </div>
        <div className="work-detail-info">
          <span className="work-detail-type">{work.type}</span>
          <h1 className="work-detail-title">{work.title}</h1>
          <span className={`work-status status-${work.status === '已完结' ? 'done' : 'ongoing'}`}>
            {work.status}
          </span>
          <p className="work-detail-desc">{work.description}</p>
          <span className="work-detail-date">{work.date}</span>
        </div>
      </div>

      {work.content && (
        <article className="work-detail-content">
          {work.content.split('\n\n').map((para, i) => {
            if (/^Chapter\b/i.test(para)) {
              return <h2 key={i} className="work-chapter-title">{para}</h2>
            }
            return <p key={i}>{para}</p>
          })}
        </article>
      )}
    </div>
  )
}