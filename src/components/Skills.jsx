import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Palette, Camera, Sparkles } from 'lucide-react'
import LetterSwap from './LetterSwap.jsx'
import { fadeUpItem, flipIn } from '../motion.js'
import styles from './Skills.module.css'

const categories = [
  {
    zh: '3D 建模',
    en: '3D Modeling',
    icon: Box,
    items: ['SolidWorks', 'Rhino'],
  },
  {
    zh: '視覺設計',
    en: 'Visual Design',
    icon: Palette,
    items: ['Illustrator', 'Photoshop'],
  },
  {
    zh: '攝影',
    en: 'Photography',
    icon: Camera,
    items: [{ zh: '攝影棚架設', en: 'Studio Setup' }],
  },
  {
    zh: 'AI 工具',
    en: 'AI Tools',
    icon: Sparkles,
    items: ['Midjourney', 'Claude', 'Gemini'],
  },
]

const heading = { zh: '技能', en: 'Skills' }

function Skills({ lang }) {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container" style={{ perspective: '1200px' }}>
        <motion.div className={`section-card ${styles.inner}`} {...flipIn}>
          <h2 className={styles.heading}>{heading[lang]}</h2>
          <div className={styles.line} />

          <div className={styles.grid}>
            {categories.map((category, i) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.en}
                  className={styles.card}
                  {...fadeUpItem(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className={styles.cardGlow} aria-hidden="true" />
                  <span className={styles.cardIcon}>
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
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
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
