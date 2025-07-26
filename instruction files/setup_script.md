# 项目安装和配置指南

这份指南将帮助你快速搭建基于 VitePress Teek 主题的个人博客。

## 📋 准备工作

### 1. 环境检查

确保你的系统已安装：

```bash
# 检查 Node.js 版本（需要 >= 16.0.0）
node --version

# 检查 npm 版本（需要 >= 7.0.0）
npm --version

# 如果版本过低，请升级 Node.js
# 推荐使用 nvm 管理 Node.js 版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### 2. 创建 GitHub 仓库

1. 在 GitHub 上创建新仓库 `vlog-virginia-blog`
2. 不要初始化 README、.gitignore 或许可证文件
3. 复制仓库 URL

## 🚀 项目初始化

### 1. 下载项目文件

将我为你生成的所有文件保存到本地：

```bash
# 创建项目目录
mkdir vlog-virginia-blog
cd vlog-virginia-blog

# 初始化 Git 仓库
git init
```

### 2. 创建文件结构

按照以下结构创建文件和目录：

```
vlog-virginia-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts
│   │   └── theme/
│   │       ├── index.ts
│   │       ├── custom.css
│   │       └── components/
│   │           └── GiscusComments.vue
│   ├── public/
│   │   └── images/
│   │       └── logo.svg  # 你上传的第二张图片
│   ├── index.md
│   ├── about.md
│   ├── friends.md
│   └── [其他分类目录...]
├── package.json
├── .gitignore
└── README.md
```

### 3. 保存关键图片

将你上传的第二张图片（女性 making art）保存为 `docs/public/images/logo.svg`

## 🔧 配置步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Giscus 评论系统

#### 2.1 启用 GitHub Discussions

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 选项卡
3. 滚动到 `Features` 部分
4. 勾选 `Discussions`

#### 2.2 获取 Giscus 配置

1. 访问 [Giscus 官网](https://giscus.app/zh-CN)
2. 在 "仓库" 部分输入：`your-username/vlog-virginia-blog`
3. 选择页面 ↔ discussion 映射关系：`pathname`
4. 选择 Discussion 分类：`Announcements`
5. 复制生成的配置参数

#### 2.3 更新 Giscus 配置

编辑 `docs/.vitepress/theme/components/GiscusComments.vue`：

```typescript
const giscusConfig = {
  src: "https://giscus.app/client.js",
  "data-repo": "your-username/vlog-virginia-blog", // 替换为你的仓库
  "data-repo-id": "R_kgDOxxxxxx", // 从 Giscus 获取
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDOxxxxxx", // 从 Giscus 获取
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "bottom",
  "data-theme": "preferred_color_scheme",
  "data-lang": "zh-CN",
  crossorigin: "anonymous",
  async: true,
};
```

### 3. 更新个人信息

#### 3.1 修改基本配置

编辑 `docs/.vitepress/config.mts`：

```typescript
// 替换 GitHub 链接
socialLinks: [
  {
    icon: "github",
    link: "https://github.com/your-username/vlog-virginia-blog",
  },
];
```

#### 3.2 更新个人信息

编辑 `docs/about.md`，替换：

- 个人简介
- 工作经历
- 技术栈
- 联系方式

编辑 `docs/friends.md`，替换：

- 友链信息
- 联系方式

### 4. 多语言内容不同步

- 确保每种语言都有对应的文件
- 检查 `config.mts` 中的 locales 配置
- 验证文件路径结构正确

### 5. 搜索功能异常

- 重新构建项目：`npm run build`
- 检查是否有语法错误的 Markdown 文件
- 清除缓存：删除 `docs/.vitepress/cache/` 目录

## 📞 获取帮助

如果遇到问题，可以：

1. **查看文档**：

   - [VitePress 官方文档](https://vitepress.dev/)
   - [Teek 主题文档](https://vp.teek.top/)
   - [Giscus 文档](https://giscus.app/)

2. **社区求助**：

   - GitHub Issues
   - VitePress Discord 社区
   - 相关技术论坛

3. **联系作者**：
   - 在本项目提 Issue
   - 发送邮件咨询

## 🎉 完成！

恭喜你完成了博客的搭建！现在你可以：

- ✅ 开始写作你的第一篇文章
- ✅ 自定义博客样式和配置
- ✅ 邀请朋友访问你的博客
- ✅ 在社交媒体分享你的内容

记住，好的博客需要持续的内容更新和用心维护。祝你写作愉快！

---

**小贴士**：建议定期备份你的博客内容，并保持 Node.js 和依赖包的更新。 添加网站图标

1. 准备 `favicon.ico` 文件
2. 放置到 `docs/public/favicon.ico`

## 🎨 主题自定义

### 1. 修改主题色

编辑 `docs/.vitepress/theme/custom.css`：

```css
:root {
  /* 主色调 - 可以替换为你喜欢的颜色 */
  --vp-c-brand-1: #8b7ed8; /* 主要品牌色 */
  --vp-c-brand-2: #9d8df1; /* 品牌色变体 */
  --vp-c-brand-3: #b8a9ff; /* 品牌色高亮 */
}
```

### 2. 替换 Logo

将你的 Logo 图片保存为 `docs/public/images/logo.svg`，确保尺寸适中（推荐 32x32px）。

## 🚀 本地测试

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
# 检查各个页面是否正常显示
```

