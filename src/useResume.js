import { useEffect, useState } from 'react'

// 履歷放在 public/resume.pdf。檔案還沒放上去時按鈕自動隱藏，不會出現點了 404 的情況。
export const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`
export const RESUME_FILENAME = 'Travis-Hsieh-Resume.pdf'

let cached = null

export function useResumeAvailable() {
  const [ok, setOk] = useState(cached === true)
  useEffect(() => {
    if (cached !== null) return
    fetch(RESUME_URL, { method: 'HEAD', cache: 'no-cache' })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        cached = r.ok && type.includes('pdf')
      })
      .catch(() => { cached = false })
      .finally(() => setOk(cached === true))
  }, [])
  return ok
}
