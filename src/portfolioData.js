const portfolioItems = [
  {
    cover: 'portfolio/S__4628507.jpg',
    title: {
      zh: 'ERGO PEEL',
      en: 'ERGO PEEL'
    },
    subtitle: {
      zh: '居家產品設計',
      en: 'Home Product Design'
    },
    description: {
      zh: '將人體工學融入最日常的備料動作，以拇指、食指、中指的自然夾持姿勢為核心，讓施力方向與手部肌肉走向一致。底部快拆式刀盤可自由切換削皮刀片或磨板，一個握把應對多種廚房需求。',
      en: 'Seamlessly blending ergonomics into daily meal prep, ERGO PEEL centers on the natural pinch grip of the thumb, index, and middle fingers, aligning applying force with hand anatomy. Featuring a quick-release base, it easily switches between a peeler and a grater—handling diverse kitchen tasks with just one handle.'
    },
    reflection: {
      zh: '人體工學的部分研究還不夠深入，還有產品表達不夠清楚，造型的表達應該要看一眼就懂、會用。',
      en: "The ergonomic research needs more depth, and the product isn't communicating itself clearly enough. The form should be intuitive — understandable and usable at first glance."
    },
    tags: [
      'Solidworks',
      'Claude Code',
      'Gemini'
    ],
    process: [
      {
        title: { zh: '痛點研究', en: 'Insight' },
        text: {
          zh: '從日常備料的施力痛點出發，分析拇指、食指、中指的自然夾持姿勢，鎖定削皮動作的人體工學問題。',
          en: 'Started from the strain of daily meal prep — analyzing the natural pinch grip to pinpoint the ergonomic problem in peeling.'
        }
      },
      {
        title: { zh: '草模驗證', en: 'Prototyping' },
        text: {
          zh: '以多輪草模快速測試夾持姿勢與施力角度，反覆修正握把型態，讓施力方向與手部肌肉走向一致。',
          en: 'Rapid mockups tested grip posture and force angles, iterating the handle form until force aligned with hand anatomy.'
        }
      },
      {
        title: { zh: '建模與成品', en: 'Build & Deliver' },
        text: {
          zh: '以 SolidWorks 完成 3D 建模與快拆刀盤機構，產出實體成品，並以簡報表板完整呈現設計論述。',
          en: 'Modeled in SolidWorks with a quick-release blade mechanism, delivered the physical product and presentation boards.'
        }
      }
    ],
    gallery: [
      {
        src: 'portfolio/IMG_6015.webp',
        caption: {
          zh: '主題表板',
          en: 'Display Board'
        }
      },
      {
        src: 'portfolio/1.webp',
        caption: {
          zh: '產品表板-1',
          en: 'Presentation Board-1'
        }
      },
      {
        src: 'portfolio/2.webp',
        caption: {
          zh: '產品表板-2',
          en: 'Presentation Board-2'
        }
      },
      {
        src: 'portfolio/S__27705349_0.jpg',
        caption: {
          zh: '草模-1',
          en: 'Mockup-1'
        }
      },
      {
        src: 'portfolio/S__27705350_0.jpg',
        caption: {
          zh: '草模-2',
          en: 'Mockup-2'
        }
      },
      {
        src: 'portfolio/S__27705351_0.jpg',
        caption: {
          zh: '草模-3',
          en: 'Mockup-3'
        }
      },
      {
        src: 'portfolio/S__27705368_0.jpg',
        caption: {
          zh: '3D模型',
          en: '3D model'
        }
      },
      {
        src: 'portfolio/S__27705371_0.jpg',
        caption: {
          zh: '3D模型',
          en: '3D model'
        }
      },
      {
        src: 'portfolio/S__27705369_0.jpg',
        caption: {
          zh: '3D模型',
          en: '3D model'
        }
      },
      {
        src: 'portfolio/S__27705366_0.jpg',
        caption: {
          zh: '成品-1',
          en: 'Final product-1'
        }
      },
      {
        src: 'portfolio/S__27705367_0.jpg',
        caption: {
          zh: '成品-2',
          en: 'Final product-2'
        }
      },
      {
        src: 'portfolio/S__27729924_0.jpg',
        caption: {
          zh: '展示',
          en: 'Showcase'
        }
      }
    ],
    pdf: {
      src: 'portfolio/ergo-peel.pdf',
      label: {
        zh: 'ERGO PEEL',
        en: 'ERGO PEEL'
      }
    }
  },
  {
    // 封面圖片檔案尚未上傳（34dd687e-2150-4638-adc2-8b03979c17f1-clean.png），
    // 收到檔案後補上 cover 欄位
    title: {
      zh: 'Lumina 發光邊桌設計',
      en: 'Lumina Illuminated Side Table Design'
    },
    description: {
      zh: '秉持「形隨機能」的精神，Lumina剝離冗餘修飾，將家具精煉為純粹的幾何體塊。透過玻璃的透、鋼材的剛、混凝的重，在理性構中尋求平衡。幾何發光核心不僅是視覺焦點，更是溫暖空與功能的匯集點。',
      en: 'Upholding the spirit of "form follows function," Lumina strips away redundant ornamentation, refining the furniture into pure geometric volumes. Through the transparency of glass, the rigidity of steel, and the gravity of concrete, it seeks a harmonious balance within a rational structure. The geometric illuminating core is not only a visual focal point, but also a convergence point where warmth and functionality meet.'
    },
    reflection: {
      zh: '在 Lumina 的模型製作過程中，最大的工藝挑戰在於材料與製程的限制。原本計畫將幾何燈罩以 3D 列印進行全透明輸出，但在實際打磨時，發現內部的支撐材痕跡與層紋極難完全消除。為了克服這項工藝瓶頸，我轉而將挑戰轉化為設計機會——將燈罩表面改為特殊的幾何花紋設計。這個調整不僅完美隱蔽了製程瑕疵，更在光線穿透時，意外創造出層次豐富的光影紋理。這次經驗讓我深刻體會到，設計不只是追求理想中的完美，更是在 CMF（色彩、材質、工藝）與製造限制之間，靈活尋求最佳解的高效過程。',
      en: 'The biggest manufacturing challenge in this project lay in the limitations of materials and prototyping. Initially, I planned to 3D-print the geometric lampshade in full transparency. However, during the post-processing phase, I realized that the internal support marks and print lines were nearly impossible to eliminate completely. Instead of compromising, I turned this technical bottleneck into a design opportunity by introducing a patterned texture to the lampshade surface. This pivot not only effectively concealed the fabrication flaws but also unexpectedly created rich, textured light-and-shadow patterns when illuminated. This experience taught me that design is not just about pursuing theoretical perfection, but about agile problem-solving within the constraints of CMF and manufacturing realities.'
    },
    tags: [
      'Solidworks',
      'Gemini'
    ],
    gallery: [
      {
        src: 'portfolio/S__27705355_0.jpg',
        caption: {
          zh: '成品-1',
          en: 'Final product-1'
        }
      },
      {
        src: 'portfolio/S__27705357_0.jpg',
        caption: {
          zh: '成品-2',
          en: 'Final product-2'
        }
      }
      // 以下 3 張圖片檔案尚未上傳，收到後補上：
      // { src: 'portfolio/e5121e85-c003-4e54-861b-7fa82bf83292.jpg', caption: { zh: '展示', en: 'Showcase' } },
      // { src: 'portfolio/04a4afc0-75b1-4b49-8a3c-ecf7900aa8b1.jpg', caption: { zh: '3D建模', en: '3D model' } },
      // { src: 'portfolio/形隨機能的純粹展現：包浩斯與工業美學的交會 (1)_page-0001.jpg', caption: { zh: '表板', en: 'Presentation Board' } },
    ]
  }
]

export default portfolioItems
