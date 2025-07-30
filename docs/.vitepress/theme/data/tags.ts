// 标签数据接口
export interface Tag {
  name: string;
  category: "frontend" | "backend" | "devops" | "language" | "life";
}

// 热门标签数据
export const hotTags: Tag[] = [
  // 前端开发
  { name: "Vue3", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Webpack", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "性能优化", category: "frontend" },
  { name: "响应式设计", category: "frontend" },

  // 后端开发
  { name: "Node.js", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "微服务", category: "backend" },
  { name: "API设计", category: "backend" },

  // 运维浅谈
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "Nginx", category: "devops" },
  { name: "Jenkins", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "监控告警", category: "devops" },
  { name: "负载均衡", category: "devops" },

  // 外语学习
  { name: "英语", category: "language" },
  { name: "日语", category: "language" },
  { name: "技术文档", category: "language" },
  { name: "口语练习", category: "language" },
  { name: "词汇积累", category: "language" },
  { name: "语法学习", category: "language" },
  { name: "听力训练", category: "language" },
  { name: "阅读技巧", category: "language" },

  // 生活切片
  { name: "读书笔记", category: "life" },
  { name: "旅行记录", category: "life" },
  { name: "生活感悟", category: "life" },
  { name: "职场心得", category: "life" },
  { name: "时间管理", category: "life" },
  { name: "健康生活", category: "life" },
  { name: "兴趣爱好", category: "life" },
  { name: "成长思考", category: "life" },
];

// 按分类获取标签
export const getTagsByCategory = (category: Tag["category"]): Tag[] => {
  return hotTags.filter((tag) => tag.category === category);
};

// 获取所有分类
export const getCategories = (): Tag["category"][] => {
  return ["frontend", "backend", "devops", "language", "life"];
};
