<template>
  <div class="anime-wall">
    <div v-for="a in animes" :key="a.url" class="anime-card">
      <img
        :src="a.cover"
        :alt="a.name"
        class="cover"
        @error="(e: { currentTarget: HTMLImageElement }) => (e.currentTarget as HTMLImageElement).src = '/animes/placeholder.svg'"
      />
      <div class="meta">
        <h3 class="name">{{ a.name }}</h3>
        <p class="author">🎬 {{ a.author }}</p>
        <p class="intro">{{ a.intro }}</p>
        <div class="footer">
          <div class="rate">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(a.rate / 2) }">★</span>
            <span class="score">{{ a.rate.toFixed(1) }}</span>
          </div>
          <a class="detail-btn" :href="a.url" target="_blank" rel="noopener noreferrer">
            📺 详情
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animes } from '../data/anime'
</script>

<style scoped>
.anime-wall {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 2rem 0;
}

.anime-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.anime-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.cover {
  width: 100%;
  aspect-ratio: 10 / 14;
  object-fit: cover;
  border-bottom: 1px solid var(--vp-c-divider);
}

.meta {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.author {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.intro {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.rate {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  font-size: 1rem;
  color: var(--vp-c-border);
}
.star.filled {
  color: var(--vp-c-brand);
}
.score {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-left: 4px;
}

.detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  font-size: 0.9rem;
  border-radius: 6px;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-neutral-inverse);
  text-decoration: none;
  transition: background-color 0.2s;
}
.detail-btn:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>
