import { defineConfig } from "vitepress";

// 导航栏配置
const nav = [
  {
    text: "代码人生",
    items: [
      {
        text: "前端开发",
        items: [
          { text: "HTML/CSS", link: "/frontend/html-css/" },
          { text: "JavaScript", link: "/frontend/javascript/" },
          { text: "Vue", link: "/frontend/vue/" },
          { text: "React", link: "/frontend/react/" },
          { text: "优秀工具/库推荐", link: "/frontend/tools/" },
          { text: "性能优化", link: "/frontend/performance/" },
          { text: "其他", link: "/frontend/others/" },
        ],
      },
      {
        text: "后端开发",
        items: [
          { text: "Java", link: "/backend/java/" },
          { text: "NodeJS", link: "/backend/nodejs/" },
          { text: "数据库相关", link: "/backend/database/" },
          { text: "性能优化", link: "/backend/performance/" },
          { text: "其他", link: "/backend/others/" },
        ],
      },
      {
        text: "运维浅谈",
        items: [
          { text: "部署上线", link: "/devops/deployment/" },
          { text: "Nginx", link: "/devops/nginx/" },
          { text: "Docker", link: "/devops/docker/" },
          { text: "Linux", link: "/devops/linux/" },
          { text: "其他", link: "/devops/others/" },
        ],
      },
      {
        text: "项目杂谈",
        items: [
          { text: "那些年踩过的坑", link: "/projects/pitfalls/" },
          { text: "优秀实践汇总", link: "/projects/best-practices/" },
        ],
      },
    ],
  },
  {
    text: "外语指北",
    items: [
      { text: "英语相关", link: "/languages/english/" },
      { text: "日语相关", link: "/languages/japanese/" },
      { text: "其他", link: "/languages/others/" },
    ],
  },
  { text: "生活切片", link: "/life/" },
  { text: "关于", link: "/about/" },
  { text: "友情链接", link: "/friends/" },
];

// 侧边栏配置
const sidebar = {
  "/frontend/": [
    {
      text: "前端开发",
      items: [
        { text: "HTML/CSS", link: "/frontend/html-css/" },
        { text: "JavaScript", link: "/frontend/javascript/" },
        { text: "Vue", link: "/frontend/vue/" },
        { text: "React", link: "/frontend/react/" },
        { text: "优秀工具/库推荐", link: "/frontend/tools/" },
        { text: "性能优化", link: "/frontend/performance/" },
        { text: "其他", link: "/frontend/others/" },
      ],
    },
  ],
  "/backend/": [
    {
      text: "后端开发",
      items: [
        { text: "Java", link: "/backend/java/" },
        { text: "NodeJS", link: "/backend/nodejs/" },
        { text: "数据库相关", link: "/backend/database/" },
        { text: "性能优化", link: "/backend/performance/" },
        { text: "其他", link: "/backend/others/" },
      ],
    },
  ],
  "/devops/": [
    {
      text: "运维浅谈",
      items: [
        { text: "部署上线", link: "/devops/deployment/" },
        { text: "Nginx", link: "/devops/nginx/" },
        { text: "Docker", link: "/devops/docker/" },
        { text: "Linux", link: "/devops/linux/" },
        { text: "其他", link: "/devops/others/" },
      ],
    },
  ],
  "/projects/": [
    {
      text: "项目杂谈",
      items: [
        { text: "那些年踩过的坑", link: "/projects/pitfalls/" },
        { text: "优秀实践汇总", link: "/projects/best-practices/" },
      ],
    },
  ],
  "/languages/": [
    {
      text: "外语学习",
      items: [
        { text: "英语相关", link: "/languages/english/" },
        { text: "日语相关", link: "/languages/japanese/" },
        { text: "其他", link: "/languages/others/" },
      ],
    },
  ],
  "/life/": [
    {
      text: "生活分享",
      items: [
        { text: "生活感悟", link: "/life/thoughts/" },
        { text: "旅行记录", link: "/life/travel/" },
        { text: "读书笔记", link: "/life/books/" },
        { text: "其他分享", link: "/life/others/" },
      ],
    },
  ],
  "/about/": [
    {
      text: "关于我",
      items: [{ text: "关于我", link: "/about/" }],
    },
  ],
  "/friends/": [
    {
      text: "友情链接",
      items: [{ text: "友情链接", link: "/friends/" }],
    },
  ],
};

export default defineConfig({
  title: "Vlog-Virginia's Blog",
  description: "Virginia's Personal Blog - 分享技术、生活与思考",

  // 多语言配置
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "Vlog-Virginia's Blog",
      description: "Virginia的个人博客 - 分享技术、生活与思考",
    },
    en: {
      label: "English",
      lang: "en",
      title: "Vlog-Virginia's Blog",
      description:
        "Virginia's Personal Blog - Sharing technology, life and thoughts",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Frontend", link: "/en/frontend/" },
          { text: "Backend", link: "/en/backend/" },
          { text: "DevOps", link: "/en/devops/" },
          { text: "Projects", link: "/en/projects/" },
          { text: "Languages", link: "/en/languages/" },
          { text: "Life", link: "/en/life/" },
          { text: "About", link: "/en/about" },
          { text: "Friends", link: "/en/friends" },
        ],
      },
    },
    ja: {
      label: "日本語",
      lang: "ja",
      title: "Vlog-Virginia's Blog",
      description: "Virginiaの個人ブログ - 技術、生活、思考をシェア",
      themeConfig: {
        nav: [
          { text: "ホーム", link: "/ja/" },
          { text: "フロントエンド", link: "/ja/frontend/" },
          { text: "バックエンド", link: "/ja/backend/" },
          { text: "DevOps", link: "/ja/devops/" },
          { text: "プロジェクト", link: "/ja/projects/" },
          { text: "言語学習", link: "/ja/languages/" },
          { text: "ライフ", link: "/ja/life/" },
          { text: "アバウト", link: "/ja/about" },
          { text: "フレンズ", link: "/ja/friends" },
        ],
      },
    },
  },

  // 主题配置
  themeConfig: {
    logo: "/images/me.jfif",

    nav,
    sidebar,

    // 社交链接
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/your-username/vlog-virginia-blog",
      },
    ],

    // 页脚配置
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2024-${new Date().getFullYear()} Virginia`,
    },

    // 搜索配置
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    // 最后更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    // 文档页脚
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 侧边栏配置
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",

    // 暗色模式切换
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // 大纲配置
    outline: {
      label: "页面导航",
    },
  },

  // 站点配置
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#646cff" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "zh-CN" }],
    ["meta", { name: "og:site_name", content: "Virginia's Blog" }],
    ["meta", { name: "og:image", content: "/images/og-image.png" }],
    // 预加载字体
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
      },
    ],
    // 预加载Giscus
    ["link", { rel: "preconnect", href: "https://giscus.app" }],
    ["link", { rel: "dns-prefetch", href: "https://giscus.app" }],
  ],

  // Markdown配置
  markdown: {
    theme: { light: "github-light", dark: "github-dark" },
    lineNumbers: true,
  },

  // 站点地图配置
  sitemap: {
    hostname: "https://your-domain.com",
  },
});
