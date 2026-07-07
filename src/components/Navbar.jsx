import { useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { id: 'about', zh: '關於', en: 'About' },
  { id: 'skills', zh: '技能', en: 'Skills' },
  { id: 'experience', zh: '經歷', en: 'Experience' },
  { id: 'portfolio', zh: '作品集', en: 'Portfolio' },
  { id: 'contact', zh: '聯絡', en: 'Contact' },
]

function Navbar({ lang, setLang }) {
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollTo('hero')}
        >
          {lang === 'zh' ? '謝耀緯' : 'YW Hsieh'}
        </button>

        <nav className={styles.links}>
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={styles.link}
              onClick={() => scrollTo(link.id)}
            >
              {lang === 'zh' ? link.zh : link.en}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={styles.langToggle}
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        >
          {lang === 'zh' ? '中 / EN' : 'EN / 中'}
        </button>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileMenu}>
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={styles.mobileLink}
              onClick={() => scrollTo(link.id)}
            >
              {lang === 'zh' ? link.zh : link.en}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
