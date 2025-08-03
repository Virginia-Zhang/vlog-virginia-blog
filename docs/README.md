# Vlog-Virginia's Blog

基于 VitePress 和 TypeScript 的个人技术博客，支持中英日三种语言，集成 Giscus 评论功能。设计灵感一部分来源于 Vitepress 主题 [Teek](https://github.com/teekcode/vitepress-theme-teek)，一部分来源于博客 [二丫讲梵](https://wiki.eryajf.net/)。

<!-- ![Blog Preview](./docs/public/images/blog-preview.jpg) -->

## ✨ 特性

- 🎨 **现代化设计** - 基于 VitePress 和 自定义设计样式 的精美界面
- 🌍 **多语言支持** - 支持中文、英文、日文三种语言
- 💬 **评论系统** - 集成 Giscus 评论功能
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌙 **深色模式** - 支持明暗主题切换
- ⚡ **性能优化** - 基于 Vite 的快速构建和热更新
- 🔍 **搜索功能** - 内置全文搜索
- 📊 **SEO 友好** - 优化的元标签和站点地图

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/Virginia-Zhang/vlog-virginia-blog.git
cd vlog-virginia-blog

# 安装依赖
npm install
```

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
vlog-virginia-blog/
├── docs/                           # 文档根目录
│   ├── .vitepress/                 # VitePress 配置
│   │   ├── config.mts              # 主配置文件
│   │   └── theme/                  # 自定义主题
│   │       ├── index.ts            # 主题入口
│   │       ├── custom.css          # 自定义样式
│   │       └── components/         # 自定义组件
│   │           └── GiscusComments.vue
│   │
│   ├── public/                     # 静态资源
│   │   └── images/                 # 图片资源
│   │
│   ├── index.md                    # 首页
│   ├── about.md                    # 关于页面
│   ├── friends.md                  # 友情链接
│   │
│   ├── frontend/                   # 前端开发分类
│   ├── backend/                    # 后端开发分类
│   ├── devops/                     # 运维浅谈分类
│   ├── projects/                   # 项目杂谈分类
│   ├── languages/                  # 外语学习分类
│   ├── life/                       # 生活分享分类
│   │
│   ├── en/                         # 英文版本
│   └── ja/                         # 日文版本
│
├── package.json                    # 项目配置
└── README.md                       # 项目说明
```

## 🔧 配置说明

### 基本配置

编辑 `docs/.vitepress/config.mts` 文件：

```typescript
export default defineConfig({
  title: "Your Blog Title",
  description: "Your blog description",

  // 替换为你的 GitHub 仓库
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/Virginia-Zhang/your-repo" },
    ],
  },
});
```

### Giscus 评论配置

在 `docs/.vitepress/theme/components/GiscusComments.vue` 中配置：

```typescript
const giscusConfig = {
  "data-repo": "Virginia-Zhang/your-repo", // 你的仓库
  "data-repo-id": "your-repo-id", // 仓库 ID
  "data-category": "Announcements", // 讨论分类
  "data-category-id": "your-category-id", // 分类 ID
  // 其他配置...
};
```

获取 Giscus 配置参数：

1. 访问 [Giscus 官网](https://giscus.app/zh-CN)
2. 输入你的仓库信息
3. 复制生成的配置参数

### 多语言配置

项目默认支持中英日三种语言，你可以在配置文件中修改：

```typescript
locales: {
  root: {
    label: '简体中文',
    lang: 'zh-CN'
  },
  en: {
    label: 'English',
    lang: 'en'
  },
  ja: {
    label: '日本語',
    lang: 'ja'
  }
}
```

## 📝 写作指南

### 创建新文章

1. 在对应分类目录下创建 `.md` 文件
2. 添加 Front Matter：

```markdown
---
title: 文章标题
date: 2024-01-15
author: Virginia
category: frontend
tags: [Vue3, JavaScript]
description: 文章描述
---

# 文章内容

你的文章内容...
```

### 支持的 Front Matter

- `title`: 文章标题
- `date`: 发布日期
- `author`: 作者
- `category`: 分类
- `tags`: 标签数组
- `description`: 文章描述

### Markdown 扩展

VitePress 支持丰富的 Markdown 扩展：

````markdown
# 代码高亮

```js
console.log("Hello World");
```
````

# 提示框

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::

# 自定义容器

::: details 点击查看详情
隐藏的内容
:::

````

## 🎨 自定义样式

### 修改主题色

在 `docs/.vitepress/theme/custom.css` 中修改：

```css
:root {
  --vp-c-brand-1: #your-color;
  --vp-c-brand-2: #your-color;
  --vp-c-brand-3: #your-color;
}
````

### 添加自定义样式

```css
/* 自定义博客卡片样式 */
.blog-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  /* 更多样式... */
}
```

## 🚀 部署

### GitHub Pages

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

2. 在仓库设置中启用 GitHub Pages
3. 推送代码到 main 分支

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`npm run build`
3. 设置输出目录：`docs/.vitepress/dist`
4. 部署

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`docs/.vitepress/dist`
4. 部署

## 🛠️ 开发

### 开发规范

- 使用 ESLint 和 Prettier 格式化代码
- 提交前运行 `npm run build` 确保构建成功
- 遵循 [Conventional Commits](https://conventionalcommits.org/) 规范

### 调试

```bash
# 开启调试模式
DEBUG=vitepress:* npm run dev

# 分析构建结果
npm run build -- --debug
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Teek Theme](https://github.com/teekcode/vitepress-theme-teek) - 博客主题
- [Giscus](https://giscus.app/) - 评论系统
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [二丫讲梵](https://wiki.eryajf.net/) - 博客

## 📞 联系

- 作者：Virginia
- 邮箱：zhangsakurayi@qq.com
- GitHub：[@Virginia-Zhang](https://github.com/Virginia-Zhang)
- 也可在我的博客任意评论区处留言

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
