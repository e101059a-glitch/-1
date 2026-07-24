import { motion } from 'framer-motion'
import SplitText from './SplitText.jsx'
import styles from './About.module.css'

const content = {
  zh: {
    heading: '關於我',
    body: '就讀國立高雄師範大學工業設計系三年級，輔修事業經營學系。熱衷於從腦力激盪到實體呈現的完整產品設計流程，熟悉 SolidWorks、Rhino 進行 3D 建模，相信好的設計不只是造型，更需要能被商業驗證。目前積極累積實務經驗，以出國攻讀研究所為目標，持續朝設計與商業的交叉領域深耕。',
    bullets: [
      '修習攝影課程，具備攝影棚架設實務經驗',
      '積極運用 Midjourney、Claude、Gemini 等 AI 工具提升創作效率',
      '校羽球隊成員，代表學校參加全大運',
      '熱衷微縮模型塗裝，享受在細節中反覆調整、找到平衡的過程',
    ],
  },
  en: {
    heading: 'About',
    body: "3rd-year Industrial Design student at National Kaohsiung Normal University, minoring in Business Administration. Passionate about the full product design process — from brainstorming to physical execution — with hands-on experience in 3D modeling using SolidWorks and Rhino. I believe great design must also stand up to business validation. Currently building hands-on experience with the long-term goal of pursuing a graduate degree abroad, deepening my focus at the intersection of design and business.",
    bullets: [
      'Photography course with hands-on studio setup experience',
      'Actively use Midjourney, Claude, and Gemini in creative workflow',
      'Varsity badminton team member, competed in National Collegiate Athletic Games',
      'Passionate about miniature painting, enjoying the process of fine-tuning details until everything feels balanced',
    ],
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
        <motion.ul
          key={`${lang}-bullets`}
          className={styles.body}
          style={{ marginTop: '16px', listStyle: 'none', padding: 0 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {t.bullets.map((item) => (
            <li key={item} style={{ position: 'relative', paddingLeft: '16px', marginTop: '8px' }}>
              <span style={{ position: 'absolute', left: 0 }} aria-hidden="true">•</span>
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default About
