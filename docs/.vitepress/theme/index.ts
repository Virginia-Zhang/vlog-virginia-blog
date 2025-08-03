// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import GiscusComments from "./components/GiscusComments.vue";
import HeroWaves from "./components/HeroWaves.vue";
import HomeContent from "./components/HomeContent.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import UnderConstruction from "./components/UnderConstruction.vue";
import ArticleCard from "./components/ArticleCard.vue";
import ArticleList from "./components/ArticleList.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 在文档底部插入评论组件
      "doc-after": () => h(GiscusComments),
      // 在Hero区域下方插入波浪组件和背景组件
      "home-hero-after": () => h(HeroWaves),
      // 在文档内容前插入面包屑导航
      "doc-before": () => h(Breadcrumb),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("GiscusComments", GiscusComments);
    app.component("HeroWaves", HeroWaves);
    app.component("HomeContent", HomeContent);
    app.component("Breadcrumb", Breadcrumb);
    app.component("UnderConstruction", UnderConstruction);
    app.component("ArticleCard", ArticleCard);
    app.component("ArticleList", ArticleList);

    // 全局标签点击处理函数 - 跳转到搜索
    const handleTagClick = (tagName: string) => {
      if (typeof window !== "undefined") {
        // 触发VitePress搜索功能
        const searchButton = document.querySelector(
          '.DocSearch-Button, .VPNavBarSearchButton, [aria-label="Search"]'
        ) as HTMLElement;
        if (searchButton) {
          // 点击搜索按钮打开搜索
          searchButton.click();

          // 延迟填入搜索词
          setTimeout(() => {
            const searchInput = document.querySelector(
              '.DocSearch-Input, input[type="search"]'
            ) as HTMLInputElement;
            if (searchInput) {
              searchInput.value = tagName;
              searchInput.focus();
              // 触发输入事件
              const event = new Event("input", { bubbles: true });
              searchInput.dispatchEvent(event);
            }
          }, 100);
        } else {
          // 使用键盘快捷键作为备选
          const event = new KeyboardEvent("keydown", {
            key: "k",
            ctrlKey: true,
            bubbles: true,
          });
          document.dispatchEvent(event);

          setTimeout(() => {
            const searchInput = document.querySelector(
              '.DocSearch-Input, input[type="search"]'
            ) as HTMLInputElement;
            if (searchInput) {
              searchInput.value = tagName;
              searchInput.focus();
            }
          }, 200);
        }
      }
    };

    // 为静态标签添加点击事件
    const setupTagListeners = () => {
      if (typeof window !== "undefined") {
        // 延迟执行以确保DOM已加载
        setTimeout(() => {
          const tagElements = document.querySelectorAll(
            ".tag:not([data-clickable])"
          );
          tagElements.forEach((tag) => {
            // 标记为已处理，避免重复绑定
            tag.setAttribute("data-clickable", "true");
            // 添加点击事件
            tag.addEventListener("click", (e) => {
              e.preventDefault();
              const tagText = tag.textContent?.trim();
              if (tagText) {
                handleTagClick(tagText);
              }
            });
          });
        }, 100);
      }
    };

    // 路由变化时的处理
    router.onAfterRouteChanged = () => {
      // 为新页面的标签添加点击事件
      setupTagListeners();
    };

    // 初始化时也要执行一次
    if (typeof window !== "undefined") {
      window.addEventListener("DOMContentLoaded", setupTagListeners);
      // 如果DOM已经加载完成，立即执行
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupTagListeners);
      } else {
        setupTagListeners();
      }
    }
  },
} satisfies Theme;
