// 面包屑导航组件配置数据

// 路径到显示文本的映射
export const pathMap = {
  // 主要分类
  frontend: "前端开发",
  backend: "后端开发",
  devops: "运维浅谈",
  projects: "项目杂谈",
  languages: "外语指北",
  life: "浮生若梦",
  about: "关于",
  friends: "友情链接",

  // 前端子分类
  "html-css": "HTML/CSS",
  javascript: "JavaScript",
  vue: "Vue",
  react: "React",
  tools: "优秀工具/库推荐",
  performance: "性能优化",
  others: "其他",

  // 后端子分类
  java: "Java",
  nodejs: "NodeJS",
  database: "数据库相关",

  // 运维子分类
  deployment: "部署上线",
  nginx: "Nginx",
  docker: "Docker",
  linux: "Linux",

  // 项目子分类
  pitfalls: "那些年踩过的坑",
  "best-practices": "优秀实践汇总",

  // 语言子分类
  english: "英语相关",
  japanese: "日语相关",

  // 生活子分类
  records: "生活分享",
  recommendations: "影音推荐",
} as const;

// 多语言支持配置
export const langMap = {
  en: {
    首页: "Home",
    前端开发: "Frontend",
    后端开发: "Backend",
    运维浅谈: "DevOps",
    项目杂谈: "Projects",
    外语指北: "Languages",
    浮生若梦: "Life",
    关于: "About",
    友情链接: "Friends",
    "HTML/CSS": "HTML/CSS",
    JavaScript: "JavaScript",
    Vue: "Vue",
    React: "React",
    "优秀工具/库推荐": "Tools & Libraries",
    性能优化: "Performance",
    其他: "Others",
    Java: "Java",
    NodeJS: "NodeJS",
    数据库相关: "Database",
    部署上线: "Deployment",
    Nginx: "Nginx",
    Docker: "Docker",
    Linux: "Linux",
    那些年踩过的坑: "Pitfalls",
    优秀实践汇总: "Best Practices",
    英语相关: "English",
    日语相关: "Japanese",
    生活分享: "Life Sharing",
    影音推荐: "Media Recommendations",
  },
  ja: {
    首页: "ホーム",
    前端开发: "フロントエンド",
    后端开发: "バックエンド",
    运维浅谈: "DevOps",
    项目杂谈: "プロジェクト",
    外语指北: "言語学習",
    浮生若梦: "ライフ",
    关于: "アバウト",
    友情链接: "フレンズ",
    "HTML/CSS": "HTML/CSS",
    JavaScript: "JavaScript",
    Vue: "Vue",
    React: "React",
    "优秀工具/库推荐": "ツール・ライブラリ",
    性能优化: "パフォーマンス",
    其他: "その他",
    Java: "Java",
    NodeJS: "NodeJS",
    数据库相关: "データベース",
    部署上线: "デプロイ",
    Nginx: "Nginx",
    Docker: "Docker",
    Linux: "Linux",
    那些年踩过的坑: "失敗談",
    优秀实践汇总: "ベストプラクティス",
    英语相关: "英語",
    日语相关: "日本語",
    生活分享: "生活シェア",
    影音推荐: "メディア推薦",
  },
} as const;

// 语言代码类型
export type LanguageCode = keyof typeof langMap;

// 路径映射类型
export type PathKey = keyof typeof pathMap;
