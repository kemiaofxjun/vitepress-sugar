<template>
  <div id="friend-circle-container">
    与主机通讯中……
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const initialized = ref(false)

// 定义完整的主题变量映射
const themeVariables = {
  light: {
    '--imm-bg-color': 'var(--vp-c-bg)',
    '--imm-card-bg': 'var(--vp-c-bg-soft)',
    '--imm-text-color': 'var(--vp-c-text-1)',
    '--imm-text-light': 'var(--vp-c-text-2)',
    '--imm-border-color': 'var(--vp-c-divider)',
    '--imm-meta-color': 'var(--vp-c-text-3)',
    '--imm-hover-color': 'var(--vp-c-gray-light-1)',
    '--imm-shadow': '0 2px 8px var(--vp-shadow-1)',
    '--imm-brand': 'var(--vp-c-brand-1)',
    '--imm-brand-light': 'var(--vp-c-brand-2)',
    '--imm-brand-lighter': 'var(--vp-c-brand-3)',
    '--imm-brand-soft': 'var(--vp-c-brand-soft)'
  },
  dark: {
    '--imm-bg-color': 'var(--vp-c-bg-alt)',
    '--imm-card-bg': 'var(--vp-c-bg-soft)',
    '--imm-text-color': 'var(--vp-c-text-1)',
    '--imm-text-light': 'var(--vp-c-text-2)',
    '--imm-border-color': 'var(--vp-c-divider)',
    '--imm-meta-color': 'var(--vp-c-text-3)',
    '--imm-hover-color': 'var(--vp-c-gray-dark-3)',
    '--imm-shadow': '0 2px 8px var(--vp-shadow-2)',
    '--imm-brand': 'var(--vp-c-brand-1)',
    '--imm-brand-light': 'var(--vp-c-brand-2)',
    '--imm-brand-lighter': 'var(--vp-c-brand-3)',
    '--imm-brand-soft': 'var(--vp-c-brand-soft)'
  }
}

// 应用主题变量
const applyTheme = (isDarkMode) => {
  const container = document.getElementById('friend-circle-container')
  if (!container) return
  
  const theme = isDarkMode ? 'dark' : 'light'
  const variables = themeVariables[theme]
  
  Object.entries(variables).forEach(([key, value]) => {
    container.style.setProperty(key, value)
  })
  
  // 强制重新渲染朋友圈组件
  if (window.imm && typeof window.imm.init === 'function') {
    window.imm.init()
  }
}

// 加载朋友圈资源
const loadFriendCircle = async () => {
  if (initialized.value) return
  
  // 确保 UserConfig 已定义
  if (typeof UserConfig === 'undefined') {
    window.UserConfig = {
      private_api_url: 'https://fc-main.kemeow.top/',
      page_turning_number: 24,
      error_img: 'https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/logo.png',
    }
  }

  // 加载 CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/imm.min.css'
  document.head.appendChild(link)

  // 加载 JS
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/imm.min.js'
    script.onload = () => {
      initialized.value = true
      applyTheme(isDark.value)
      resolve()
    }
    document.body.appendChild(script)
  })
}

// 主题切换监听
watch(isDark, async (newVal) => {
  await nextTick()
  applyTheme(newVal)
})

onMounted(async () => {
  await loadFriendCircle()
  
  // 添加主题变化监听器
  const observer = new MutationObserver(() => {
    applyTheme(isDark.value)
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<style scoped>
#friend-circle-container {
  min-height: 100px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--imm-bg-color);
  transition: all 0.5s ease;
}

/* 深度覆盖朋友圈组件样式 */
#friend-circle-container :deep(.imm) {
  background-color: var(--imm-bg-color) !important;
  color: var(--imm-text-color) !important;
}

#friend-circle-container :deep(.imm-post) {
  background-color: var(--imm-card-bg) !important;
  color: var(--imm-text-color) !important;
  border: 1px solid var(--imm-border-color) !important;
  box-shadow: var(--imm-shadow) !important;
  transition: all 0.5s ease !important;
}

#friend-circle-container :deep(.imm-post:hover) {
  background-color: var(--imm-hover-color) !important;
}

#friend-circle-container :deep(.imm-post-info),
#friend-circle-container :deep(.imm-post-content) {
  color: var(--imm-text-color) !important;
}

#friend-circle-container :deep(.imm-post-meta) {
  color: var(--imm-meta-color) !important;
}

#friend-circle-container :deep(.imm-post-title a) {
  color: var(--imm-brand) !important;
}

#friend-circle-container :deep(.imm-post-title a:hover) {
  color: var(--imm-brand-light) !important;
}

#friend-circle-container :deep(.imm-header) {
  border-bottom-color: var(--imm-border-color) !important;
}

#friend-circle-container :deep(.imm-footer) {
  border-top-color: var(--imm-border-color) !important;
}

#friend-circle-container :deep(.imm-button) {
  background-color: var(--imm-brand-soft) !important;
  color: var(--imm-text-color) !important;
}

#friend-circle-container :deep(.imm-button:hover) {
  background-color: var(--imm-brand-lighter) !important;
}
</style>