import { useEffect, useRef, useState } from 'react'
import styles from './PixelTrail.module.css'

// 滑鼠掃過時在身後留下一格格淡出的像素軌跡。
// 為了效能以原生 CSS transition 實作（格子數以千計，不適合每格掛一個 motion 元件），
// 只在有滑鼠的裝置啟用，並尊重 prefers-reduced-motion。
function PixelTrail({ pixelSize = 24, fadeDuration = 700, color = 'rgba(193, 127, 59, 0.3)' }) {
  const containerRef = useRef(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled || !containerRef.current) return
    const el = containerRef.current
    let timer
    const ro = new ResizeObserver((entries) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const rect = entries[0].contentRect
        setDims({ width: rect.width, height: rect.height })
      }, 150)
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
      clearTimeout(timer)
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || !containerRef.current) return
    const el = containerRef.current

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (
        e.clientX < rect.left || e.clientX >= rect.right ||
        e.clientY < rect.top || e.clientY >= rect.bottom
      ) return
      const col = Math.floor((e.clientX - rect.left) / pixelSize)
      const row = Math.floor((e.clientY - rect.top) / pixelSize)
      const dot = el.children[row]?.children[col]
      if (!dot) return
      // 瞬間點亮後淡出。中間強制 reflow 提交「點亮」狀態，
      // 否則同一影格內連續改 opacity 不會觸發 transition
      dot.style.transition = 'none'
      dot.style.opacity = '1'
      void dot.offsetWidth
      dot.style.transition = `opacity ${fadeDuration}ms ease-out`
      dot.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, pixelSize, fadeDuration, dims])

  if (!enabled) return null

  const columns = Math.ceil(dims.width / pixelSize)
  const rows = Math.ceil(dims.height / pixelSize)

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true" data-pixel-trail>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={styles.dot}
              style={{ width: pixelSize, height: pixelSize, background: color }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PixelTrail
