import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import styles from './Hero.module.css'

const content = {
  zh: {
    title: '謝耀緯',
    subtitle: '工業設計 × 事業經營',
    description:
      '國立高雄師範大學工業設計系三年級，輔修事業經營學系。以設計思維結合商業視角，正尋找設計或商業實習機會。',
    primary: '查看作品集',
    secondary: '聯絡我',
    scrollHint: 'Scroll',
  },
  en: {
    title: 'Travis',
    subtitle: 'Industrial Design × Business',
    description:
      "3rd-year Industrial Design student at NKNU, minoring in Business Administration. Combining design thinking with business strategy, seeking summer internship opportunities.",
    primary: 'View Portfolio',
    secondary: 'Get in Touch',
    scrollHint: 'Scroll',
  },
}

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const titleChar = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
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
        <motion.p
          key={`subtitle-${lang}`}
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {t.subtitle}
        </motion.p>

        <motion.h1
          key={`title-${lang}`}
          className={styles.title}
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          aria-label={t.title}
        >
          {Array.from(t.title).map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className={styles.titleChar}
              variants={titleChar}
              aria-hidden="true"
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.line}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        />

        <motion.p
          key={`desc-${lang}`}
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          {t.description}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        >
          <MagneticButton
            className={styles.primaryButton}
            onClick={() => scrollTo('portfolio')}
          >
            {t.primary}
          </MagneticButton>
          <MagneticButton
            className={styles.secondaryButton}
            onClick={() => scrollTo('contact')}
          >
            {t.secondary}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className={styles.scrollHint}
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        aria-label={t.scrollHint}
      >
        <span className={styles.scrollHintText}>{t.scrollHint}</span>
        <motion.span
          className={styles.scrollHintArrow}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  )
}

export default Hero
