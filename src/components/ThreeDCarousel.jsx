import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'
import styles from './ThreeDCarousel.module.css'

const heading = { zh: '作品一覽', en: 'Gallery' }
const hint = { zh: '拖曳旋轉 · 點擊照片查看完整作品', en: 'Drag to spin · click a photo to view the project' }

// 3D 圓柱旋轉相簿：照片貼在一個可拖曳旋轉的圓柱面上，
// 閒置時緩慢自轉，拖曳可自由旋轉，點擊照片開啟完整作品。
function ThreeDCarousel({ item, lang, onOpen }) {
  const basePath = import.meta.env.BASE_URL
  const images = item.gallery || []
  const count = images.length

  const [isSmall, setIsSmall] = useState(false)
  const [reduced, setReduced] = useState(false)
  const draggingRef = useRef(false)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (r) => `rotateY(${r}deg)`)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { setIsSmall(mq.matches); setReduced(rm.matches) }
    update()
    mq.addEventListener('change', update)
    rm.addEventListener('change', update)
    return () => { mq.removeEventListener('change', update); rm.removeEventListener('change', update) }
  }, [])

  // 閒置時緩慢自轉
  useAnimationFrame((_, delta) => {
    if (reduced || draggingRef.current) return
    rotation.set(rotation.get() + delta * 0.006)
  })

  if (count === 0) return null

  const faceWidth = isSmall ? 150 : 220
  const radius = Math.round(faceWidth / 2 / Math.tan(Math.PI / count)) + 14

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>{heading[lang]}</p>
      <div
        className={styles.stage}
        style={{ height: (isSmall ? 190 : 250) + 'px' }}
      >
        <motion.div
          className={styles.cylinder}
          style={{ transform }}
          onPanStart={() => { draggingRef.current = true }}
          onPan={(_, info) => { rotation.set(rotation.get() + info.delta.x * 0.18) }}
          onPanEnd={() => { draggingRef.current = false }}
        >
          {images.map((img, i) => (
            <button
              type="button"
              key={i}
              className={styles.face}
              style={{
                width: faceWidth + 'px',
                marginLeft: -faceWidth / 2 + 'px',
                transform: `rotateY(${(360 / count) * i}deg) translateZ(${radius}px)`,
              }}
              onClick={onOpen}
              aria-label={img.caption?.[lang] || heading[lang]}
              tabIndex={-1}
            >
              <img
                src={`${basePath}${img.src}`}
                alt={img.caption?.[lang] || ''}
                className={styles.image}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </motion.div>
      </div>
      <p className={styles.hint}>{hint[lang]}</p>
    </div>
  )
}

export default ThreeDCarousel
