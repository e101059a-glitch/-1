import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ProjectModal.module.css'

function ProjectModal({ item, lang, onClose }) {
  const [lightbox, setLightbox] = useState(null)
  const basePath = import.meta.env.BASE_URL

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightbox !== null) setLightbox(null)
        else onClose()
      }
      if (lightbox !== null && item.gallery) {
        if (e.key === 'ArrowRight') setLightbox((p) => Math.min(p + 1, item.gallery.length - 1))
        if (e.key === 'ArrowLeft') setLightbox((p) => Math.max(p - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, onClose, item.gallery])

  const t = (obj) => (obj ? obj[lang] || obj.zh || '' : '')

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={22} strokeWidth={1.5} />
          </button>

          {/* Hero cover */}
          {item.cover && (
            <div className={styles.coverWrapper}>
              <img
                src={`${basePath}${item.cover}`}
                alt={t(item.title)}
                className={styles.coverImage}
              />
            </div>
          )}

          <div className={styles.body}>
            {/* Title area */}
            <h2 className={styles.title}>{t(item.title)}</h2>
            {item.subtitle && (
              <p className={styles.subtitle}>{t(item.subtitle)}</p>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            {/* Description */}
            {item.description && t(item.description) && (
              <div className={styles.descSection}>
                <p className={styles.description}>{t(item.description)}</p>
              </div>
            )}

            {/* Gallery */}
            {item.gallery && item.gallery.length > 0 && (
              <div className={styles.gallerySection}>
                <h3 className={styles.sectionTitle}>
                  {lang === 'zh' ? '製作流程' : 'Process'}
                </h3>
                <div className={styles.divider} />
                <div className={styles.gallery}>
                  {item.gallery.map((img, i) => (
                    <div
                      key={i}
                      className={styles.galleryItem}
                      onClick={() => setLightbox(i)}
                    >
                      <div className={styles.galleryImageWrapper}>
                        <img
                          src={`${basePath}${img.src}`}
                          alt={t(img.caption)}
                          className={styles.galleryImage}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      {img.caption && t(img.caption) && (
                        <p className={styles.galleryCaption}>{t(img.caption)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF */}
            {item.pdf && item.pdf.src && (
              <div className={styles.pdfSection}>
                <h3 className={styles.sectionTitle}>
                  {lang === 'zh' ? '報告文件' : 'Documents'}
                </h3>
                <div className={styles.divider} />
                <a
                  href={`${basePath}${item.pdf.src}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.pdfLink}
                >
                  <FileText size={20} strokeWidth={1.5} />
                  <span>{t(item.pdf.label) || (lang === 'zh' ? '檢視 PDF' : 'View PDF')}</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {lightbox !== null && item.gallery && (
        <motion.div
          className={styles.lightboxOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {lightbox > 0 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
          )}

          <img
            src={`${basePath}${item.gallery[lightbox].src}`}
            alt={t(item.gallery[lightbox].caption)}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

          {item.gallery[lightbox].caption && (
            <p className={styles.lightboxCaption}>
              {t(item.gallery[lightbox].caption)}
              <span className={styles.lightboxCounter}>
                {lightbox + 1} / {item.gallery.length}
              </span>
            </p>
          )}

          {lightbox < item.gallery.length - 1 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
