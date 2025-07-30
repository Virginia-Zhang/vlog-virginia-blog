<!-- 首页Hero区域底部横幅波浪 -->
<template>
  <div class="hero-waves-wrapper">
    <svg
      class="tk-banner-waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
      aria-label="首页横幅波浪"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use class="wave-layer wave1" xlink:href="#gentle-wave" x="48" y="0" />
        <use class="wave-layer wave2" xlink:href="#gentle-wave" x="48" y="3" />
        <use class="wave-layer wave3" xlink:href="#gentle-wave" x="48" y="5" />
        <use class="wave-layer wave4" xlink:href="#gentle-wave" x="48" y="7" />
      </g>
    </svg>
  </div>
</template>

<script setup>
// 可以在这里添加任何需要的 JavaScript 逻辑
</script>

<style scoped>
.hero-waves-wrapper {
  position: relative;
  width: 100%;
  pointer-events: none; /* 确保不影响页面交互 */
}

.tk-banner-waves {
  margin-top: -11vh;
  position: relative;
  width: 100%;
  height: 11vh;
  min-height: 50px;
  max-height: 150px;
  z-index: 10;
}

/* 波浪动画 */
.parallax > .wave-layer {
  animation: wave-animation 5s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

/* 第一层波浪 - 最浅最快 */
.wave1 {
  animation-delay: -2s;
  animation-duration: 7s;
  fill: rgba(var(--vp-c-bg-rgb, 255, 255, 255), 0.7);
  opacity: 0.7;
}

/* 第二层波浪 */
.wave2 {
  animation-delay: -3s;
  animation-duration: 10s;
  fill: rgba(var(--vp-c-bg-rgb, 255, 255, 255), 0.5);
  opacity: 0.5;
}

/* 第三层波浪 */
.wave3 {
  animation-delay: -4s;
  animation-duration: 13s;
  fill: rgba(var(--vp-c-bg-rgb, 255, 255, 255), 0.3);
  opacity: 0.3;
}

/* 第四层波浪 - 最深最慢 */
.wave4 {
  animation-delay: -5s;
  animation-duration: 20s;
  fill: var(--vp-c-bg, #ffffff);
  opacity: 1;
}

/* 波浪移动动画 */
@keyframes wave-animation {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* 暗色主题适配 */
:root.dark .wave1 {
  fill: rgba(26, 26, 26, 0.7);
}

:root.dark .wave2 {
  fill: rgba(26, 26, 26, 0.5);
}

:root.dark .wave3 {
  fill: rgba(26, 26, 26, 0.3);
}

:root.dark .wave4 {
  fill: var(--vp-c-bg);
}

/* 响应式设计，综合考虑屏幕宽度和高度来控制wave的高度 */

/* 手机竖屏 (宽度小于768px) */
@media (max-width: 767px) {
  .tk-banner-waves {
    height: 6vh;
    min-height: 30px;
    margin-top: -6vh;
  }
}

/* 手机横屏 (宽度768px-1023px，高度小于800px) */
@media (min-width: 768px) and (max-width: 1023px) and (max-height: 800px) {
  .tk-banner-waves {
    height: 5vh;
    min-height: 25px;
    margin-top: -5vh;
  }
}

/* 特殊宽高比手机 (宽度500px-600px，高度700px-800px) - 包括Surface Duo等设备 */
@media (min-width: 500px) and (max-width: 600px) and (min-height: 700px) and (max-height: 800px) {
  .tk-banner-waves {
    height: 7vh;
    min-height: 35px;
    margin-top: -7vh;
  }
}

/* 平板竖屏 (宽度768px-1023px，高度大于800px) */
@media (min-width: 768px) and (max-width: 1023px) and (min-height: 800px) {
  .tk-banner-waves {
    height: 7vh;
    min-height: 35px;
    margin-top: -7vh;
  }
}

/* 小笔记本 (宽度1024px-1279px，高度小于900px) */
@media (min-width: 1024px) and (max-width: 1279px) and (max-height: 900px) {
  .tk-banner-waves {
    height: 8vh;
    min-height: 40px;
    margin-top: -8vh;
  }
}

/* 标准笔记本 (宽度1024px-1279px，高度900px-1100px) */
@media (min-width: 1024px) and (max-width: 1279px) and (min-height: 900px) and (max-height: 1100px) {
  .tk-banner-waves {
    height: 9vh;
    min-height: 45px;
    margin-top: -9vh;
  }
}

/* 大笔记本 (宽度1024px-1279px，高度大于1100px) */
@media (min-width: 1024px) and (max-width: 1279px) and (min-height: 1100px) {
  .tk-banner-waves {
    height: 10vh;
    min-height: 50px;
    margin-top: -10vh;
  }
}

/* 桌面显示器 (宽度大于1280px，高度小于1200px) */
@media (min-width: 1280px) and (max-height: 1200px) {
  .tk-banner-waves {
    height: 10vh;
    min-height: 50px;
    margin-top: -10vh;
  }
}

/* 标准桌面 (宽度大于1280px，高度1200px-1400px) */
@media (min-width: 1280px) and (min-height: 1200px) and (max-height: 1400px) {
  .tk-banner-waves {
    height: 11vh;
    min-height: 55px;
    margin-top: -11vh;
  }
}

/* 大桌面 (宽度大于1280px，高度大于1400px) */
@media (min-width: 1280px) and (min-height: 1400px) {
  .tk-banner-waves {
    height: 12vh;
    min-height: 60px;
    margin-top: -12vh;
  }
}

/* Surface Pro 7 特殊适配 (912x1368) */
@media (min-width: 900px) and (max-width: 920px) and (min-height: 1350px) and (max-height: 1380px) {
  .tk-banner-waves {
    height: 10vh;
    min-height: 50px;
    margin-top: -10vh;
  }
}

/* Surface Duo 特殊适配 (540x720) */
@media (min-width: 530px) and (max-width: 550px) and (min-height: 710px) and (max-height: 730px) {
  .tk-banner-waves {
    height: 8vh;
    min-height: 35px;
    margin-top: -8vh;
  }
}

/* 超宽屏适配 (宽度大于1920px) */
@media (min-width: 1920px) {
  .tk-banner-waves {
    height: 13vh;
    min-height: 65px;
    margin-top: -13vh;
  }
}

/* 减弱动画以提升性能 */
@media (prefers-reduced-motion: reduce) {
  .parallax > .wave-layer {
    animation-duration: 8s;
  }
}
</style>
