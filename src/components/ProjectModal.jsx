import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ProjectModal.module.css'

function ProjectModal({ item, lang, onClose }) {
  const [lightbox, setLightbox] = useState(null)
  const basePath = import.meta.env.BASE_URL
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

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
          role="dialog"
          aria-modal="true"
          aria-label={t(item.title)}
        >
          <button type="button" className={styles.closeBtn} onClick={onClose} ref={closeRef} aria-label={lang === 'zh' ? '關閉' : 'Close'}>
            <X size={22} strokeWidth={1.5} />
          </button>

          {/* Hero cover */}
          {item.cover && (
            <div className={styles.coverWrapper}>
              <motion.img
                src={`${basePath}${item.cover}`}
                alt={t(item.title)}
                className={styles.coverImage}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                    <motion.div
                      key={i}
                      className={styles.galleryItem}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease: 'easeOut' }}
                      onClick={() => setLightbox(i)}
                      role="button"
                      tabIndex={0}
                      aria-label={t(img.caption) || `${lang === 'zh' ? '放大圖片' : 'Enlarge image'} ${i + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setLightbox(i)
                        }
                      }}
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
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Reflection */}
            {item.reflection && t(item.reflection) && (
              <div className={styles.reflectionSection}>
                <h3 className={styles.sectionTitle}>
                  {lang === 'zh' ? '作品反思' : 'Reflection'}
                </h3>
                <div className={styles.divider} />
                <p className={styles.reflection}>{t(item.reflection)}</p>
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
            aria-label={lang === 'zh' ? '關閉圖片' : 'Close image'}
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {lightbox > 0 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              aria-label={lang === 'zh' ? '上一張' : 'Previous image'}
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
          )}

          <motion.img
            key={lightbox}
            src={`${basePath}${item.gallery[lightbox].src}`}
            alt={t(item.gallery[lightbox].caption)}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
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
              aria-label={lang === 'zh' ? '下一張' : 'Next image'}
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
