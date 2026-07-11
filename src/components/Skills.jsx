import { useState } from 'react'
import { motion } from 'framer-motion'
import LetterSwap from './LetterSwap.jsx'
import { fadeUp, fadeUpItem } from '../motion.js'
import styles from './Skills.module.css'

const categories = [
  {
    zh: '3D 建模',
    en: '3D Modeling',
    items: ['SolidWorks', 'Rhino'],
  },
  {
    zh: '視覺設計',
    en: 'Visual Design',
    items: ['Illustrator', 'Photoshop'],
  },
  {
    zh: '攝影',
    en: 'Photography',
    items: [{ zh: '攝影棚架設', en: 'Studio Setup' }],
  },
  {
    zh: 'AI 工具',
    en: 'AI Tools',
    items: ['Midjourney', 'Claude', 'Gemini'],
  },
]

const heading = { zh: '技能', en: 'Skills' }

function Skills({ lang }) {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" className={styles.skills}>
      <div className={`section-container ${styles.inner}`}>
        <motion.h2 className={styles.heading} {...fadeUp}>
          {heading[lang]}
        </motion.h2>
        <div className={styles.line} />

        <div className={styles.grid}>
          {categories.map((category, i) => (
            <motion.div
              key={category.en}
              className={styles.card}
              {...fadeUpItem(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <h3 className={styles.cardTitle}>
                <LetterSwap label={category[lang]} active={hovered === i} />
              </h3>
              <div className={styles.tags}>
                {category.items.map((item) => {
                  const label = typeof item === 'string' ? item : item[lang]
                  return (
                    <span key={label} className={styles.tag}>
                      {label}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
