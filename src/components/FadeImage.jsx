import { useState, useRef, useLayoutEffect } from 'react'
import styles from './FadeImage.module.css'

/* 圖片還沒載完時顯示閃光骨架，載完再淡入，避免一格一格空白跳出來。
   外層容器要有 position: relative 和固定比例，骨架才會鋪滿。 */
function FadeImage({ className = '', onLoad, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  // 換圖時重設；已在快取裡的圖可能在掛上 onLoad 前就載完了，直接當作已載入
  useLayoutEffect(() => {
    const img = ref.current
    setLoaded(Boolean(img && img.complete && img.naturalWidth > 0))
  }, [props.src])

  return (
    <>
      {!loaded && <span className={styles.skeleton} aria-hidden="true" />}
      <img
        ref={ref}
        decoding="async"
        {...props}
        className={`${className} ${styles.img} ${loaded ? styles.loaded : ''}`}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        onError={() => setLoaded(true)}
      />
    </>
  )
}

export default FadeImage
