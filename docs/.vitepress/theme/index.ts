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

    // 路由变化时的处理
    router.onAfterRouteChanged = () => {
      // 可以在这里添加页面切换后的逻辑
    };
  },
} satisfies Theme;
