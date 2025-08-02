# 面包屑导航组件 (Breadcrumb)

## 概述

面包屑导航组件是一个自动生成的面包屑导航，它会根据当前页面的路径自动生成导航层级，帮助用户了解当前页面在网站中的位置。

## 功能特性

- 🚀 **自动生成**: 根据页面路径自动生成面包屑导航
- 🌍 **多语言支持**: 支持中文、英文、日文三种语言
- 📱 **响应式设计**: 适配移动端和桌面端
- 🎨 **主题适配**: 支持浅色和深色主题
- 📄 **智能标题**: 自动使用页面标题作为最后一级面包屑

## 使用方法

### 1. 自动集成

面包屑组件已经自动集成到所有文章页面中，无需手动添加。它会在以下位置显示：

- 所有文档页面（`.md` 文件）
- 分类页面
- 标签页面

### 2. 手动使用

如果需要手动在特定页面使用面包屑组件，可以在 Markdown 文件中使用：

```vue
<Breadcrumb />
```

## 路径映射

组件会自动将 URL 路径映射为友好的中文名称：

| 路径          | 显示名称 |
| ------------- | -------- |
| `/frontend/`  | 前端开发 |
| `/backend/`   | 后端开发 |
| `/devops/`    | 运维浅谈 |
| `/projects/`  | 项目杂谈 |
| `/languages/` | 外语指北 |
| `/life/`      | 浮生若梦 |
| `/about/`     | 关于     |
| `/friends/`   | 友情链接 |

### 子分类映射

| 路径               | 显示名称 |
| ------------------ | -------- |
| `/frontend/vue/`   | Vue      |
| `/frontend/react/` | React    |
| `/backend/java/`   | Java     |
| `/backend/nodejs/` | NodeJS   |
| `/devops/docker/`  | Docker   |

## 多语言支持

组件支持三种语言：

### 中文 (zh-CN)

```
首页 / 前端开发 / Vue / Vue 3 Composition API 深度解析
```

### 英文 (en)

```
Home / Frontend / Vue / Vue 3 Composition API Deep Dive
```

### 日文 (ja)

```
ホーム / フロントエンド / Vue / Vue 3 Composition API 深度解析
```

## 样式定制

面包屑组件使用 CSS 变量，可以通过以下方式定制样式：

```css
:root {
  --vp-c-divider: #e2e8f0; /* 分隔线颜色 */
  --vp-c-text-1: #1a202c; /* 主要文本颜色 */
  --vp-c-text-2: #4a5568; /* 次要文本颜色 */
  --vp-c-text-3: #718096; /* 分隔符颜色 */
  --vp-c-brand: #3b82f6; /* 链接颜色 */
  --vp-c-brand-dark: #2563eb; /* 链接悬停颜色 */
}

.dark {
  --vp-c-divider: #2d3748;
  --vp-c-text-1: #f7fafc;
  --vp-c-text-2: #a0aec0;
  --vp-c-text-3: #718096;
  --vp-c-brand: #60a5fa;
  --vp-c-brand-dark: #93c5fd;
}
```

## 响应式设计

- **桌面端**: 完整显示所有面包屑项
- **移动端**: 字体大小和间距自动调整

## 技术实现

- 使用 Vue 3 Composition API
- 基于 VitePress 的路由系统
- 响应式设计，支持暗色模式
- 自动语言检测和翻译

## 示例

访问 `/frontend/vue/vue3-composition-api` 页面时，面包屑会显示：

```
首页 / 前端开发 / Vue / Vue 3 Composition API 深度解析
```

其中：

- "首页" 链接到 `/`
- "前端开发" 链接到 `/frontend/`
- "Vue" 链接到 `/frontend/vue/`
- "Vue 3 Composition API 深度解析" 是当前页面，不显示链接
