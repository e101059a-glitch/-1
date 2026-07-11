// 全站共用的動態系統 —— 讓所有進場、懸停、轉場說同一種「動作語言」。
// 只有一條招牌緩動曲線、一組時長、一個進場位移與交錯間隔。

// 招牌緩動：平滑帶一點回彈的收尾（easeOutExpo 風格）
export const ease = [0.22, 1, 0.36, 1]

// 時長階梯
export const duration = {
  fast: 0.3, // 小元件、hover
  base: 0.55, // 進場主節奏
  slow: 0.9, // 大圖、封面沉降
}

// 進場統一參數
const Y = 20 // 進場時往上位移的距離
const STAGGER = 0.09 // 清單逐項交錯間隔
export const viewport = { once: true, amount: 0.25 }

// 區塊標題／單一內容的進場（直接展開到 motion 元件上）
export const fadeUp = {
  initial: { opacity: 0, y: Y },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: duration.base, ease },
}

// 帶延遲的進場（給標題下方的副內容用，delay 以「階」為單位）
export const fadeUpDelay = (step = 1) => ({
  initial: { opacity: 0, y: Y },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: duration.base, delay: step * 0.08, ease },
})

// 清單逐項交錯進場（傳入索引）
export const fadeUpItem = (i = 0) => ({
  initial: { opacity: 0, y: Y },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: duration.base, delay: i * STAGGER, ease },
})

// 標題下方那條金色分隔線的展開
export const drawLine = {
  initial: { opacity: 0, scaleX: 0 },
  whileInView: { opacity: 1, scaleX: 1 },
  viewport,
  transition: { duration: duration.base, delay: 0.08, ease },
}

// 卡片／按鈕懸停的統一回饋
export const hoverLift = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.98 },
  transition: { duration: duration.fast, ease },
}
