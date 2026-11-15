// 三種版本的履歷，各有中英文，放在 public/resume/。語言跟著網站目前的語言。
const base = `${import.meta.env.BASE_URL}resume/`

export const resumeVersions = [
  { id: 'design', zh: '設計版', en: 'Design' },
  { id: 'business', zh: '商業版', en: 'Business' },
  { id: 'ai', zh: 'AI 版', en: 'AI & Tech' },
]

const fileLabel = { design: 'Design', business: 'Business', ai: 'AI' }

export function resumeLink(id, lang) {
  return {
    href: `${base}${id}-${lang}.pdf`,
    download: `Yao-Wei_Hsieh_Resume_${fileLabel[id]}${lang === 'zh' ? '_zh' : ''}.pdf`,
  }
}
