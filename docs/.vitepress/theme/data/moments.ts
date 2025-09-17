export interface MomentItem {
  id: string
  author?: {
    name: string
    avatar: string
    badges?: string[]
  }
  content: string
  images?: string[]
  location?: string
  createdAt: string // "2025-09-11 12:30"
}

const raw: MomentItem[] = [
  {
    id: '1',
    content: '测试',
    location: '南京市',
    createdAt: '2025-09-11 12:30',
  },
  {
    id: '2',
    content: '测试图片',
    images: ['https://imgbed.kemeow.top/file/pLwwWj8Y.jpg'],
    location: '南京市',
    createdAt: '2025-09-11 14:46',
  },
]

// 倒序，最新的在前
export const moments: MomentItem[] = raw
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map(m => ({
    ...m,
    author: m.author ?? {
      name: '克喵爱吃卤面',
      avatar: 'https://img.314926.xyz/images/2025/09/15/kemiaoaclumian.webp',
      badges: ['阁主'],
    },
  }))