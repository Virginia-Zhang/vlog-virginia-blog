# Vlog-Virginia's Blog 项目结构

这是一个基于 VitePress 和 Teek 主题的个人博客项目，支持中英日三种语言，集成了 Giscus 评论功能。

## 📁 项目目录结构

```
vlog-virginia-blog/
├── docs/                           # 文档根目录
│   ├── .vitepress/                 # VitePress 配置目录
│   │   ├── config.mts              # 主配置文件
│   │   └── theme/                  # 自定义主题
│   │       ├── index.ts            # 主题入口文件
│   │       ├── custom.css          # 自定义样式
│   │       └── components/         # 自定义组件
│   │           └── GiscusComments.vue  # Giscus 评论组件
│   │
│   ├── public/                     # 静态资源目录
│   │   ├── images/                 # 图片资源
│   │   │   ├── logo.svg            # 网站Logo (你上传的第二张图)
│   │   │   ├── hero-image.svg      # 首页Hero图
│   │   │   ├── og-image.png        # 社交分享图
│   │   │   ├── profile.jpg         # 个人头像
│   │   │   └── friends/            # 友链头像
│   │   │       ├── friend1.jpg
│   │   │       ├── friend2.jpg
│   │   │       └── ...
│   │   └── favicon.ico             # 网站图标
│   │
│   ├── index.md                    # 首页 (中文)
│   ├── about.md                    # 关于页面
│   ├── friends.md                  # 友情链接页面
│   │
│   ├── frontend/                   # 前端开发分类
│   │   ├── index.md                # 前端分类首页
│   │   ├── html-css/               # HTML/CSS 相关
│   │   │   └── index.md
│   │   ├── javascript/             # JavaScript 相关
│   │   │   └── index.md
│   │   ├── vue/                    # Vue 相关
│   │   │   ├── index.md
│   │   │   └── vue3-composition-api.md
│   │   ├── react/                  # React 相关
│   │   │   └── index.md
│   │   ├── tools/                  # 工具/库推荐
│   │   │   └── index.md
│   │   ├── performance/            # 性能优化
│   │   │   └── index.md
│   │   └── others/                 # 其他
│   │       └── index.md
│   │
│   ├── backend/                    # 后端开发分类
│   │   ├── index.md                # 后端分类首页
│   │   ├── java/                   # Java 相关
│   │   │   └── index.md
│   │   ├── nodejs/                 # Node.js 相关
│   │   │   ├── index.md
│   │   │   └── express-middleware.md
│   │   ├── database/               # 数据库相关
│   │   │   └── index.md
│   │   ├── performance/            # 性能优化
│   │   │   └── index.md
│   │   └── others/                 # 其他
│   │       └── index.md
│   │
│   ├── devops/                     # 运维浅谈分类
│   │   ├── index.md                # 运维分类首页
│   │   ├── deployment/             # 部署上线
│   │   │   └── index.md
│   │   ├── nginx/                  # Nginx 相关
│   │   │   └── index.md
│   │   ├── docker/                 # Docker 相关
│   │   │   ├── index.md
│   │   │   └── container-optimization.md
│   │   ├── linux/                  # Linux 相关
│   │   │   └── index.md
│   │   └── others/                 # 其他
│   │       └── index.md
│   │
│   ├── projects/                   # 项目杂谈分类
│   │   ├── index.md                # 项目分类首页
│   │   ├── pitfalls/               # 踩过的坑
│   │   │   └── index.md
│   │   └── best-practices/         # 优秀实践
│   │       └── index.md
│   │
│   ├── languages/                  # 外语学习分类
│   │   ├── index.md                # 外语分类首页
│   │   ├── english/                # 英语相关
│   │   │   └── index.md
│   │   ├── japanese/               # 日语相关
│   │   │   └── index.md
│   │   └── others/                 # 其他语言
│   │       └── index.md
│   │
│   ├── life/                       # 生活分享分类
│   │   ├── index.md                # 生活分类首页
│   │   ├── thoughts/               # 生活感悟
│   │   │   └── index.md
│   │   ├── travel/                 # 旅行记录
│   │   │   └── index.md
│   │   ├── books/                  # 读书笔记
│   │   │   └── index.md
│   │   └── others/                 # 其他分享
│   │       └── index.md
│   │
│   ├── en/                         # 英文版本
│   │   ├── index.md                # 英文首页
│   │   ├── about.md                # 英文关于页
│   │   ├── friends.md              # 英文友链页
│   │   ├── frontend/               # 英文前端分类
│   │   ├── backend/                # 英文后端分类
│   │   ├── devops/                 # 英文运维分类
│   │   ├── projects/               # 英文项目分类
│   │   ├── languages/              # 英文外语分类
│   │   └── life/                   # 英文生活分类
│   │
│   └── ja/                         # 日文版本
│       ├── index.md                # 日文首页
│       ├── about.md                # 日文关于页
│       ├── friends.md              # 日文友链页
│       ├── frontend/               # 日文前端分类
│       ├── backend/                # 日文后端分类
│       ├── devops/                 # 日文运维分类
│       ├── projects/               # 日文项目分类
│       ├── languages/              # 日文外语分类
│       └── life/                   # 日文生活分类
│
├── package.json                    # 项目依赖配置
├── package-lock.json               # 依赖锁定文件
├── README.md                       # 项目说明文档
├── .gitignore                      # Git 忽略文件
```
