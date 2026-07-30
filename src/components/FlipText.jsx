import styles from './FlipText.module.css'

// Two stacked letter layers swap on hover — top layer flips up and out,
// bottom layer flips up into place.
function FlipText({ text, as: Tag = 'span', className = '' }) {
  const chars = Array.from(text)

  return (
    <Tag className={`${styles.flipWrap} ${className}`} aria-label={text}>
      <span className={styles.layerTop} aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={`t-${i}`}
            className={styles.char}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
      <span className={styles.layerBottom} aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={`b-${i}`}
            className={styles.char}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
    </Tag>
  )
}

export default FlipText
