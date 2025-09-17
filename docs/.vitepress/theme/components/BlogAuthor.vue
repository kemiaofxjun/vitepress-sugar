<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

// 尝试动态导入原主题的依赖（避免路径问题）
const blogComposables = await import('@sugarat/theme')
const { useBlogConfig, useGlobalAuthor, useHomeConfig } = blogComposables

const home = useHomeConfig()
const { frontmatter, site } = useData()
const globalAuthor = useGlobalAuthor()

// 原逻辑保留
const author = computed(() =>
  frontmatter.value.author ??
  frontmatter.value?.blog?.author ??
  home?.value?.author ??
  globalAuthor?.value
)

const logo = computed(() =>
  frontmatter.value?.logo ??
  frontmatter.value?.blog?.logo ??
  home?.value?.logo ??
  site.value.themeConfig?.logo ??
  withBase('/logo.png')
)

// 新增头像框逻辑
const frame = computed(() =>
  frontmatter.value?.avatarFrame ??
  home?.value?.avatarFrame ??
  withBase('https://imgbed.kemeow.top/file/img/custom/1758082543694_photo_2025-09-17_10-11-53.png')  // 你的头像框图片需放在public目录
)
</script>

<template>
  <div v-if="author || logo" class="blog-author">
    <div class="avatar-container">
      <!-- 头像框 -->
      <img 
        v-if="frame" 
        class="avatar-frame" 
        :src="frame" 
        alt="Avatar Frame"
      >
      <!-- 原头像 -->
      <img 
        class="avatar" 
        :src="logo" 
        alt="Avatar"
      >
    </div>
    <p v-if="author">{{ author }}</p>
  </div>
</template>

<style scoped lang="scss">
.blog-author {
  text-align: center;
  margin: 20px 0;

  .avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;

    .avatar-frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      object-fit: contain;
    }

    .avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      z-index: 1;
      transition: transform 0.3s ease;
    }

    &:hover .avatar {
      transform: translate(-50%, -50%) rotate(666turn);
      transition-duration: 59s;
      transition-timing-function: cubic-bezier(.34, 0, .84, 1);
    }
  }

  p {
    margin-top: 10px;
    font-weight: bold;
  }
}
</style>