# 数据文件说明

这个目录包含了 `HomeContent.vue` 组件所需的数据文件，用于实现数据驱动的组件设计。

## 文件结构

### `posts.ts`

- **用途**: 存储文章卡片数据
- **接口**: `Post` - 定义文章卡片的完整结构
- **主要功能**:
  - 文章数据管理
  - 分页逻辑处理
  - 文章数据获取

### `tags.ts`

- **用途**: 存储热门标签数据
- **接口**: `Tag` - 定义标签的基本结构
- **主要功能**:
  - 标签数据管理
  - 按分类获取标签
  - 分类管理

## 重构优势

### 1. 数据与视图分离

- 将硬编码的数据从组件中提取出来
- 便于数据的统一管理和维护
- 提高代码的可维护性

### 2. 类型安全

- 使用 TypeScript 接口定义数据结构
- 提供完整的类型检查和智能提示
- 减少运行时错误

### 3. 可扩展性

- 新增文章只需在数据文件中添加条目
- 新增标签分类只需修改数据文件
- 组件逻辑无需修改

### 4. 代码复用

- 数据文件可以被其他组件复用
- 统一的数据管理方式
- 便于后续功能扩展

## 使用方式

```typescript
// 在组件中导入数据
import { getPostsByPage, type Post } from "../data/posts";
import { getTagsByCategory, type Tag } from "../data/tags";

// 使用数据
const posts = getPostsByPage(1);
const frontendTags = getTagsByCategory("frontend");
```

## 数据格式

### Post 接口

```typescript
interface Post {
  id: string; // 文章唯一标识
  title: string; // 文章标题
  url: string; // 文章链接
  date: string; // 发布日期
  category: string; // 文章分类
  readTime: string; // 阅读时长
  excerpt: string; // 文章摘要
  tags: string[]; // 文章标签
}
```

### Tag 接口

```typescript
interface Tag {
  name: string; // 标签名称
  category: "frontend" | "backend" | "devops" | "language" | "life"; // 标签分类
}
```
