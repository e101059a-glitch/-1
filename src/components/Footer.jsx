import styles from './Footer.module.css'

const year = new Date().getFullYear()

const content = {
  zh: `© ${year} 謝耀緯 · 工業設計系`,
  en: `© ${year} Travis · Industrial Design`,
}

function Footer({ lang }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{content[lang]}</p>
    </footer>
  )
}

export default Footer
