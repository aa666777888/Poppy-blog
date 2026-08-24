import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import works from '../data/works'

export default function Works() {
  const { lang } = useLang()

  return (
    <div className="page works-page">
      <div className="page-title-block">
        <h1>{t('works.title', lang)}</h1>
        <p>{t('works.desc', lang)}</p>
      </div>

      {works.length > 0 && (
        <div className="works-grid works-grid-full">
          {works.map(work => (
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
                <span className="work-card-date">{work.date}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}