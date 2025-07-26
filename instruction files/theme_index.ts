import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 如果有Teek主题，取消下面的注释并使用
// import TeekTheme from 'vitepress-theme-teek'
import './custom.css'
import GiscusComments from './components/GiscusComments.vue'

export default {
  extends: DefaultTheme, // 如果使用Teek主题，改为 TeekTheme
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 在文档底部插入评论组件
      'doc-after': () => h(GiscusComments)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('GiscusComments', GiscusComments)
    
    // 路由变化时的处理
    router.onAfterRouteChanged = () => {
      // 可以在这里添加页面切换后的逻辑
    }
  }
} satisfies Theme