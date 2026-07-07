import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const content = {
  zh: {
    title: '謝耀緯',
    subtitle: '工業設計 × 事業經營',
    description:
      '國立高雄師範大學工業設計系二年級，輔修事業經營學系。以設計思維結合商業視角，正尋找設計或商業暑期實習機會。',
    primary: '查看作品集',
    secondary: '聯絡我',
  },
  en: {
    title: 'Yao-Wei Hsieh',
    subtitle: 'Industrial Design × Business',
    description:
      "2nd-year Industrial Design student at NKNU, minoring in Business Administration. Combining design thinking with business strategy, seeking summer internship opportunities.",
    primary: 'View Portfolio',
    secondary: 'Get in Touch',
  },
}

function Hero({ lang }) {
  const t = content[lang]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={`section-container ${styles.inner}`}>
        <motion.h1
          key={`title-${lang}`}
          className={styles.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t.title}
        </motion.h1>

        <motion.div
          className={styles.line}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        />

        <motion.p
          key={`subtitle-${lang}`}
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          key={`desc-${lang}`}
          className={styles.description}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {t.description}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => scrollTo('portfolio')}
          >
            {t.primary}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => scrollTo('contact')}
          >
            {t.secondary}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
