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

function SplitText({ text, className = '' }) {
  const chars = Array.from(text)

  return (
    <motion.span
      className={`${styles.split} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <span key={`${c}-${i}`} className={styles.mask} aria-hidden="true">
          <motion.span className={styles.char} variants={charVariant}>
            {c === ' ' ? ' ' : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default SplitText
