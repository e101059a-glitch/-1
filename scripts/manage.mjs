// 本地作品集管理伺服器 —— npm run manage
//
// 直接讀寫專案裡真正的檔案，省掉「複製程式碼 → 貼上 → 手動搬照片」這三步：
//   讀取  src/portfolioData.js   →  管理頁面帶出目前的作品
//   儲存  src/portfolioData.js   →  按「儲存到網站」就寫回去（寫入前先備份）
//   照片  public/portfolio/      →  上傳的圖片與 PDF 自動放進去
//
// 刻意不使用任何套件，只用 Node 內建模組。
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATA_FILE = path.join(ROOT, 'src', 'portfolioData.js')
const MEDIA_DIR = path.join(ROOT, 'public', 'portfolio')
const MANAGER_FILE = path.join(ROOT, 'portfolio-manager.html')
const BACKUP_DIR = path.join(ROOT, '.manage-backups')
const PORT = Number(process.env.PORT) || 4180

// 上傳的原始照片可能很大，放寬請求上限
const MAX_BODY = 64 * 1024 * 1024

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
}

/** 直接 import 真正的資料檔，格式怎麼寫都不會解析錯；加上查詢字串避開模組快取 */
async function readData() {
  const mod = await import(`${pathToFileURL(DATA_FILE).href}?t=${Date.now()}`)
  return mod.default ?? []
}

/** 只留下網站真正會用到的欄位，並固定順序讓產生的檔案好讀 */
function cleanItem(item) {
  const out = {}
  if (item.cover) out.cover = item.cover
  out.title = item.title
  if (item.subtitle && (item.subtitle.zh || item.subtitle.en)) out.subtitle = item.subtitle
  out.description = item.description
  if (item.reflection && (item.reflection.zh || item.reflection.en)) out.reflection = item.reflection
  out.tags = item.tags || []
  if (Array.isArray(item.process) && item.process.length > 0) out.process = item.process
  if (Array.isArray(item.gallery) && item.gallery.length > 0) {
    out.gallery = item.gallery.map(g => ({ src: g.src, caption: g.caption }))
  }
  if (item.pdf && item.pdf.src) out.pdf = item.pdf
  return out
}

/** 字串常值：預設用單引號（和專案既有寫法一致），內容有單引號時才改用雙引號 */
function jsString(str) {
  if (!str.includes("'")) {
    return `'${str.replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n')}'`
  }
  return JSON.stringify(str)
}

/** 把物件寫成排版好的 JS 常值：key 不加引號、縮排兩格，跟原本的檔案長得一樣 */
function toJs(value, depth) {
  const pad = '  '.repeat(depth)
  const padIn = '  '.repeat(depth + 1)
  if (typeof value === 'string') return jsString(value)
  if (value === null || typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    return `[\n${value.map(v => padIn + toJs(v, depth + 1)).join(',\n')}\n${pad}]`
  }
  const keys = Object.keys(value)
  if (keys.length === 0) return '{}'
  const pairs = keys.map(k => [/^[A-Za-z_$][\w$]*$/.test(k) ? k : jsString(k), value[k]])

  // 短的 { zh, en } 這種成對物件寫成一行，和原本手寫的檔案排版一致
  if (pairs.every(([, v]) => typeof v === 'string')) {
    const inline = `{ ${pairs.map(([k, v]) => `${k}: ${jsString(v)}`).join(', ')} }`
    if (inline.length <= 60) return inline
  }

  const lines = pairs.map(([k, v]) => `${padIn}${k}: ${toJs(v, depth + 1)}`)
  return `{\n${lines.join(',\n')}\n${pad}}`
}

/** 轉回 portfolioData.js 的格式 */
function serialize(items) {
  const body = items.map(item => `  ${toJs(cleanItem(item), 1)}`).join(',\n')
  return `const portfolioItems = [\n${body}\n]\n\nexport default portfolioItems\n`
}

