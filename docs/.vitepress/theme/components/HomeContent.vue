<template>
  <div class="home-content">
    <div class="content-grid">
      <!-- 最新文章区域 -->
      <div class="recent-posts-section">
        <h2>最新文章</h2>
        <div class="recent-posts">
          <div
            v-for="(post, index) in currentPagePosts"
            :key="post.id"
            class="blog-card fade-in-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <h3>
              <a :href="post.url">{{ post.title }}</a>
            </h3>
            <div class="meta">
              <span>{{ post.date }}</span> · <span>{{ post.category }}</span> ·
              <span>{{ post.readTime }}</span>
            </div>
            <p class="excerpt">{{ post.excerpt }}</p>
            <div class="tags">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="tag"
                @click="goToTag(tag)"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- 分页组件 -->
        <div class="pagination">
          <button
            class="pagination-btn"
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            上一页
          </button>

          <div class="page-numbers">
            <button
              v-for="page in totalPages"
              :key="page"
              class="page-number"
              :class="{ active: page === currentPage }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="pagination-btn"
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            下一页
          </button>
        </div>
      </div>

      <!-- 热门标签区域 -->
      <div class="hot-tags-section">
        <h2>热门标签</h2>
        <div class="hot-tags">
          <div
            v-for="category in tagCategories"
            :key="category"
            class="tag-group"
          >
            <span
              v-for="tag in getTagsByCategory(category)"
              :key="tag.name"
              class="hot-tag"
              :class="category"
              @click="goToTag(tag.name)"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getTotalPages, getPostsByPage, type Post } from "../data/posts";
import { getTagsByCategory, getCategories, type Tag } from "../data/tags";

// 分页状态
const currentPage = ref(1);
const totalPages = getTotalPages();

// 计算当前页面的文章
const currentPagePosts = computed<Post[]>(() => {
  return getPostsByPage(currentPage.value);
});

// 标签相关
const tagCategories = getCategories();

// 切换页面
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
  }
};

// 跳转到站内搜索
const goToTag = (tagName: string) => {
  if (typeof window !== "undefined") {
    // 触发VitePress搜索功能
    // 首先尝试触发搜索弹窗
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
      // 如果找不到搜索按钮，使用键盘快捷键
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);

      // 延迟填入搜索词
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
.home-content {
  margin: 2rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.recent-posts-section,
.hot-tags-section {
  background: rgba(139, 126, 216, 0.05);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
}

.recent-posts-section h2,
.hot-tags-section h2 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-brand-1);
  padding-bottom: 0.5rem;
}

/* 最新文章样式 */
.recent-posts .blog-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(226, 232, 240, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}

.recent-posts .blog-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 126, 216, 0.15);
}

.recent-posts .blog-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.recent-posts .blog-card a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.recent-posts .blog-card a:hover {
  color: var(--vp-c-brand-1);
}

.recent-posts .blog-card .meta {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.recent-posts .blog-card .excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.recent-posts .blog-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.recent-posts .blog-card .tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.recent-posts .blog-card .tag:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-border);
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.pagination-btn:hover:not(.disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.page-number:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.page-number.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.page-number.active:hover {
  background: var(--vp-c-brand-2);
}

/* 热门标签样式 */
.hot-tags {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.hot-tag {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.hot-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* 前端开发标签 - 蓝色系 */
.hot-tag.frontend {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.2);
}

.hot-tag.frontend:hover {
  background: #3b82f6;
  color: white;
}

/* 后端开发标签 - 绿色系 */
.hot-tag.backend {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.2);
}

.hot-tag.backend:hover {
  background: #22c55e;
  color: white;
}

/* 运维浅谈标签 - 橙色系 */
.hot-tag.devops {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  border-color: rgba(249, 115, 22, 0.2);
}

.hot-tag.devops:hover {
  background: #f97316;
  color: white;
}

/* 外语学习标签 - 紫色系 */
.hot-tag.language {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
  border-color: rgba(168, 85, 247, 0.2);
}

.hot-tag.language:hover {
  background: #a855f7;
  color: white;
}

/* 生活切片标签 - 粉色系 */
.hot-tag.life {
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
  border-color: rgba(236, 72, 153, 0.2);
}

.hot-tag.life:hover {
  background: #ec4899;
  color: white;
}

/* 项目杂谈标签 - 青色系 */
.hot-tag.projects {
  background: rgba(6, 182, 212, 0.1);
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.2);
}

.hot-tag.projects:hover {
  background: #06b6d4;
  color: white;
}

/* 动画效果 */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .recent-posts-section,
  .hot-tags-section {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .home-content {
    margin: 1.5rem 0;
  }

  .content-grid {
    gap: 1rem;
  }

  .recent-posts-section h2,
  .hot-tags-section h2 {
    font-size: 1.3rem;
  }

  .recent-posts .blog-card {
    padding: 0.8rem;
  }

  .hot-tag {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .pagination {
    flex-direction: column;
    gap: 0.8rem;
  }

  .page-numbers {
    order: -1;
  }

  .vp-doc h2 {
    border-top: none;
    padding-top: 0;
  }
}

/* 深色模式下的背景色覆盖 */
:root[class*="dark"] .recent-posts-section,
:root[class*="dark"] .hot-tags-section {
  background: rgba(139, 126, 216, 0.1);
}

:root[class*="dark"] .recent-posts .blog-card {
  background: rgba(71, 85, 105, 0.3);
}
</style>
