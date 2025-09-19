---
title: 记录对头像框的修改
categories:
  - 主题修改
tags:
  - 主题修改
  - 头像框
date: 2025-09-17 16:45:10
description: 记录对头像框的修改，小白问ai，ai给的解决方案
---
## 仅供自用，不保证兼容性

### 非pnpm用户
1. 进入目标包目录
```bash
   cd node_modules/@sugarat/theme
```

2. 直接修改源码
直接修改并保存

3. 生成补丁文件
```bash
   npx patch-package @sugarat/theme
```
这会在项目根目录生成 `patches/@sugarat+theme+版本号.patch`
4. 在 package.json 中添加 postinstall 脚本
```json
   {
     "scripts": {
       "postinstall": "patch-package"
     }
   }
```
效果：每次 `pnpm install` 后自动应用修改.

我的修改代码：
```vue
<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useBlogConfig, useGlobalAuthor, useHomeConfig } from '../composables/config/blog'

const home = useHomeConfig()
const { frontmatter, site } = useData()
const globalAuthor = useGlobalAuthor()
const author = computed(() =>
  frontmatter.value.author
  ?? frontmatter.value?.blog?.author
  ?? home?.value?.author
  ?? globalAuthor?.value
)
const logo = computed(() =>
  frontmatter.value?.logo
  ?? frontmatter.value?.blog?.logo
  ?? home?.value?.logo
  ?? site.value?.themeConfig?.logo
  ?? '/logo.png'
)
const frame = computed(() => 
  frontmatter.value?.avatarFrame
  ?? home?.value?.avatarFrame
  ?? 'https://imgbed.kemeow.top/file/img/custom/1758082543694_photo_2025-09-17_10-11-53.png' // 替换为你自己的头像框图片网址
)
const show = computed(() => author.value || logo.value)
</script>

<template>
  <div v-if="show" class="blog-author">
    <div class="avatar-container">
      <img class="avatar-frame" :src="withBase(frame)" alt="avatar frame">
      <img class="avatar" :src="withBase(logo)" alt="avatar">
    </div>
    <p v-if="author">
      {{ author }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.blog-author {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 10px auto;

    .avatar-frame {
      position: absolute;
      top: 0;
      left: -2px;
      width: 100%;
      height: 100%;
      z-index: 2;
      object-fit: contain;
      transform: scale(1.148); /* 放大14.8% */
    }

    .avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: rgba(var(--bg-gradient-home));
      z-index: 1;
    }

    &:hover .avatar {
      transform: translate(-50%, -50%) rotate(666turn);
      transition-duration: 59s;
      transition-timing-function: cubic-bezier(.34, 0, .84, 1);
    }
  }

  p {
    text-align: center;
  }
}
</style>
```

### pnpm用户

1. 安装patch-package包
```bash
   pnpm add -D patch-package
```

2. 生成临时编辑目录（会输出目录路径）
```bash
pnpm patch @sugarat/theme
```
然后进入`node_modules/.pnpm_patches/`里面修改
这会在项目根目录生成 patches/@sugarat+theme+版本号.patch，并自动在 package.json 中添加安装后脚本。

3. 提交更改

类似下方代码
```bash
pnpm patch-commit "D:\kemiaofxjun-sugar-blog\my-blog\node_modules\.pnpm_patches\@sugarat\theme@0.5.6"
```

4. 使用正确路径 git add
```bash
git add "patches/@sugarat__theme@0.5.6.patch"

// 或者
git add patches/*.patch
```

5. 提交并推送
```bash
git commit -m "feat: patch @sugarat/theme@0.5.6 修改主题组件样式"
```

6. 推送到远端
```bash
git push
```

7. 验证
删除本地的node_modules和lock文件，重新安装依赖
```bash
pnpm install
pnpm dev
```

### 使用包

根据作者的[issue](https://github.com/ATQQ/sugar-blog/issues/369)，不fork的话，就使用`CSS 隐藏原组件 + Slot 插入自定义组件`的方式。

具体还是把相应要用到的组件全放到本地的相关目录里，然后修改目标组件，然后在自定义css里添加隐藏原组件的样式。

```CSS
/* 隐藏原主题的作者组件 */
.blog-author {
  display: none !important;
}

/* 调整自定义组件位置 */
.custom-author {
  margin: 20px auto;
  text-align: center;
}
```