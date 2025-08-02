# 首页内容组件

## 概述

`HomeContent` 组件是网站首页的核心内容展示组件，提供最新文章列表和热门标签展示功能。该组件采用网格布局设计，支持分页浏览和响应式适配。

## 功能特性

- 📰 **最新文章展示**: 分页显示最新博客文章
- 🏷️ **热门标签分类**: 按类别展示热门标签
- 📱 **响应式设计**: 适配移动端和桌面端
- 🎨 **主题适配**: 支持明亮和暗黑主题
- ⚡ **动画效果**: 文章卡片淡入动画
- 🔄 **分页导航**: 支持文章分页浏览
- 🎯 **交互反馈**: 悬停效果和状态反馈

## 使用方法

### 1. 自动集成

首页内容组件已经自动集成到网站首页，无需手动添加。

### 2. 手动使用

如果需要手动在特定页面使用该组件，可以在 Vue 组件中使用：

```vue
<template>
  <div>
    <HomeContent />
  </div>
</template>

<script setup>
import HomeContent from "./HomeContent.vue";
</script>
```

## 组件结构

### 布局设计

组件采用两栏网格布局：

- **左侧 (2fr)**: 最新文章区域
- **右侧 (1fr)**: 热门标签区域

### 文章卡片

每个文章卡片包含以下信息：

- **标题**: 文章标题，支持链接跳转
- **元信息**: 发布日期、分类、阅读时间
- **摘要**: 文章内容摘要
- **标签**: 文章相关标签

### 分页组件

分页组件包含：

- **上一页/下一页按钮**: 带禁用状态
- **页码按钮**: 显示所有页码
- **当前页高亮**: 当前页码特殊样式

## 标签分类

组件支持多种标签分类，每种分类使用不同的颜色主题：

### 标签类别

| 分类     | 颜色主题 | 说明         |
| -------- | -------- | ------------ |
| 前端开发 | 蓝色系   | 前端技术相关 |
| 后端开发 | 绿色系   | 后端技术相关 |
| 运维浅谈 | 橙色系   | 运维技术相关 |
| 外语学习 | 紫色系   | 语言学习相关 |
| 生活切片 | 粉色系   | 生活感悟相关 |

### 标签样式

每个标签类别都有独特的颜色搭配：

```css
/* 前端开发标签 - 蓝色系 */
.hot-tag.frontend {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.2);
}

/* 后端开发标签 - 绿色系 */
.hot-tag.backend {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.2);
}
```

## 数据源

组件使用以下数据源：

### 文章数据

- **数据文件**: `../data/posts.ts`
- **类型定义**: `Post` 接口
- **分页函数**: `getPostsByPage()`, `getTotalPages()`

### 标签数据

- **数据文件**: `../data/tags.ts`
- **类型定义**: `Tag` 接口
- **分类函数**: `getTagsByCategory()`, `getCategories()`

## 响应式设计

### 桌面端 (≥960px)

- 两栏网格布局
- 完整显示所有内容
- 标准间距和字体大小

### 平板端 (768px-959px)

- 单栏布局
- 调整间距和字体大小
- 优化触摸交互

### 移动端 (≤767px)

- 单栏布局
- 紧凑间距
- 分页组件垂直排列
- 标签字体缩小

## 动画效果

### 文章卡片动画

```css
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
```

### 交互效果

- **文章卡片悬停**: 上移效果和阴影
- **标签悬停**: 颜色变化和上移效果
- **按钮悬停**: 边框和背景色变化

## 主题适配

组件使用 VitePress 主题变量，自动适配明亮和暗黑主题：

### 明亮主题

- 浅色背景和边框
- 深色文字
- 品牌色强调

### 暗黑主题

- 深色背景和边框
- 浅色文字
- 品牌色强调

## 分页功能

### 分页逻辑

- 自动计算总页数
- 当前页状态管理
- 边界检查（第一页/最后一页）

### 分页组件

```vue
<div class="pagination">
  <button class="pagination-btn" :disabled="currentPage === 1">
    上一页
  </button>
  <div class="page-numbers">
    <button v-for="page in totalPages" :key="page" class="page-number">
      {{ page }}
    </button>
  </div>
  <button class="pagination-btn" :disabled="currentPage === totalPages">
    下一页
  </button>
</div>
```

## 样式定制

可以通过 CSS 变量或覆盖样式进行定制：

```css
/* 自定义网格布局 */
.content-grid {
  grid-template-columns: 3fr 1fr; /* 调整左右比例 */
  max-width: 1400px; /* 调整最大宽度 */
}

/* 自定义文章卡片样式 */
.blog-card {
  border-radius: 12px; /* 调整圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 自定义阴影 */
}

/* 自定义标签颜色 */
.hot-tag.custom-category {
  background: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  border-color: rgba(255, 0, 0, 0.2);
}
```

## 性能优化

- **虚拟滚动**: 大量文章时的性能优化
- **懒加载**: 图片和内容的懒加载
- **动画优化**: 使用 CSS 动画而非 JavaScript
- **内存管理**: 及时清理事件监听器

## 可访问性

- **语义化 HTML**: 使用合适的标签结构
- **键盘导航**: 支持键盘操作
- **屏幕阅读器**: 提供适当的 ARIA 标签
- **颜色对比**: 确保足够的颜色对比度

## 注意事项

- 确保数据文件正确配置
- 分页大小需要与数据源匹配
- 标签分类需要与数据保持一致
- 响应式断点需要与整体设计协调
