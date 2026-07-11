import { motion } from 'framer-motion'
import { fadeUpItem, flipIn } from '../motion.js'
import styles from './Experience.module.css'

const heading = { zh: '經歷', en: 'Experience' }

const experiences = [
  {
    org: '國立高雄師範大學 事業經營學系',
    role: { zh: '輔系修習中', en: 'Minor in Business Administration' },
    period: '2025 —',
    description: {
      zh: '修習行銷、管理與營運相關課程，練習把設計決策放進成本、市場與使用者價值的框架裡思考——讓作品不只是造型，而是能被商業驗證的提案。',
      en: 'Coursework in marketing, management and operations — learning to frame design decisions in terms of cost, market fit and user value, so a design is not just a form but a viable proposal.',
    },
  },
  {
    org: 'TGI Fridays',
    role: { zh: '內場工作人員', en: 'Kitchen Staff' },
    period: '2024.02 — 2024.04',
    description: {
      zh: '在高節奏的餐飲環境中負責內場出餐，觀察尖峰時段的備料動線與出餐節奏，練習以流程的眼光找出瓶頸、配合團隊調整分工，培養穩定執行與抗壓能力。',
      en: 'Worked the kitchen line in a fast-paced restaurant — observing prep flow and expo rhythm at peak hours, spotting bottlenecks with a process-design mindset, and executing consistently under pressure.',
    },
  },
  {
    org: '國立高雄師範大學羽球隊 / NKNU Badminton Team',
    role: { zh: '校隊成員', en: 'Varsity Team Member' },
    period: '2024 —',
    description: {
      zh: '擔任校羽球隊成員，代表學校參加全國大專運動會（全大運），長期訓練養成自律與團隊合作習慣。',
      en: 'Member of the university varsity badminton team, represented NKNU at the National Collegiate Athletic Games. Developed discipline and teamwork through long-term training.',
    },
  },
]

function Experience({ lang }) {
  return (
    <section id="experience" className={styles.experience}>
      <div className="section-container" style={{ perspective: '1200px' }}>
        <motion.div className={`section-card ${styles.inner}`} {...flipIn}>
          <h2 className={styles.heading}>{heading[lang]}</h2>
          <div className={styles.headingLine} />

          <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              className={styles.item}
              {...fadeUpItem(i)}
            >
              <div className={styles.marker}>
                <span className={styles.dot} />
                {i !== experiences.length - 1 && (
                  <span className={styles.connector} />
                )}
              </div>
              <div className={styles.content}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.org}>{exp.org}</h3>
                <span className={styles.role}>{exp.role[lang]}</span>
                <p className={styles.description}>{exp.description[lang]}</p>
              </div>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
