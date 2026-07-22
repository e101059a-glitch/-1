import { motion } from 'framer-motion'
import SplitText from './SplitText.jsx'
import styles from './About.module.css'

const content = {
  zh: {
    heading: '關於我',
    body: '就讀國立高雄師範大學工業設計系三年級，輔修事業經營學系。熱衷於從腦力激盪到實體呈現的完整設計流程，對設計與商業的交叉領域充滿熱情。修習攝影課程並有實際架設攝影棚的經驗，也積極運用 AI 工具提升創作效率。',
  },
  en: {
    heading: 'About',
    body: "I'm a third-year Industrial Design student at National Kaohsiung Normal University (NKNU), minoring in Business Administration. I'm passionate about the full design process — from brainstorming to physical execution — and especially interested in the intersection of design and business. I've completed a photography course with hands-on studio setup experience, and I actively use AI tools to enhance my creative workflow.",
  },
}

function About({ lang }) {
  const t = content[lang]

  return (
    <section id="about" className={styles.about}>
      <div className={`section-container ${styles.inner}`}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SplitText text={t.heading} />
        </motion.h2>
        <div className={styles.line} />
        <motion.p
          key={lang}
          className={styles.body}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {t.body}
        </motion.p>
      </div>
    </section>
  )
}

export default About
