# UnderConstruction 组件使用说明

## 概述

`UnderConstruction` 组件用于在未完成的页面中显示"施工中"提示信息，模仿了 Teek 主题该组件的设计风格，并加以优化改进。

## 使用方法

### 1. 在 Markdown 文件中使用

```markdown
# 页面标题

<UnderConstruction />

## 其他内容

这里可以放置其他内容...
```

### 2. 在 Vue 组件中使用

```vue
<template>
  <div>
    <UnderConstruction />
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import UnderConstruction from "./UnderConstruction.vue";
</script>
```

## 组件特性

- **响应式设计**: 在移动设备上自动调整布局
- **主题适配**: 支持深色和浅色主题，在明亮和暗黑模式下有不一样的显示效果
- **动画效果**: 包含微妙的动画效果，提升用户体验
- **可访问性**: 使用语义化的 HTML 结构

## 样式定制

组件使用 scoped 样式，如需自定义样式，可以通过 CSS 变量或覆盖样式：

```css
/* 自定义样式 */
.under-construction {
  margin: 3rem 0;
}

.construction-alert {
  background: linear-gradient(135deg, #your-color 0%, #your-color 100%);
}
```

## 示例效果

组件会显示一个带有以下元素的提示框：

- 施工图标（带有脉冲动画）
- "施工中"标题
- 友好的提示文字，引导用户浏览其他内容

## 注意事项

- 组件已针对 VitePress 环境优化
- 支持 TypeScript
- 使用 Vue 3 Composition API
