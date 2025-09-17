<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

/* ---------- Props ---------- */
const props = withDefaults(defineProps<{
  avatar?: string
  name?: string
  limit?: number
  baseURL?: string
}>(), {
  avatar: 'https://img.314926.xyz/images/2025/09/15/kemiaoaclumian.webp',
  name: '克喵爱吃卤面',
  limit: 10,
  baseURL: 'https://qexo.kemeow.top',
})

/* ---------- 深色适配 ---------- */
const { isDark } = useData()

/* ---------- 动态加载 CSS / JS ---------- */
const ID_CSS = 'talk-css'
const ID_JS  = 'talk-js'

function loadTalk() {
  /* 1. 样式表只插一次 */
  if (!document.getElementById(ID_CSS)) {
    const link = document.createElement('link')
    link.id   = ID_CSS
    link.rel  = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/css/qexo-talk/talk.css'
    document.head.appendChild(link)
  }

  /* 2. 全局变量存在就跳过脚本插入，直接初始化 */
  if ((window as any).myQexoShouts) {
    initTalk()
    return
  }

  /* 3. 脚本也只插一次 */
  if (!document.getElementById(ID_JS)) {
    const scr = document.createElement('script')
    scr.id   = ID_JS
    scr.src  = 'https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/js/qexo-talk/talk.js'
    scr.onload = initTalk
    document.head.appendChild(scr)
  } else {
    initTalk()
  }
}

function initTalk() {
  nextTick(() => {
    const container = document.getElementById('my-shouts-container')
    if (!container) return

    container.innerHTML = ''
    container.classList.toggle('dark', isDark.value)

    /* 正确对象名：myQexoShouts */
    ;(window as any).myQexoShouts?.init?.({
      el: '#my-shouts-container',
      avatar: props.avatar,
      name: props.name,
      limit: props.limit,
      baseURL: props.baseURL,
    }).catch((e: Error) => console.error('[memos] 加载失败:', e))
  })
}

/* ---------- 生命周期 ---------- */
onMounted(() => {
  loadTalk()
  /* 主题切换时同步 dark 类 */
  watch(isDark, () => {
    const container = document.getElementById('my-shouts-container')
    if (container) container.classList.toggle('dark', isDark.value)
  })
})
</script>

<template>
  <div id="my-shouts-container" />
</template>

<style scoped>
/* 让容器在 VP 主题下更协调 */
#my-shouts-container {
  margin: 2rem 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
}
</style>