// 文章卡片数据接口
export interface Post {
  id: string;
  title: string;
  url: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[];
}

// 文章卡片数据
export const posts: Post[] = [
  {
    id: "responsive-typography-system",
    title: "响应式字体系统设计：从桌面到移动端的完美阅读体验",
    url: "/frontend/html-css/responsive-typography-system",
    date: "2025-07-30",
    category: "frontend",
    readTime: "8 分钟阅读",
    excerpt:
      "深入分析博客项目中响应式字体系统的设计策略，包括字体大小、行高、字间距在不同屏幕下的自适应调整...",
    tags: ["CSS", "响应式设计"],
  },
  {
    id: "responsive-navigation-design",
    title: "响应式导航栏设计：从桌面菜单到移动端汉堡包",
    url: "/frontend/html-css/responsive-navigation-design",
    date: "2025-07-26",
    category: "frontend",
    readTime: "7 分钟阅读",
    excerpt:
      "详细分析博客项目中导航栏的响应式设计策略，从桌面端的完整菜单到移动端的汉堡菜单切换...",
    tags: ["CSS", "响应式设计"],
  },
  {
    id: "responsive-hero-section",
    title: "响应式 Hero 区域设计：文字与图片的完美适配",
    url: "/frontend/html-css/responsive-hero-section",
    date: "2025-07-23",
    category: "frontend",
    readTime: "10 分钟阅读",
    excerpt:
      "深入分析博客项目中Hero区域的响应式设计策略，包括文字大小、图片尺寸和布局在不同屏幕下的自适应调整...",
    tags: ["CSS", "响应式设计"],
  },
  {
    id: "responsive-background-strategy",
    title: "响应式背景图设计策略：从大屏到小屏的完美适配",
    url: "/frontend/html-css/responsive-background-strategy",
    date: "2025-07-22",
    category: "frontend",
    readTime: "6 分钟阅读",
    excerpt:
      "深入分析博客项目中背景图在不同屏幕尺寸下的响应式显示策略，包括大屏幕的cover效果和小屏幕的自适应布局...",
    tags: ["CSS", "响应式设计"],
  },
  {
    id: "react-immutability",
    title: "React数据不可变性深度解析：从原理到实践",
    url: "/frontend/react/react-immutability",
    date: "2025-07-02",
    category: "frontend",
    readTime: "12 分钟阅读",
    excerpt:
      "深入解析React中数据不可变性的重要性，从原理机制到实际应用，包括状态更新、性能优化、最佳实践等核心知识点...",
    tags: ["React", "数据不可变性", "状态管理", "性能优化"],
  },
  {
    id: "frontend-code-standards",
    title: "前端代码规范利器：ESLint + Prettier + Husky + lint-staged 实战指南",
    url: "/projects/best-practices/frontend-code-standards",
    date: "2025-04-02",
    category: "projects",
    readTime: "15 分钟阅读",
    excerpt:
      "介绍如何使用 ESLint、Prettier、Husky 和 lint-staged 这四个工具来构建完善的前端代码规范体系...",
    tags: ["前端", "代码规范", "ESLint", "Prettier", "Husky", "lint-staged"],
  },
  {
    id: "debounce-throttle",
    title: "防抖与节流：前端性能优化的利器",
    url: "/frontend/performance/debounce-throttle",
    date: "2025-03-10",
    category: "frontend",
    readTime: "15 分钟阅读",
    excerpt:
      "深入解析防抖(Debounce)和节流(Throttle)技术，从原理到实现，从基础应用到高级优化，帮助开发者掌握这两种重要的性能优化技巧...",
    tags: ["JavaScript", "性能优化", "防抖", "节流"],
  },
  {
    id: "css-centering-interview",
    title: "用英语学前端（1）：如何利用 CSS 让元素水平垂直居中？",
    url: "/languages/english/css-centering-interview",
    date: "2025-03-03",
    category: "language",
    readTime: "8 分钟阅读",
    excerpt:
      "通过模拟英语技术面试的形式，带你学习相关的英语表达，同时掌握多种 CSS 居中技巧...",
    tags: ["英语", "CSS", "居中"],
  },
  {
    id: "route-lazy-loading",
    title: "路由懒加载：提升前端应用性能的关键技术",
    url: "/frontend/performance/route-lazy-loading",
    date: "2025-03-02",
    category: "frontend",
    readTime: "14 分钟阅读",
    excerpt:
      "深入解析路由懒加载技术，从原理到实现，从基础应用到高级优化，帮助开发者掌握代码分割和按需加载的核心技巧...",
    tags: ["JavaScript", "性能优化", "路由懒加载", "代码分割", "Webpack"],
  },
  {
    id: "frontend-english-learning",
    title: "前端开发英语学习指南",
    url: "/languages/english/frontend-english-learning",
    date: "2025-03-01",
    category: "language",
    readTime: "7 分钟阅读",
    excerpt:
      "提升前端开发英语水平，掌握技术文档阅读技巧，为国际化发展打下坚实基础...",
    tags: ["英语", "前端"],
  },
  {
    id: "frontend-backend-separation-deployment",
    title: "前后端分离项目部署上线流程解析",
    url: "/devops/deployment/frontend-backend-separation-deployment",
    date: "2025-02-22",
    category: "devops",
    readTime: "10 分钟阅读",
    excerpt: "以React问卷编辑管理平台为例，详解前后端分离项目的完整部署流程...",
    tags: ["部署", "前后端分离", "React", "Node.js", "运维"],
  },
  {
    id: "java-reflection",
    title: "Java 反射机制详解",
    url: "/backend/java/java-reflection",
    date: "2025-02-16",
    category: "backend",
    readTime: "10 分钟阅读",
    excerpt: "深入浅出理解 Java 反射机制，掌握动态获取和操作类信息的能力...",
    tags: ["Java", "反射"],
  },
  {
    id: "i-am-a-cat",
    title: "我是一只猫",
    url: "/life/records/I-am-a-cat",
    date: "2024-08-30",
    category: "life",
    readTime: "10 分钟阅读",
    excerpt: "我是一只猫，从流浪街头到坐拥温暖窝，记录我与主人的温馨生活...",
    tags: ["生活", "记录", "我是一只猫"],
  },
  {
    id: "javascript-prototype-chain",
    title: "JavaScript原型链深度解析：从基础到高级应用",
    url: "/frontend/javascript/javascript-prototype-chain",
    date: "2024-06-02",
    category: "frontend",
    readTime: "12 分钟阅读",
    excerpt:
      "深入解析JavaScript原型链机制，从基础概念到高级应用，包括原型继承、原型链查找、ES6类语法等核心知识点...",
    tags: ["JavaScript", "原型链"],
  },
  {
    id: "vue3-composition-api",
    title: "Vue 3 Composition API 深度解析",
    url: "/frontend/vue/vue3-composition-api",
    date: "2024-01-15",
    category: "frontend",
    readTime: "8 分钟阅读",
    excerpt:
      "深入了解 Vue 3 Composition API 的设计理念、核心特性以及在实际项目中的应用实践...",
    tags: ["Vue3", "Composition API", "JavaScript"],
  },
  {
    id: "docker-container-optimization",
    title: "Docker 容器性能优化实践",
    url: "/devops/docker/container-optimization",
    date: "2024-01-10",
    category: "devops",
    readTime: "10 分钟阅读",
    excerpt: "分享在生产环境中优化 Docker 容器性能的实用技巧和最佳实践...",
    tags: ["Docker", "性能优化", "容器化"],
  },
];

// 每页显示的文章数量
export const POSTS_PER_PAGE = 3;

// 获取总页数
export const getTotalPages = (): number => {
  return Math.ceil(posts.length / POSTS_PER_PAGE);
};

// 获取指定页面的文章
export const getPostsByPage = (page: number): Post[] => {
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  return posts.slice(startIndex, endIndex);
};