/** 覆蓋資料檔前先留一份時間戳備份，改壞了隨時可以復原 */
async function backupData() {
  if (!existsSync(DATA_FILE)) return null
  await mkdir(BACKUP_DIR, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const dest = path.join(BACKUP_DIR, `portfolioData.${stamp}.js`)
  await copyFile(DATA_FILE, dest)
  // 只保留最近 20 份，不讓備份無限長大
  const files = (await readdir(BACKUP_DIR)).filter(f => f.endsWith('.js')).sort()
  for (const old of files.slice(0, -20)) {
    await import('node:fs/promises').then(fs => fs.rm(path.join(BACKUP_DIR, old), { force: true }))
  }
  return path.relative(ROOT, dest)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY) { reject(new Error('檔案太大（上限 64MB）')); req.destroy(); return }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sendJson(res, status, payload) {
  const text = JSON.stringify(payload)
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(text)
}

/** 只允許單純檔名，擋掉 ../ 之類跳出資料夾的路徑 */
function safeName(name) {
  const base = path.basename(String(name || '')).trim()
  if (!base || base === '.' || base === '..') return null
  return base
}

async function serveFile(res, file) {
  if (!existsSync(file)) { res.writeHead(404); res.end('Not found'); return }
  const buf = await readFile(file)
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  res.end(buf)
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = decodeURIComponent(url.pathname)

  try {
    // 目前的作品資料
    if (pathname === '/api/data' && req.method === 'GET') {
      return sendJson(res, 200, { items: await readData() })
    }

    // 寫回 src/portfolioData.js
    if (pathname === '/api/save' && req.method === 'POST') {
      const { items } = JSON.parse((await readBody(req)).toString('utf8'))
      if (!Array.isArray(items)) return sendJson(res, 400, { error: '資料格式錯誤' })
      const backup = await backupData()
      await writeFile(DATA_FILE, serialize(items), 'utf8')
      console.log(`  ✓ 已寫入 src/portfolioData.js（${items.length} 個作品）`)
      return sendJson(res, 200, { ok: true, count: items.length, backup })
    }

    // 上傳圖片 / PDF 到 public/portfolio/
    if (pathname === '/api/upload' && req.method === 'POST') {
      const { name, data } = JSON.parse((await readBody(req)).toString('utf8'))
      const file = safeName(name)
      if (!file) return sendJson(res, 400, { error: '檔名無效' })
      await mkdir(MEDIA_DIR, { recursive: true })
      const base64 = String(data || '').replace(/^data:[^;]*;base64,/, '')
      await writeFile(path.join(MEDIA_DIR, file), Buffer.from(base64, 'base64'))
      console.log(`  ✓ 已存入 public/portfolio/${file}`)
      return sendJson(res, 200, { ok: true, file })
    }

    // public/portfolio/ 裡的照片，讓管理頁面直接看得到預覽
    if (pathname.startsWith('/portfolio/') && req.method === 'GET') {
      const file = safeName(pathname.slice('/portfolio/'.length))
      if (!file) { res.writeHead(400); res.end('Bad path'); return }
      return serveFile(res, path.join(MEDIA_DIR, file))
    }

    if ((pathname === '/' || pathname === '/index.html') && req.method === 'GET') {
      return serveFile(res, MANAGER_FILE)
    }

    if (pathname === '/favicon.ico' || pathname === '/favicon.svg') {
      return serveFile(res, path.join(ROOT, 'public', 'favicon.svg'))
    }

    res.writeHead(404); res.end('Not found')
  } catch (err) {
    console.error('  ✗', err.message)
    sendJson(res, 500, { error: err.message })
  }
})

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`
  console.log(`
  作品集管理工具已啟動
  ${url}

  在頁面上編輯完，按「儲存到網站」就會直接寫入：
    src/portfolioData.js    作品資料（覆蓋前自動備份到 .manage-backups/）
    public/portfolio/       上傳的照片與 PDF

  存好之後再上傳網站：npm run deploy
  結束請按 Ctrl+C
`)
  const opener = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
    : process.platform === 'darwin' ? ['open', [url]]
      : ['xdg-open', [url]]
  // 打不開瀏覽器不影響使用，自己點上面的網址即可。
  // spawn 失敗是非同步的 error 事件，一定要接起來，否則會讓伺服器整個掛掉。
  try {
    const child = spawn(opener[0], opener[1], { stdio: 'ignore', detached: true })
    child.on('error', () => {})
    child.unref()
  } catch {
    // 忽略
  }
})
