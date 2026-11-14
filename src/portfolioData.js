// 網站執行時會抓 public/portfolio/data.json 拿最新資料；
// 這裡把同一份檔案打包進 JS 當備援（抓取失敗時用），兩邊永遠一致，不用手動同步。
import portfolioItems from '../public/portfolio/data.json'

export default portfolioItems
