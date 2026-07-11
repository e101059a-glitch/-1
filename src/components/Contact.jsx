import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { fadeUpDelay, fadeUpItem, flipIn } from '../motion.js'
import styles from './Contact.module.css'

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="8" y1="10" x2="8" y2="16" />
      <line x1="8" y1="7" x2="8" y2="7" />
      <path d="M12 16v-6" />
      <path d="M12 12c0-1.5 1-2.5 2.5-2.5S17 10.5 17 12v4" />
    </svg>
  )
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  )
}

const content = {
  zh: {
    heading: '聯絡',
    intro: '正在尋找設計或商業領域的暑期實習機會——歡迎與我聯繫，一起探討設計與商業的可能性！',
    cta: '寫信給我',
    ctaHint: '通常會在 24 小時內回覆',
  },
  en: {
    heading: 'Contact',
    intro: "Currently looking for summer internships in design or business — let's connect and explore opportunities together!",
    cta: 'Email Me',
    ctaHint: 'I usually reply within 24 hours',
  },
}

const contacts = [
  { icon: Mail, label: 'Email', value: 'e101059a@gmail.com', href: 'mailto:e101059a@gmail.com' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: '謝耀緯 · LinkedIn', href: 'https://www.linkedin.com/in/耀緯-謝-0080082a7' },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/e101059a-glitch', href: 'https://github.com/e101059a-glitch' },
]

function Contact({ lang }) {
  const t = content[lang]

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-container" style={{ perspective: '1200px' }}>
        <motion.div className={`section-card ${styles.inner}`} {...flipIn}>
          <h2 className={styles.heading}>{t.heading}</h2>
          <div className={styles.headingLine} />

        <motion.p key={lang} className={styles.intro} {...fadeUpDelay(1)}>
          {t.intro}
        </motion.p>

        <motion.div className={styles.ctaRow} {...fadeUpDelay(2)}>
          <a href="mailto:e101059a@gmail.com" className={styles.ctaButton}>
            <Mail width={18} height={18} strokeWidth={1.8} />
            {t.cta}
            <span aria-hidden="true" className={styles.ctaArrow}>→</span>
          </a>
          <span className={styles.ctaHint}>{t.ctaHint}</span>
        </motion.div>

        <div className={styles.list}>
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={styles.item}
              {...fadeUpItem(i)}
            >
              <c.icon className={styles.icon} width={20} height={20} strokeWidth={1.5} />
              <div className={styles.textGroup}>
                <span className={styles.label}>{c.label}</span>
                <span className={styles.value}>{c.value}</span>
              </div>
            </motion.a>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
