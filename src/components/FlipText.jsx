import styles from './FlipText.module.css'

// Two stacked letter layers swap on hover — top layer flips up and out,
// bottom layer flips up into place.
//
// The real text appears once, in a visually hidden span, so search engines
// and screen readers read it a single time. The animated letters are drawn
// from data-char by CSS: generated content is not part of the page text,
// otherwise the two layers would be indexed as the text written twice.
function FlipText({ text, as: Tag = 'span', className = '' }) {
  const chars = Array.from(text)
  const layer = (prefix) =>
    chars.map((c, i) => (
      <span
        key={`${prefix}-${i}`}
        className={styles.char}
        data-char={c === ' ' ? ' ' : c}
        style={{ transitionDelay: `${i * 25}ms` }}
      />
    ))

  return (
    <Tag className={`${styles.flipWrap} ${className}`}>
      <span className="sr-only">{text}</span>
      <span className={styles.layerTop} aria-hidden="true">{layer('t')}</span>
      <span className={styles.layerBottom} aria-hidden="true">{layer('b')}</span>
    </Tag>
  )
}

export default FlipText
