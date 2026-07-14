import styles from './LetterSwap.module.css'

// 逐字翻滾替換效果：active 時每個字往上滾出、同字從下方滾入，
// 由外層（技能卡片）的 hover 狀態驅動
function LetterSwap({ label, active }) {
  return (
    <span className={styles.swap} aria-label={label}>
      {Array.from(label).map((ch, i) => (
        <span key={i} className={styles.char} aria-hidden="true">
          <span
            className={`${styles.roll} ${active ? styles.rolled : ''}`}
            style={{ transitionDelay: `${i * 28}ms` }}
          >
            <span className={styles.glyph}>{ch === ' ' ? ' ' : ch}</span>
            <span className={styles.glyph}>{ch === ' ' ? ' ' : ch}</span>
          </span>
        </span>
      ))}
    </span>
  )
}

export default LetterSwap
