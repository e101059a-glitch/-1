import { motion } from 'framer-motion'
import PixelTrail from './PixelTrail.jsx'
import styles from './Hero.module.css'

const content = {
  zh: {
    title: '謝耀緯',
    subtitle: '工業設計 × 事業經營',
    description:
      '國立高雄師範大學工業設計系二年級，輔修事業經營學系。以設計思維結合商業視角，正尋找設計或商業暑期實習機會。',
    primary: '查看作品集',
    secondary: '聯絡我',
    scrollHint: '往下探索',
  },
  en: {
    title: 'Yao-Wei Hsieh',
    subtitle: 'Industrial Design × Business',
    description:
      "2nd-year Industrial Design student at NKNU, minoring in Business Administration. Combining design thinking with business strategy, seeking summer internship opportunities.",
    primary: 'View Portfolio',
    secondary: 'Get in Touch',
    scrollHint: 'Scroll',
  },
}

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const titleChar = {
  hidden: { opacity: 0, y: 24, rotate: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 280, damping: 20 },
  },
}

function Hero({ lang }) {
  const t = content[lang]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.glows} aria-hidden="true">
        <div className={`${styles.glow} ${styles.glowLeft}`} />
        <div className={`${styles.glow} ${styles.glowRight}`} />
      </div>

      <PixelTrail />

      <div className={`section-container ${styles.inner}`}>
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
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        />

        <motion.div
          key={`subtitle-${lang}`}
          className={styles.subtitleWrap}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.svg
            className={styles.subtitleCircle}
            viewBox="0 0 320 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M 253 22 C 333 64 280 100 160 106 C 67 106 38 96 38 62 C 38 26 93 16 160 16 C 227 16 255 34 257 42"
              fill="none"
              strokeWidth="2.6"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.85,
                  transition: {
                    pathLength: { duration: 1.6, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
                    opacity: { duration: 0.3, delay: 0.8 },
                  },
                },
              }}
            />
          </motion.svg>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </motion.div>

        <motion.p
          key={`desc-${lang}`}
          className={styles.description}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          {t.description}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          <motion.button
            type="button"
            className={styles.primaryButton}
            onClick={() => scrollTo('portfolio')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t.primary}
          </motion.button>
          <motion.button
            type="button"
            className={styles.secondaryButton}
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t.secondary}
          </motion.button>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  )
}

export default Hero
