import { useState } from 'react'
import { motion } from 'framer-motion'
import portfolioItems from '../portfolioData.js'
import ProjectModal from './ProjectModal.jsx'
import styles from './Portfolio.module.css'

const heading = { zh: '作品集', en: 'Portfolio' }
const placeholderTitle = { zh: '作品即將推出', en: 'Coming Soon' }
const placeholderDesc = {
  zh: '正在整理設計作品，敬請期待。',
  en: 'Working on curating my projects.',
}
const viewText = { zh: '查看詳情', en: 'View Details' }

function PlaceholderIcon() {
  return (
    <svg
      className={styles.placeholderIcon}
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

function PlaceholderCard({ lang, index }) {
  return (
    <motion.div
      className={styles.placeholderCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <PlaceholderIcon />
      <h3 className={styles.cardTitle}>{placeholderTitle[lang]}</h3>
      <p className={styles.cardDescription}>{placeholderDesc[lang]}</p>
    </motion.div>
  )
}

function ProjectCard({ item, lang, index, onClick }) {
  const hasCover = item.cover && item.cover.length > 0
  const basePath = import.meta.env.BASE_URL
  const galleryCount = item.gallery ? item.gallery.length : 0

  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onClick={onClick}
    >
      <div className={styles.imageWrapper}>
        {hasCover ? (
          <img
            src={`${basePath}${item.cover}`}
            alt={item.title[lang]}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <PlaceholderIcon />
          </div>
        )}
        <div className={styles.imageOverlay}>
          <span className={styles.viewBtn}>{viewText[lang]}</span>
        </div>
        {galleryCount > 0 && (
          <span className={styles.badge}>{galleryCount} {lang === 'zh' ? '張' : 'photos'}</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.title[lang]}</h3>
        {item.subtitle && (
          <p className={styles.cardSubtitle}>{item.subtitle[lang]}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Portfolio({ lang }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const hasItems = portfolioItems.length > 0

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
          {hasItems
            ? portfolioItems.map((item, i) => (
                <ProjectCard
                  key={i}
                  item={item}
                  lang={lang}
                  index={i}
                  onClick={() => setSelectedIndex(i)}
                />
              ))
            : [1, 2, 3].map((id, i) => (
                <PlaceholderCard key={id} lang={lang} index={i} />
              ))
          }
        </div>
      </div>

      {selectedIndex !== null && (
        <ProjectModal
          item={portfolioItems[selectedIndex]}
          lang={lang}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  )
}

export default Portfolio
