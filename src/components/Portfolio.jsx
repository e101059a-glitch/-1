import { motion } from 'framer-motion'
import styles from './Portfolio.module.css'

const heading = { zh: '作品集', en: 'Portfolio' }
const title = { zh: '作品即將推出', en: 'Coming Soon' }
const description = {
  zh: '正在整理設計作品，敬請期待。',
  en: 'Working on curating my projects.',
}

const placeholders = [1, 2, 3]

function PlaceholderIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 44 L22 28 L34 38 L44 26 L60 44" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Portfolio({ lang }) {
  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={`section-container ${styles.inner}`}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {heading[lang]}
        </motion.h2>
        <div className={styles.headingLine} />

        <div className={styles.grid}>
          {placeholders.map((id, i) => (
            <motion.div
              key={id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <PlaceholderIcon />
              <h3 className={styles.cardTitle}>{title[lang]}</h3>
              <p className={styles.cardDescription}>{description[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
