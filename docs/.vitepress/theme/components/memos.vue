<template>
  <div class="memos-container">
    <div id="my-shouts-container" class="shouts-container"></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

// 动态加载CSS和JS
function loadResources() {
  // 检查是否已加载，避免重复加载
  if (document.querySelector('link[href="https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/css/qexo-talk/talk.css"]')) return
  
  // 加载CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/css/qexo-talk/talk.css'
  document.head.appendChild(link)

  // 加载JS
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/js/qexo-talk/talk.js'
  script.onload = initShouts
  document.head.appendChild(script)
}

function initShouts() {
  if (typeof myQexoShouts !== 'undefined') {
    myQexoShouts.init({
      el: "#my-shouts-container", 
      avatar: "https://img.314926.xyz/images/2025/09/15/kemiaoaclumian.webp",
      name: "克喵爱吃卤面",
      limit: 10,
      baseURL: "https://qexo.kemeow.top",
    }).catch(function(error) {
      console.error("加载过程中出现问题:", error)
    })
  }
}

// 切换深色模式时更新样式
watch(isDark, (newVal) => {
  const container = document.getElementById('my-shouts-container')
  if (container) {
    newVal ? container.classList.add('dark') : container.classList.remove('dark')
  }
})

onMounted(() => {
  loadResources()
  // 初始化时设置正确的主题类
  if (isDark.value) {
    document.getElementById('my-shouts-container')?.classList.add('dark')
  }
})
</script>

<style>
/**
 * 自定义主题变量
 * 参考: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
 */
:root {
  /* 浅色模式变量 */
  --vp-c-memo-text: var(--vp-c-text-1);
  --vp-c-memo-bg: var(--vp-c-bg);
  --vp-c-memo-border: var(--vp-c-divider);
  --vp-c-memo-card: var(--vp-c-bg-soft);
  --vp-c-memo-time: var(--vp-c-text-2);
  --vp-c-memo-link: var(--vp-c-brand);
  --vp-c-memo-hover: var(--vp-c-brand-hover);
  
  /* 微语卡片阴影 */
  --vp-memo-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark {
  /* 深色模式变量 */
  --vp-c-memo-text: var(--vp-c-text-1);
  --vp-c-memo-bg: var(--vp-c-bg);
  --vp-c-memo-border: var(--vp-c-divider);
  --vp-c-memo-card: var(--vp-c-bg-soft-up);
  --vp-c-memo-time: var(--vp-c-text-2);
  --vp-c-memo-link: var(--vp-c-brand);
  --vp-c-memo-hover: var(--vp-c-brand-hover);
  
  /* 微语卡片阴影 */
  --vp-memo-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* 容器样式 */
.memos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* 微语容器基础样式 */
.shouts-container {
  color: var(--vp-c-memo-text);
  background-color: var(--vp-c-memo-bg);
  transition: all 0.3s ease;
}

/* 以下是针对微语组件的样式覆盖 */
.shouts-container .shout-item {
  background-color: var(--vp-c-memo-card);
  border: 1px solid var(--vp-c-memo-border);
  box-shadow: var(--vp-memo-shadow);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.shouts-container .shout-time {
  color: var(--vp-c-memo-time);
}

.shouts-container a {
  color: var(--vp-c-memo-link);
}

.shouts-container a:hover {
  color: var(--vp-c-memo-hover);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .memos-container {
    padding: 0.5rem;
  }
}
</style>