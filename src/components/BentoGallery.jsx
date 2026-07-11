import { motion } from 'framer-motion'
import { fadeUpItem } from '../motion.js'
import styles from './BentoGallery.module.css'

const heading = { zh: '作品一覽', en: 'Gallery' }

// 大小不一的圖塊網格，懸停揭露說明，點擊開啟完整作品。
// 第一張放大成主圖，其餘照排；最多取 7 張避免過長。
function BentoGallery({ item, lang, onOpen }) {
  const basePath = import.meta.env.BASE_URL
  const images = (item.gallery || []).slice(0, 7)
  if (images.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>{heading[lang]}</p>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <motion.button
            type="button"
            key={i}
            className={`${styles.tile} ${i === 0 ? styles.tileLarge : ''}`}
            onClick={onOpen}
            {...fadeUpItem(i)}
            aria-label={img.caption?.[lang] || heading[lang]}
          >
            <img
              src={`${basePath}${img.src}`}
              alt={img.caption?.[lang] || ''}
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
            {img.caption?.[lang] && (
              <span className={styles.overlay}>
                <span className={styles.caption}>{img.caption[lang]}</span>
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default BentoGallery
