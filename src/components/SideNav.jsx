import { useState, useEffect } from 'react'
import styles from './SideNav.module.css'

const sections = ['hero', 'about', 'skills', 'experience', 'portfolio', 'contact']

function SideNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.sideNav}>
      {sections.map((id) => (
        <button
          key={id}
          type="button"
          className={`${styles.dot} ${active === id ? styles.active : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={id}
        />
      ))}
    </nav>
  )
}

export default SideNav
