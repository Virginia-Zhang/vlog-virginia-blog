import { posts } from "./posts";

// 从 posts 中动态获取所有分类
const getAllCategoriesFromPosts = (): string[] => {
  const categories = new Set<string>();
  posts.forEach((post) => {
    categories.add(post.category);
  });
  return Array.from(categories);
};

// 标签数据接口
export interface Tag {
  name: string;
  category: string;
}

// 特殊标签的分类映射（每个标签只归属一个分类）
const specialTagMapping: Record<string, string> = {
  CSS: "frontend",
  HTML: "frontend",
  JavaScript: "frontend",
  React: "frontend",
  Vue3: "frontend",
  "Node.js": "backend",
  Java: "backend",
  Docker: "devops",
  英语: "language",
  日语: "language",
  中文: "language",
};

// 动态生成热门标签数据
export const generateHotTags = (): Tag[] => {
  const tagMap = new Map<string, string>();

  // 遍历所有文章，收集标签
  posts.forEach((post) => {
    post.tags.forEach((tagName) => {
      // 检查是否有特殊映射
      if (specialTagMapping[tagName]) {
        tagMap.set(tagName, specialTagMapping[tagName]);
      } else {
        // 使用原始分类
        tagMap.set(tagName, post.category);
      }
    });
  });

  // 转换为 Tag 数组
  return Array.from(tagMap.entries()).map(([name, category]) => ({
    name,
    category,
  }));
};

// 热门标签数据（动态生成）
export const hotTags: Tag[] = generateHotTags();

// 按分类获取标签
export const getTagsByCategory = (category: string): Tag[] => {
  return hotTags.filter((tag) => tag.category === category);
};

// 获取所有分类（按指定顺序排列）
export const getCategories = (): string[] => {
  // 定义期望的分类顺序
  const expectedOrder = [
    "frontend",
    "backend",
    "devops",
    "projects",
    "language",
    "life",
  ];

  // 获取实际存在的分类
  const actualCategories = getAllCategoriesFromPosts();

  // 按期望顺序过滤并返回实际存在的分类
  return expectedOrder.filter((category) =>
    actualCategories.includes(category)
  );
};
