<template>
  <div class="base-card">
    <h3 class="card-title">
      <a :href="article.url">{{ article.title }}</a>
    </h3>
    <div class="card-content">
      <p class="card-description">
        {{ article.excerpt }}
      </p>
      <p>
        <strong>标签：</strong>
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="tag"
          @click="goToTag(tag)"
        >
          {{ tag }}
        </span>
      </p>
      <p><strong>发布日期：</strong> {{ article.date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "../data/posts";

interface Props {
  article: Post;
}

defineProps<Props>();

// 跳转到站内搜索
const goToTag = (tagName: string) => {
  if (typeof window !== "undefined") {
    // 触发VitePress搜索功能
    const searchButton = document.querySelector(
      '.DocSearch-Button, .VPNavBarSearchButton, [aria-label="Search"]'
    ) as HTMLElement;
    if (searchButton) {
      // 点击搜索按钮打开搜索
      searchButton.click();

      // 延迟填入搜索词
      setTimeout(() => {
        const searchInput = document.querySelector(
          '.DocSearch-Input, input[type="search"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.value = tagName;
          searchInput.focus();
          // 触发输入事件
          const event = new Event("input", { bubbles: true });
          searchInput.dispatchEvent(event);
        }
      }, 100);
    } else {
      // 使用键盘快捷键作为备选
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);

      setTimeout(() => {
        const searchInput = document.querySelector(
          '.DocSearch-Input, input[type="search"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.value = tagName;
          searchInput.focus();
        }
      }, 200);
    }
  }
};
</script>

<style scoped>
.base-card {
  margin-bottom: 1.5rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.card-title a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.card-title a:hover {
  color: var(--vp-c-brand-1);
}

.card-content {
  padding: 0;
}

.card-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.tag {
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
}

.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(139, 126, 216, 0.3);
}
</style>
