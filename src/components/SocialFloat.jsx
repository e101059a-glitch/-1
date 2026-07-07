import { Mail } from 'lucide-react'
import styles from './SocialFloat.module.css'

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="8" y1="10" x2="8" y2="16" />
      <line x1="8" y1="7" x2="8" y2="7" />
      <path d="M12 16v-6" />
      <path d="M12 12c0-1.5 1-2.5 2.5-2.5S17 10.5 17 12v4" />
    </svg>
  )
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  )
}

const links = [
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
]

function SocialFloat() {
  return (
    <div className={styles.socialFloat}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={styles.icon}
          aria-label={link.label}
        >
          <link.icon width={18} height={18} strokeWidth={1.5} />
        </a>
      ))}
      <span className={styles.line} />
    </div>
  )
}

export default SocialFloat
