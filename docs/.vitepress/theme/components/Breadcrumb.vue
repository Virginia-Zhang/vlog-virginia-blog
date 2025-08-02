<!--
  面包屑导航组件 (Breadcrumb)
  
  功能特性:
  - 自动根据页面路径生成面包屑导航
  - 支持多语言 (中文、英文、日文)
  - 响应式设计，适配移动端和桌面端
  - 主题适配，支持浅色和深色模式
  - 智能标题显示，使用页面标题作为最后一级
  
  文件依赖:
  - ../data/breadcrumb-config.ts: 路径映射和多语言配置
  - ../styles/variables.css: CSS 变量定义
  
  使用方法:
  - 自动集成到所有文档页面
  - 可通过 <Breadcrumb /> 手动使用
-->

<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length > 0">
    <ol class="breadcrumb-list">
      <li
        class="breadcrumb-item"
        v-for="(item, index) in breadcrumbs"
        :key="index"
      >
        <template v-if="index === breadcrumbs.length - 1">
          <!-- 当前页面，不显示链接 -->
          <span class="breadcrumb-current">
            <svg
              v-if="index === 0"
              class="breadcrumb-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            {{ item.text }}
          </span>
        </template>
        <template v-else>
          <!-- 其他页面，显示链接 -->
          <a :href="item.link" class="breadcrumb-link">
            <svg
              v-if="index === 0"
              class="breadcrumb-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            {{ item.text }}
          </a>
          <span class="breadcrumb-separator">/</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useData } from "vitepress";
import { pathMap, langMap } from "../data/breadcrumb-config";

const route = useRoute();
const { page, site, lang } = useData();

// 根据路径生成面包屑数据
const breadcrumbs = computed(() => {
  const path = route.path;
  const segments = path.split("/").filter(Boolean);
  const result = [];

  // 添加首页
  const homeText = langMap[lang.value]?.["首页"] || "首页";
  result.push({
    text: homeText,
    link: "/",
  });

  // 根据路径段生成面包屑
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // 跳过语言前缀
    if (index === 0 && ["en", "ja"].includes(segment)) {
      return;
    }

    // 获取面包屑文本
    const text = getBreadcrumbText(segment, currentPath);

    // 应用多语言翻译
    const translatedText = langMap[lang.value]?.[text] || text;

    result.push({
      text: translatedText,
      link: currentPath,
    });
  });

  // 如果是文章页面，使用页面标题替换最后一个面包屑
  if (page.value.title && result.length > 1) {
    result[result.length - 1].text = page.value.title;
  }

  return result;
});

// 根据路径段获取显示文本
function getBreadcrumbText(segment, fullPath) {
  // 如果是文章页面，尝试从页面标题获取
  if (segment.includes(".md") || segment.includes("-")) {
    // 移除文件扩展名和连字符
    const cleanSegment = segment.replace(/\.md$/, "").replace(/-/g, " ");
    return cleanSegment.charAt(0).toUpperCase() + cleanSegment.slice(1);
  }

  return pathMap[segment] || segment;
}
</script>

<style scoped>
@import "../styles/variables.css";

.breadcrumb {
  margin: 1.5rem 0 1rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  gap: 0.25rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  position: relative;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: none;
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}

.breadcrumb-separator {
  margin: 0 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 300;
  user-select: none;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .breadcrumb {
    margin: 1rem 0 0.5rem 0;
    padding: 0.75rem 0;
  }

  .breadcrumb-list {
    font-size: 0.8rem;
    gap: 0.125rem;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    padding: 0.125rem 0.375rem;
  }

  .breadcrumb-icon {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.25rem;
  }

  .breadcrumb-separator {
    margin: 0 0.5rem;
  }
}

/* 暗色模式特殊样式 */
.dark .breadcrumb-link:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark .breadcrumb-current {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
