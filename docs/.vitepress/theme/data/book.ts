export interface BookItem {
  cover: string
  name: string
  /** 新增：作者 */
  author: string
  intro: string
  rate: number
  url: string
}

export const books: BookItem[] = [
  {
    cover: 'https://imgbed.kemeow.top/file/img/custom/1758198890681_image.png',
    name: '诡秘之主',
    author: '爱潜水的乌贼',
    intro: '我们是守护者，也是一群时刻对抗着危险和疯狂的可怜虫。',
    rate: 9.7,
    url: 'https://book.douban.com/subject/33424453/'
  },
//   {
//     cover: '/books/js4.jpg',
//     name: 'JavaScript 高级程序设计（第 4 版）',
//     author: 'Matt Frisbie',
//     intro: '前端必读，系统梳理 JS 核心与浏览器原理。',
//     rate: 9.1,
//     url: 'https://book.douban.com/subject/35107890/'
//   }
  // …继续追加
]