### 测试检查清单

- [ ] 首页正常显示
- [ ] 导航菜单功能正常
- [ ] 明暗模式切换正常
- [ ] 多语言切换正常
- [ ] 搜索功能正常
- [ ] 评论系统正常（需要部署后测试）

## 📝 内容创建

### 1. 创建第一篇文章

在 `docs/frontend/vue/` 目录下创建 `my-first-post.md`：

```markdown
---
title: 我的第一篇博客文章
date: 2024-01-20
author: Virginia
category: frontend
tags: [Vue3, 个人博客]
description: 这是我在新博客上发布的第一篇文章
---

# 我的第一篇博客文章

欢迎来到我的个人博客！这里将分享我在技术学习和生活中的各种经验和思考。

## 博客的目标

- 记录技术学习心得
- 分享项目开发经验
- 记录生活中的美好时刻
- 与更多朋友交流学习

期待与大家一起成长！
```

### 2. 更新导航

如果需要在侧边栏显示新文章，编辑 `docs/.vitepress/config.mts` 的 sidebar 配置。

## 🚀 部署上线

### 1. 推送到 GitHub

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/vlog-virginia-blog.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: VitePress blog setup"

# 推送到 main 分支
git push -u origin main
```

### 2. 启用 Cloudflare Pages

### 3. 自定义域名（暂时不用）

如果你有自己的域名：

1. 在 `docs/public/` 目录下创建 `CNAME` 文件
2. 文件内容为你的域名，如：`blog.yourdomain.com`
3. 在域名提供商处设置 CNAME 记录指向 `your-username.github.io`

## 🔄 日常维护

### 写作流程

1. 在对应分类目录创建 `.md` 文件
2. 添加合适的 Front Matter
3. 本地预览：`npm run dev`
4. 提交推送：`git add . && git commit -m "Add new post" && git push`
5. 等待自动部署完成

### 更新主题

```bash
# 检查更新
npm outdated

# 更新 VitePress 和主题
npm update vitepress vitepress-theme-teek

# 测试更新
npm run dev
```

## 🐛 常见问题

### 1. 评论不显示

- 检查 Giscus 配置是否正确
- 确认仓库已启用 Discussions
- 确认网站已部署（本地开发时评论不会显示）

### 2. 图片不显示

- 确认图片路径正确（相对于 `docs/public/`）
- 检查图片文件名和扩展名

### 3. 构建失败

- 检查 Markdown 语法
- 确认所有链接有效
- 查日志

### 4.
