export interface AnimeItem {
  cover: string
  name: string
  /** 原作 / 制作公司 / 导演等 */
  author: string
  intro: string
  /** 0-10 分 */
  rate: number
  /** 外链详情页 */
  url: string
}

export const animes: AnimeItem[] = [
  {
    cover: 'https://lain.bgm.tv/r/400/pic/cover/l/ae/c8/246001_RmCfM.jpg',
    name: '我的三体 章北海传',
    author: '神游八方',
    intro: '故事发生在从近未来到两百年后的历史跨度上，地球文明被三体用一种叫做智子的超级科技锁死，基础研究因而停滞不前。但人类仍然需要在此基础上不断前进来抵御即将到来的三体人的进攻，守卫自己的家园和人类文明。在更广大的基础上，三体文明和人类文明都是黑暗森林下的猎手，小心翼翼的保护好自己并且清理别人，为文明的存续而挣扎。',
    rate: 9.3,
    url: 'https://bangumi.tv/subject/246001'
  },
//   {
//     cover: '/animes/steinsgate.jpg',
//     name: 'Steins;Gate',
//     author: 'WHITE FOX',
//     intro: '中二科学家用微波炉发短信拯救世界的时空悬疑剧。',
//     rate: 9.2,
//     url: 'https://bgm.tv/subject/975'
//   }
  // …继续追加
]