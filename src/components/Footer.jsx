import styles from './Footer.module.css'

const content = {
  zh: '© 2024 謝耀緯 · 工業設計系',
  en: '© 2024 Yao-Wei Hsieh · Industrial Design',
}

function Footer({ lang }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{content[lang]}</p>
    </footer>
  )
}

export default Footer
