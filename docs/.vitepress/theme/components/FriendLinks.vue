<template>
  <section class="friends">
    <h2>朋友们</h2>

    <p v-if="loading" class="status">正在加载友链…</p>
    <p v-else-if="error" class="status error">
      加载失败：{{ error }}<br />
      <button @click="fetchLinks">重试</button>
    </p>

    <!-- 统一尺寸卡片 -->
    <div v-else class="grid">
      <a
        v-for="f in list"
        :key="f.url"
        class="card"
        :href="f.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <!-- 仍然用原始头像 -->
        <img :src="f.icon" class="avatar" alt="" />
        <div class="text">
          <div class="name">{{ f.title }}</div>
          <div class="descr">{{ f.description }}</div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Friend { 
  title: string; 
  url: string; 
  icon: string; 
  description: string;
  snapshot?: string;
  feed?: string;
  posts?: Array<{
    title: string;
    link: string;
    published: string;
  }>;
  issue_number?: number;
  labels?: Array<{
    name: string;
    color: string;
    hue: number;
    saturation: number;
    lightness: number;
  }>;
}

const loading = ref(true)
const error  = ref('')
const list   = ref<Friend[]>([])

async function fetchLinks() {
  loading.value = true
  error.value  = ''
  try {
    const res = await fetch('https://friends-api.kemeow.top/v2/data.json')
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    list.value = data.content
  } catch (e: any) {
    error.value = e.message || '未知错误'
  } finally {
    loading.value = false
  }
}
onMounted(fetchLinks)
</script>

<style scoped>
/* ===== 统一变量 ===== */
:root {
  --friends-bg: #ffffff;
  --friends-border: #e5e7eb;
  --friends-text: #111827;
  --friends-sub: #6b7280;
}
.dark {
  --friends-bg: #1f2937;
  --friends-border: #374151;
  --friends-text: #f9fafb;
  --friends-sub: #9ca3af;
}

.friends { margin: 32px 0; }
.status { text-align:center; color: var(--friends-sub); }
.status.error { color:#ef4444; }
.status button {
  margin-top:8px; padding:4px 12px;
  border:1px solid var(--vp-c-brand);
  background:transparent; color:var(--vp-c-brand);
  border-radius:4px; cursor:pointer;
}
.status button:hover{background:var(--vp-c-brand);color:#fff}

/* ===== 固定网格 ===== */
.grid{
  display:flex;
  flex-wrap:wrap;
  gap:16px;               /* 统一间距 */
}
.card{
  width:240px; height:80px;
  display:flex;
  align-items:center;
  padding:0 12px;
  background:var(--friends-bg);
  border:1px solid var(--friends-border);
  border-radius:8px;
  text-decoration:none;
  transition:transform .2s ease-out, border-color .2s ease-out;
}
.card:hover{
  transform:translateY(-2px);
  border-color:var(--vp-c-brand);
}

/* ===== 统一头像样式 ===== */
.avatar{
  width:48px; height:48px;
  border-radius:8px;          /* 正方形圆角 */
  object-fit:cover;           /* 防止变形 */
  flex-shrink:0;
  margin-right:12px;
}

/* ===== 统一文字 ===== */
.text{ flex:1; overflow:hidden; }
.name, .descr{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.name{
  font-size:15px;
  font-weight:600;
  line-height:22px;
  color:var(--friends-text);
}
.descr{
  font-size:13px;
  line-height:18px;
  color:var(--friends-sub);
  margin-top:2px;
}
</style>