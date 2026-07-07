import { motion } from 'framer-motion'
import styles from './Experience.module.css'

const heading = { zh: '經歷', en: 'Experience' }

const experiences = [
  {
    org: 'TGI Fridays',
    role: { zh: '內場工作人員', en: 'Kitchen Staff' },
    period: '2024.02 — 2024.04',
    description: {
      zh: '在高節奏的餐飲環境中與團隊協作，培養穩定執行與抗壓能力。',
      en: 'Collaborated with a team in a fast-paced environment, developing the ability to execute consistently under pressure.',
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
      <div className={`section-container ${styles.inner}`}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {heading[lang]}
        </motion.h2>
        <div className={styles.headingLine} />

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
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
      </div>
    </section>
  )
}

export default Experience
