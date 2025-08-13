---
title: 浮生若梦
description: 工作之余的生活分享，影音推荐等等
---

# 浮生若梦

浮生若梦，为欢几何？这里记录工作之余的生活分享，影视推荐（我本人是个电影迷），可能还会穿插一些音乐分享。

还有，我家的可爱猫猫 🐈 那是一定少不了的~

<ClientOnly>
  <Swiper
    :space-between="12"
    :loop="true"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :pagination="{ clickable: true }"
    :modules="[Autoplay, Pagination]"
    class="life-swiper"
  >
    <SwiperSlide>
      <img src="/images/life/My cat.webp" alt="蓝宝贝" class="doc-image" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/images/life/xiaoju_anime.webp" alt="橘宝贝" class="doc-image" />
    </SwiperSlide>
  </Swiper>
</ClientOnly>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

</script>

<style>
.life-swiper {
  max-width: 760px;
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0 24px;
  /* 固定高度（含响应式上下限），避免不同图片高度导致容器跳动 */
  height: clamp(240px, 45vw, 420px);
}

.life-swiper .swiper-slide {
  display: flex;
  align-items: center;   /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 100%;
  background: transparent;
}

.life-swiper img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain; /* 保持完整展示并等比缩放 */
}
</style>

## 📚 文章分类

<div class="base-card">
  <h3 class="card-title">
    <a href="/life/records">生活分享</a>
  </h3>
  <div class="card-content">
    <p class="card-description">
      我走得很慢，但决不放弃。
    </p>
    <img src="/images/life/run by the sea.webp" alt="我走得很慢，但决不放弃。" class="doc-image">
  </div>
  
</div>

<div class="base-card">
  <h3 class="card-title">
    <a href="/life/recommendations">影音推荐</a>
  </h3>
  <div class="card-content">
    <p class="card-description">
      光影与音符，是这世间最优雅的表达。
    </p>
    <img src="/images/life/film and music.webp" alt="光影与音符" class="doc-image">
  </div>
  
</div>

<div class="base-card">
  <h3 class="card-title">
    <a href="/life/others">其他分享</a>
  </h3>
  <div class="card-content">
    <p class="card-description">
      想到什么，就记录点什么。
    </p>
    <img src="/images/life/other.webp" alt="其他" class="doc-image">
  </div>
  
</div>
