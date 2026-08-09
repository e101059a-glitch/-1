// 本地作品集管理伺服器 —— npm run manage
//
// 直接讀寫專案裡真正的檔案，省掉「下載 data.json → 拖進資料夾 → 再搬照片」這幾步：
//   讀取／儲存  public/portfolio/data.json   網站執行時抓的作品資料（寫入前先備份）
//   照片        public/portfolio/            上傳的圖片與 PDF 自動放進去
//
// 刻意不使用任何套件，只用 Node 內建模組。
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, copyFile, readdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MEDIA_DIR = path.join(ROOT, 'public', 'portfolio')
const DATA_FILE = path.join(MEDIA_DIR, 'data.json')
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
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
}

async function readData() {
  if (!existsSync(DATA_FILE)) return []
  // 舊檔可能帶 UTF-8 BOM，JSON.parse 會噎到，先去掉
  const text = (await readFile(DATA_FILE, 'utf8')).replace(/^﻿/, '')
  if (!text.trim()) return []
  return JSON.parse(text)
}

/** 覆蓋資料檔前先留一份時間戳備份，改壞了隨時可以復原 */
async function backupData() {
  if (!existsSync(DATA_FILE)) return null
  await mkdir(BACKUP_DIR, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const dest = path.join(BACKUP_DIR, `data.${stamp}.json`)
  await copyFile(DATA_FILE, dest)
  // 只保留最近 20 份，不讓備份無限長大
  const files = (await readdir(BACKUP_DIR)).filter(f => f.endsWith('.json')).sort()
  for (const old of files.slice(0, -20)) {
    await rm(path.join(BACKUP_DIR, old), { force: true })
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
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(payload))
}

/** 只允許單純檔名，擋掉 ../ 之類跳出資料夾的路徑 */
function safeName(name) {
  const base = path.basename(String(name || '')).trim()
  if (!base || base === '.' || base === '..') return null
  return base
}

async function serveFile(res, file) {
  if (!existsSync(file)) { res.writeHead(404); res.end('Not found'); return }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  res.end(await readFile(file))
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = decodeURIComponent(url.pathname)

  try {
    if (pathname === '/api/data' && req.method === 'GET') {
      return sendJson(res, 200, { items: await readData() })
    }

    if (pathname === '/api/save' && req.method === 'POST') {
      const { items } = JSON.parse((await readBody(req)).toString('utf8'))
      if (!Array.isArray(items)) return sendJson(res, 400, { error: '資料格式錯誤' })
      const backup = await backupData()
      await mkdir(MEDIA_DIR, { recursive: true })
      await writeFile(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`, 'utf8')
      console.log(`  ✓ 已寫入 public/portfolio/data.json（${items.length} 個作品）`)
      return sendJson(res, 200, { ok: true, count: items.length, backup })
    }

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
      return serveFile(res, path.join(ROOT, 'public', pathname.slice(1)))
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
    public/portfolio/data.json   作品資料（覆蓋前自動備份到 .manage-backups/）
    public/portfolio/            上傳的照片與 PDF

  存好之後再上傳網站：npm run deploy
  結束請按 Ctrl+C
`)
  // 打不開瀏覽器不影響使用，自己點上面的網址即可。
  // spawn 失敗是非同步的 error 事件，一定要接起來，否則會讓伺服器整個掛掉。
  const opener = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
    : process.platform === 'darwin' ? ['open', [url]]
      : ['xdg-open', [url]]
  try {
    const child = spawn(opener[0], opener[1], { stdio: 'ignore', detached: true })
    child.on('error', () => {})
    child.unref()
  } catch {
    // 忽略
  }
})
