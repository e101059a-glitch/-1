import { motion } from 'framer-motion'
import styles from './SplitText.module.css'

// Letters spring up from a mask in sequence when scrolled into view.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const charVariant = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
}

// The real text lives once in a visually hidden span; the animated letters
// are drawn from data-char by CSS so they are not read as separate words.
// aria-label on a plain span is ignored by many screen readers, which is why
// the text is given as content instead.
function SplitText({ text, className = '' }) {
  const chars = Array.from(text)

  return (
    <motion.span
      className={`${styles.split} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className="sr-only">{text}</span>
      {chars.map((c, i) => (
        <span key={`${c}-${i}`} className={styles.mask} aria-hidden="true">
          <motion.span
            className={styles.char}
            data-char={c === ' ' ? ' ' : c}
            variants={charVariant}
          />
        </span>
      ))}
    </motion.span>
  )
}

export default SplitText
