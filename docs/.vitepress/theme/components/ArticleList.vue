<template>
  <div class="article-list">
    <div v-if="filteredArticles.length > 0">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
      />
    </div>
    <div v-else class="no-articles">
      <UnderConstruction />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { posts, type Post } from "../data/posts";
import ArticleCard from "./ArticleCard.vue";
import UnderConstruction from "./UnderConstruction.vue";

interface Props {
  /**
   * 文章路径前缀，用于过滤文章
   * 例如: "/frontend/html-css" 会显示该路径下的所有文章
   */
  pathPrefix: string;
}

const props = defineProps<Props>();

// 根据路径前缀过滤文章
const filteredArticles = computed<Post[]>(() => {
  if (!props.pathPrefix || !posts || !Array.isArray(posts)) {
    return [];
  }

  return posts
    .filter((post) => {
      // 确保文章URL以指定的路径前缀开始
      return post.url && post.url.startsWith(props.pathPrefix);
    })
    .sort((a, b) => {
      // 按日期降序排序（最新的在前）
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
});
</script>

<style scoped>
.article-list {
  margin-top: 1rem;
}

.no-articles {
  margin-top: 2rem;
}
</style>
