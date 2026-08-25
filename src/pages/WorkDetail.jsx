import { useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import { t } from '../i18n'
import works from '../data/works'

function parseChapters(content) {
  if (!/^Chapter\b/m.test(content)) {
    return [{ title: '', body: content.trim() }]
  }
  const blocks = content.split(/\n\n(?=Chapter\b)/).map(b => b.trim())
  return blocks.map(block => {
    const idx = block.indexOf('\n')
    return {
      title: block.slice(0, idx).trim(),
      body: block.slice(idx + 1).trim()
    }
  })
}

export default function WorkDetail() {
  const { id } = useParams()
  const { lang } = useLang()
  const work = works.find(w => w.id === Number(id))
  const chapters = useMemo(() => (work && work.content ? parseChapters(work.content) : []), [work])
  const [current, setCurrent] = useState(0)
  const bodyRef = useRef(null)

  if (!work) {
    return (
      <div className="page not-found">
        <h1>{t('works.notFound', lang)}</h1>
        <Link to="/works" className="btn btn-primary">{t('works.back', lang)}</Link>
      </div>
    )
  }

  const chapter = chapters[current]
  const shortLabel = title => (title || '').split(':')[0]

  const goTo = i => {
    setCurrent(i)
    bodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <div className="work-detail-desc">
            {work.description.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <span className="work-detail-date">{work.date}</span>
        </div>
      </div>

      {chapters.length > 1 && (
        <div className="chapter-nav">
          {chapters.map((c, i) => (
            <button
              key={i}
              className={`chapter-btn ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
            >
              {shortLabel(c.title)}
            </button>
          ))}
        </div>
      )}

      <div ref={bodyRef}>
        {chapter && (
          <>
            {chapter.title && <h2 className="work-chapter-title">{chapter.title}</h2>}
            <article className="work-detail-content">
              {chapter.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </article>
          </>
        )}
      </div>

      {chapters.length > 1 && (
        <div className="chapter-pager">
          <button className="chapter-btn" disabled={current === 0} onClick={() => goTo(current - 1)}>
            &larr; Prev
          </button>
          <span className="chapter-pos">{current + 1} / {chapters.length}</span>
          <button
            className="chapter-btn"
            disabled={current === chapters.length - 1}
            onClick={() => goTo(current + 1)}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  )
}