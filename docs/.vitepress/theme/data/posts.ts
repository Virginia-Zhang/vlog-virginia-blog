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
    id: "vue3-composition-api",
    title: "Vue 3 Composition API 深度解析",
    url: "/frontend/vue/vue3-composition-api",
    date: "2024-01-15",
    category: "前端开发",
    readTime: "5 分钟阅读",
    excerpt:
      "深入了解 Vue 3 Composition API 的设计理念、核心特性以及在实际项目中的应用实践...",
    tags: ["Vue3", "Composition API", "JavaScript"],
  },
  {
    id: "express-middleware",
    title: "Express 中间件机制深度剖析",
    url: "/backend/nodejs/express-middleware",
    date: "2024-01-12",
    category: "后端开发",
    readTime: "8 分钟阅读",
    excerpt:
      "全面解析 Express.js 中间件的工作原理，从源码角度理解请求处理流程...",
    tags: ["Node.js", "Express", "中间件"],
  },
  {
    id: "docker-container-optimization",
    title: "Docker 容器性能优化实践",
    url: "/devops/docker/container-optimization",
    date: "2024-01-10",
    category: "运维浅谈",
    readTime: "6 分钟阅读",
    excerpt: "分享在生产环境中优化 Docker 容器性能的实用技巧和最佳实践...",
    tags: ["Docker", "性能优化", "容器化"],
  },
  {
    id: "frontend-english-learning",
    title: "前端开发英语学习指南",
    url: "/languages/english/frontend-english-learning",
    date: "2024-01-08",
    category: "外语学习",
    readTime: "7 分钟阅读",
    excerpt:
      "提升前端开发英语水平，掌握技术文档阅读技巧，为国际化发展打下坚实基础...",
    tags: ["英语学习", "前端开发", "技术文档"],
  },
  {
    id: "react-hooks-best-practices",
    title: "React Hooks 最佳实践总结",
    url: "/frontend/react/hooks-best-practices",
    date: "2024-01-05",
    category: "前端开发",
    readTime: "6 分钟阅读",
    excerpt:
      "总结 React Hooks 的使用技巧和常见陷阱，帮助你写出更优雅的 React 代码...",
    tags: ["React", "Hooks", "最佳实践"],
  },
  {
    id: "spring-boot-microservices",
    title: "Spring Boot 微服务架构实践",
    url: "/backend/java/spring-boot-microservices",
    date: "2024-01-03",
    category: "后端开发",
    readTime: "9 分钟阅读",
    excerpt:
      "基于 Spring Boot 构建微服务架构，包括服务注册、配置管理、负载均衡等核心组件...",
    tags: ["Spring Boot", "微服务", "Java"],
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
