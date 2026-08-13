// 一鍵發佈 —— npm run publish
//
// 把「存進 GitHub」和「更新網站」兩件事合起來，不用再自己打 git 指令：
//   1. git add -A          把所有變動（含新照片）加進來
//   2. git commit          有變動才提交，沒變動就跳過
//   3. git push            推到目前所在的分支
//   4. npm run deploy      編譯並發佈到 GitHub Pages
//
// 用法：npm run publish              （用預設訊息）
//       npm run publish -- 加入攝影作品   （自訂訊息）
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

/** 跑一個指令，輸出直接透傳到終端機 */
function run(cmd, args, { allowFail = false } = {}) {
  const res = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.status !== 0 && !allowFail) {
    console.error(`\n  ✗ 執行失敗：${cmd} ${args.join(' ')}\n`)
    process.exit(res.status ?? 1)
  }
  return res.status === 0
}

/** 取得指令輸出的字串 */
function capture(cmd, args) {
  const res = spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' })
  return (res.stdout || '').trim()
}

const branch = capture('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
if (!branch) {
  console.error('\n  ✗ 這裡不是 git 資料夾，請確認有進到專案目錄\n')
  process.exit(1)
}

const message = process.argv.slice(2).join(' ').trim()
  || `更新作品集 ${new Date().toLocaleString('zh-TW', { hour12: false })}`

console.log(`\n  分支：${branch}\n`)

console.log('  [1/4] 加入變動的檔案')
run('git', ['add', '-A'])

const pending = capture('git', ['status', '--porcelain'])
if (pending) {
  console.log(`\n  [2/4] 提交：${message}`)
  run('git', ['commit', '-m', message])
} else {
  console.log('\n  [2/4] 沒有新的變動，跳過提交')
}

console.log('\n  [3/4] 推送到 GitHub')
run('git', ['push', '-u', 'origin', branch])

console.log('\n  [4/4] 發佈網站')
run('npm', ['run', 'deploy'])

console.log(`
  ✓ 完成

  原始檔已存進 GitHub（分支 ${branch}），網站也重新發佈了。
  網站約 1～2 分鐘後生效：https://e101059a-glitch.github.io/-1/
  看不到更新的話按 Ctrl+Shift+R 強制重新整理。
`)
