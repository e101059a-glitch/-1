import styles from './Decorations.module.css'

function Decorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      {/* Left side */}
      <div className={`${styles.element} ${styles.circle1}`} />
      <div className={`${styles.element} ${styles.line1}`} />
      <div className={`${styles.element} ${styles.dot1}`} />
      <div className={`${styles.element} ${styles.cross1}`}>
        <span /><span />
      </div>
      <div className={`${styles.element} ${styles.ring1}`} />

      {/* Right side */}
      <div className={`${styles.element} ${styles.circle2}`} />
      <div className={`${styles.element} ${styles.line2}`} />
      <div className={`${styles.element} ${styles.dot2}`} />
      <div className={`${styles.element} ${styles.cross2}`}>
        <span /><span />
      </div>
      <div className={`${styles.element} ${styles.ring2}`} />
      <div className={`${styles.element} ${styles.dot3}`} />
    </div>
  )
}

export default Decorations
