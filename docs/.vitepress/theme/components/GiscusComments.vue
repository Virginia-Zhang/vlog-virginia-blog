<template>
  <div class="giscus-wrapper">
    <div class="giscus" ref="giscusContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useData, useRoute } from "vitepress";

const { lang, isDark } = useData();
const route = useRoute();
const giscusContainer = ref();

// 语言映射配置
const langMap = {
  "zh-CN": "zh-CN",
  zh: "zh-CN",
  "ja-JP": "ja",
  ja: "ja",
  "en-US": "en",
  en: "en",
};

// 获取Giscus支持的语言代码
const getGiscusLang = (vitepress_lang) => {
  return langMap[vitepress_lang] || "en"; // 默认英文
};

// 更新Giscus主题的函数
const updateGiscusTheme = (theme) => {
  // 等待一段时间确保iframe已加载
  setTimeout(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe && iframe.contentWindow) {
      try {
        // 尝试多种主题更新方法
        iframe.contentWindow.postMessage(
          { giscus: { setTheme: theme } },
          "https://giscus.app"
        );

        // 备用方法：使用setConfig
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            {
              giscus: {
                setConfig: {
                  theme: theme,
                },
              },
            },
            "https://giscus.app"
          );
        }, 200);
      } catch (error) {
        console.log("Giscus主题更新失败，重新加载组件");
        // 如果主题更新失败，重新加载整个组件
        const currentLang = getGiscusLang(lang.value);
        loadGiscus(currentLang, theme);
      }
    } else {
      // 如果iframe不存在，重新加载组件
      const currentLang = getGiscusLang(lang.value);
      loadGiscus(currentLang, theme);
    }
  }, 100);
};

// 加载Giscus脚本的函数
const loadGiscus = (language, theme) => {
  // 清空容器
  if (giscusContainer.value) {
    giscusContainer.value.innerHTML = "";
  }

  // 创建新的Giscus脚本
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "Virginia-Zhang/vlog-virginia-blog");
  script.setAttribute("data-repo-id", "R_kgDOPS9Gbg");
  script.setAttribute("data-category", "Announcements");
  script.setAttribute("data-category-id", "DIC_kwDOPS9Gbs4CtkZE");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "1"); // 启用严格匹配，隔离不同语言版本的评论
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", theme); // 使用动态主题
  script.setAttribute("data-lang", language); // 动态语言
  script.crossOrigin = "anonymous";
  script.async = true;

  giscusContainer.value?.appendChild(script);
};

// 组件挂载时加载
onMounted(() => {
  const currentLang = getGiscusLang(lang.value);
  const currentTheme = isDark.value ? "dark" : "light"; // 设置初始主题，使用更明显的dark主题
  loadGiscus(currentLang, currentTheme);
});

// 监听语言和路由变化，重新加载Giscus
watch(
  [lang, () => route.path],
  ([newLangValue]) => {
    const giscusLang = getGiscusLang(newLangValue);
    const currentTheme = isDark.value ? "dark" : "light";
    loadGiscus(giscusLang, currentTheme);
  },
  { immediate: false }
);

// 监听明暗模式切换，更新主题
watch(isDark, (dark) => {
  const newTheme = dark ? "dark" : "light";
  // 延迟一点时间确保DOM更新完成
  setTimeout(() => {
    updateGiscusTheme(newTheme);
  }, 50);

  // 如果主题更新失败，500ms后再次尝试
  setTimeout(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
      const currentTheme = iframe.getAttribute("data-theme");
      if (currentTheme !== newTheme) {
        console.log("主题更新可能失败，重新尝试");
        updateGiscusTheme(newTheme);
      }
    }
  }, 500);
});
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus {
  min-height: 200px;
}

/* 加载时的占位样式 */
.giscus:empty::before {
  content: "评论加载中... / Loading comments... / コメントを読み込み中...";
  display: block;
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .giscus-wrapper {
    margin-top: 1rem;
    padding-top: 1rem;
  }
}
</style>
