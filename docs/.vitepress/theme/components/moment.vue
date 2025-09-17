<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { MomentItem } from '../data/moments'
import { moments } from '../data/moments'

/* ---------------- props & 常量 ---------------- */
const pageSize = 5

/* ---------------- 响应式数据 ---------------- */
const currentPage = ref(1)
const showPreview = ref(false)
const currentPhoto = ref('')
const currentPhotoIndex = ref(0)
const currentMomentImages = ref<string[]>([])

/* ---------------- 计算属性 ---------------- */
const totalPages = computed(() => Math.ceil(moments.length / pageSize))
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return moments.slice(start, start + pageSize)
})

/* ---------------- 时间格式化 ---------------- */
function formatTime(d: string) {
  return new Date(d)
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Shanghai',
    })
    .replace(/\//g, '-')
    .replace(',', '')
}

/* ---------------- 图片预览 ---------------- */
function openPhotoPreview(src: string, list: string[], idx: number) {
  currentPhoto.value = src
  currentMomentImages.value = list
  currentPhotoIndex.value = idx
  showPreview.value = true
}
function closePhotoPreview() {
  showPreview.value = false
}
function nextPhoto() {
  const len = currentMomentImages.value.length
  if (len <= 1) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % len
  currentPhoto.value = currentMomentImages.value[currentPhotoIndex.value]
}
function prevPhoto() {
  const len = currentMomentImages.value.length
  if (len <= 1) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + len) % len
  currentPhoto.value = currentMomentImages.value[currentPhotoIndex.value]
}

/* ---------------- 键盘事件 ---------------- */
function onKeydown(e: KeyboardEvent) {
  if (!showPreview.value) return
  if (e.key === 'Escape') closePhotoPreview()
  else if (e.key === 'ArrowRight') nextPhoto()
  else if (e.key === 'ArrowLeft') prevPhoto()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="moments-page">
    <div class="container">
      <h1 class="page-title">即刻</h1>

      <div class="moments-grid">
        <article v-for="m in paginatedMoments" :key="m.id" class="moment-card">
          <!-- 头部 -->
          <div class="moment-header">
            <img class="author-avatar" :src="m.author?.avatar" :alt="m.author?.name" />
            <div class="author-info">
              <div class="author-main">
                <h3 class="author-name">{{ m.author?.name }}</h3>
                <span v-for="b in m.author?.badges" :key="b" class="badge">{{ b }}</span>
              </div>
              <div class="meta-info">
                <time>{{ formatTime(m.createdAt) }}</time>
                <template v-if="m.location">
                  <span class="separator">·</span>
                  <span>{{ m.location }}</span>
                </template>
              </div>
            </div>
          </div>

          <!-- 内容 -->
          <div class="moment-content">
            <p class="moment-text">{{ m.content }}</p>

            <!-- 图片 -->
            <div
              v-if="m.images?.length"
              class="moment-images"
              :class="{ single: m.images.length === 1, grid: m.images.length > 1 }"
            >
              <img
                v-for="(img, idx) in m.images"
                :key="idx"
                :src="img"
                class="moment-image"
                @click="openPhotoPreview(img, m.images!, idx)"
              />
            </div>
          </div>
        </article>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
      </div>
    </div>

    <!-- 图片预览 -->
    <Teleport to="body">
      <div v-if="showPreview" class="photo-mask" @click="closePhotoPreview">
        <div class="photo-box" @click.stop>
          <button class="close-btn" aria-label="关闭" @click="closePhotoPreview">✕</button>

          <button v-if="currentMomentImages.length > 1" class="nav-btn prev" @click="prevPhoto">‹</button>
          <img class="photo" :src="currentPhoto" />
          <button v-if="currentMomentImages.length > 1" class="nav-btn next" @click="nextPhoto">›</button>

          <div v-if="currentMomentImages.length > 1" class="counter">
            {{ currentPhotoIndex + 1 }} / {{ currentMomentImages.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ==========  使用 VitePress 官方变量  ========== */
.moments-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
}

.moments-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.moment-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}
.moment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.moment-header {
  display: flex;
  gap: 0.75rem;
}
.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-divider);
}
.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}
.author-info {
  flex: 1;                     /* 占满右侧 */
  display: flex;               /* 竖直排列两行 */
  flex-direction: column;
  gap: 0.25rem;
}
.author-main {
  display: flex;
  align-items: center;
  /* 去掉 justify-content: space-between; */
  gap: 0.5rem;        /* 名称与徽章之间留点空隙 */
}
.badge {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  border-radius: 4px;
  margin-left: 0.5rem;   /* 与名称拉开一点 */
}
.meta-info {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  /* 去掉 margin-left: auto; */
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.separator {
  margin: 0 0.25rem;
}

.moment-text {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.moment-images.single img {
  width: 100%;
  border-radius: 8px;
  max-height: 400px;
  object-fit: cover;
  cursor: zoom-in;
}
.moment-images.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.moment-images.grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  cursor: zoom-in;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
.pagination button {
  border: 1px solid var(--vp-c-brand);
  background: transparent;
  color: var(--vp-c-brand);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.pagination button:hover:not(:disabled) {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ==========  预览蒙层  ========== */
.photo-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.photo-box {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: var(--vp-c-bg);
  border-radius: 1rem;
  overflow: hidden;
}
.photo {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}
.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
}
.nav-btn.prev {
  left: 0.75rem;
}
.nav-btn.next {
  right: 0.75rem;
}
.counter {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 0.375rem 1rem;
  border-radius: 1rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 640px) {
  .moment-images.grid {
    grid-template-columns: 1fr;
  }
}
</style>