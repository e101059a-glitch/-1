import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FeaturedShowcase.module.css'

const eyebrowText = { zh: '精選作品', en: 'Featured Work' }
const ctaText = { zh: '查看完整作品', en: 'View Full Project' }

// 依照片說明文字自動分組成分頁；對不到的歸入「其他」
const TAB_RULES = [
  { match: /表板|board/i, label: { zh: '表板', en: 'Boards' } },
  { match: /草模|mockup/i, label: { zh: '草模', en: 'Mockups' } },
  { match: /3d/i, label: { zh: '3D 模型', en: '3D Model' } },
  { match: /成品|展示|final|showcase/i, label: { zh: '成品', en: 'Final' } },
]

function buildTabs(gallery, lang) {
  const tabs = []
  for (const img of gallery || []) {
    const caption = `${img.caption?.zh || ''} ${img.caption?.en || ''}`
    const rule = TAB_RULES.find((r) => r.match.test(caption))
    const label = rule ? rule.label[lang] : lang === 'zh' ? '其他' : 'More'
    let tab = tabs.find((t) => t.label === label)
    if (!tab) {
      tab = { label, images: [] }
      tabs.push(tab)
    }
    tab.images.push(img)
  }
  return tabs
}

function FeaturedShowcase({ item, lang, onOpen }) {
  const basePath = import.meta.env.BASE_URL
  const tabs = useMemo(() => buildTabs(item.gallery, lang), [item.gallery, lang])
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null
  const current = tabs[Math.min(active, tabs.length - 1)]
  const cover = current.images[0]

  return (
    <motion.div
      className={styles.showcase}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.textCol}>
        <p className={styles.eyebrow}>{eyebrowText[lang]}</p>
        <h3 className={styles.title}>{item.title[lang]}</h3>
        {item.subtitle && <p className={styles.subtitle}>{item.subtitle[lang]}</p>}
        {item.description && (
          <p className={styles.description}>{item.description[lang]}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <button type="button" className={styles.cta} onClick={onOpen}>
          {ctaText[lang]}
        </button>
      </div>

      <div className={styles.mediaCol}>
        <div className={styles.tabBar} role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.panel} onClick={onOpen} role="presentation">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${current.label}-${cover.src}`}
              src={`${basePath}${cover.src}`}
              alt={cover.caption?.[lang] || item.title[lang]}
              className={styles.panelImage}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </AnimatePresence>
          {current.images.length > 1 && (
            <span className={styles.countBadge}>
              {current.images.length} {lang === 'zh' ? '張' : 'photos'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FeaturedShowcase
