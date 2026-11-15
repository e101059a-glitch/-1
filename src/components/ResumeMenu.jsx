import { useEffect, useRef, useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { resumeVersions, resumeLink } from '../resume.js'
import styles from './ResumeMenu.module.css'

const label = { zh: '下載履歷', en: 'Download Résumé' }

// 首頁的「下載履歷」：點開選版本，語言跟著網站
function ResumeMenu({ lang }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <Download size={15} strokeWidth={1.75} aria-hidden="true" />
        {label[lang]}
        <ChevronDown size={14} strokeWidth={1.75} aria-hidden="true" className={open ? styles.flip : ''} />
      </button>
      {open && (
        <ul className={styles.menu}>
          {resumeVersions.map((v) => {
            const { href, download } = resumeLink(v.id, lang)
            return (
              <li key={v.id}>
                <a className={styles.item} href={href} download={download} onClick={() => setOpen(false)}>
                  {v[lang]}
                  <span className={styles.ext}>PDF</span>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ResumeMenu
