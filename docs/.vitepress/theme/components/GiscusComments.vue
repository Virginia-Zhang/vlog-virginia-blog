<template>
  <div class="giscus-wrapper">
    <div id="giscus-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from "vue";
import { useData, useRoute } from "vitepress";

const { isDark } = useData();
const route = useRoute();

// Giscus配置
const giscusConfig = {
  src: "https://giscus.app/client.js",
  "data-repo": "your-username/vlog-virginia-blog", // 替换为你的仓库
  "data-repo-id": "your-repo-id", // 替换为你的仓库ID
  "data-category": "Announcements",
  "data-category-id": "your-category-id", // 替换为你的分类ID
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "bottom",
  "data-theme": "preferred_color_scheme",
  "data-lang": "zh-CN",
  crossorigin: "anonymous",
  async: true,
};

// 加载Giscus
function loadGiscus() {
  const container = document.getElementById("giscus-container");
  if (!container) return;

  // 清除现有的Giscus
  container.innerHTML = "";

  const script = document.createElement("script");
  Object.entries(giscusConfig).forEach(([key, value]) => {
    script.setAttribute(key, value.toString());
  });

  // 根据当前主题设置Giscus主题
  script.setAttribute("data-theme", isDark.value ? "dark" : "light");

  container.appendChild(script);
}

// 更新Giscus主题
function updateGiscusTheme() {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame"
  );
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: isDark.value ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }
}

onMounted(() => {
  nextTick(() => {
    loadGiscus();
  });
});

// 监听主题变化
watch(
  isDark,
  () => {
    updateGiscusTheme();
  },
  { immediate: false }
);

// 监听路由变化，重新加载评论
watch(
  () => route.path,
  () => {
    nextTick(() => {
      loadGiscus();
    });
  }
);
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .giscus-wrapper {
    margin-top: 1rem;
    padding-top: 1rem;
  }
}
</style>
