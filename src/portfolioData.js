/**
 * 作品集資料
 *
 * 圖片放在 public/portfolio/ 資料夾
 * PDF 放在 public/portfolio/ 資料夾
 *
 * 每個作品格式：
 * {
 *   cover: 'portfolio/封面圖.jpg',
 *   title: { zh: '中文標題', en: 'English Title' },
 *   subtitle: { zh: '簡短副標', en: 'Short subtitle' },
 *   description: { zh: '詳細描述...', en: 'Detailed description...' },
 *   tags: ['SolidWorks', 'Rhino'],
 *   gallery: [
 *     { src: 'portfolio/過程1.jpg', caption: { zh: '草圖發想', en: 'Sketching' } },
 *     { src: 'portfolio/過程2.jpg', caption: { zh: '3D 建模', en: '3D Modeling' } },
 *   ],
 *   pdf: { src: 'portfolio/報告.pdf', label: { zh: '完整報告', en: 'Full Report' } },
 * }
 */

const portfolioItems = [
  // --- 範例（取消註解即可使用）---
  // {
  //   cover: 'portfolio/fan-cover.jpg',
  //   title: { zh: '摺扇設計', en: 'Folding Fan Design' },
  //   subtitle: { zh: '工業設計課程期末專案', en: 'Industrial Design Final Project' },
  //   description: {
  //     zh: '以現代材料重新詮釋傳統摺扇，運用 Rhino 建模與 KeyShot 渲染，完成從概念發想到實體打樣的完整流程。',
  //     en: 'Reimagining the traditional folding fan with modern materials. Modeled in Rhino and rendered in KeyShot, completing the full process from concept to physical prototype.',
  //   },
  //   tags: ['Rhino', 'KeyShot', '3D Printing'],
  //   gallery: [
  //     { src: 'portfolio/fan-sketch.jpg', caption: { zh: '草圖發想', en: 'Initial Sketches' } },
  //     { src: 'portfolio/fan-model.jpg', caption: { zh: '3D 建模', en: '3D Modeling' } },
  //     { src: 'portfolio/fan-render.jpg', caption: { zh: '渲染成果', en: 'Final Render' } },
  //     { src: 'portfolio/fan-proto.jpg', caption: { zh: '實體打樣', en: 'Physical Prototype' } },
  //   ],
  //   pdf: { src: 'portfolio/fan-report.pdf', label: { zh: '設計報告 PDF', en: 'Design Report PDF' } },
  // },
]

export default portfolioItems
