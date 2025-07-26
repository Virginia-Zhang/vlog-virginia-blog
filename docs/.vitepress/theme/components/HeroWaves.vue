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
  margin-top: -12vh;
  position: relative;
  width: 100%;
  height: 12vh;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .tk-banner-waves {
    height: 8vh;
    min-height: 40px;
    margin-top: -7vh;
  }
}

@media (max-width: 480px) {
  .tk-banner-waves {
    height: 6vh;
    min-height: 30px;
    margin-top: -5vh;
  }
}

/* 减弱动画以提升性能 */
@media (prefers-reduced-motion: reduce) {
  .parallax > .wave-layer {
    animation-duration: 8s;
  }
}
</style>
