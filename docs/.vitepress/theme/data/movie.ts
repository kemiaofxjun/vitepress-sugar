export interface MovieItem {
  cover: string
  name: string
  author: string
  intro: string
  rate: number
  url: string
}

export const movies: MovieItem[] = [
  {
    cover: 'https://img.314926.xyz/images/2025/08/16/guaiqiwuyu.webp',
    name: '怪奇物语',
    author: '米莉·波比·布朗/薇诺娜·瑞德 等等',
    intro: '向征服了一代人的 80 年代经典作品致敬。《怪奇物语》以 1983 年的印第安纳州为背景，一个小男孩莫名其妙地消失了。当朋友、家人和当地警察寻找答案时，他们都被卷入一个非同寻常的谜团，其中涉及绝密的政府实验、恐怖的超自然力量，还有一个非常奇怪的小女孩',
    rate: 9.1,
    url: 'https://movie.douban.com/subject/26359270/'
  },
//   {
//     cover: '/movies/inception.jpg',
//     name: '盗梦空间',
//     author: '克里斯托弗·诺兰',
//     intro: '潜入梦境，植入思想，一场意识与现实的博弈。',
//     rate: 9.3,
//     url: 'https://movie.douban.com/subject/3541415/'
//   }
  // …继续追加
]
