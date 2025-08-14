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
import { setupTagListeners } from "./utils/tagSearch";

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

    // 路由变化时的处理
    router.onAfterRouteChange = () => {
      // 为新页面的标签添加点击事件
      setupTagListeners();
    };

    // 初始化时也要执行一次
    if (typeof window !== "undefined") {
      // 确保在DOM完全加载后执行
      const initTagListeners = () => {
        setupTagListeners();
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTagListeners);
      } else {
        // DOM已经加载完成，延迟一点执行以确保所有组件都已渲染
        setTimeout(initTagListeners, 200);
      }

      // 监听页面完全加载完成
      window.addEventListener("load", () => {
        setTimeout(setupTagListeners, 100);
      });
    }
  },
} satisfies Theme;
