<template>
  <div class="under-construction">
    <div class="construction-alert">
      <div class="alert-content">
        <div class="alert-icon">
          <img
            src="/images/building-construction.svg"
            alt="施工图标"
            width="24"
            height="24"
          />
        </div>
        <div class="alert-text">
          <h3 class="alert-title">施工中</h3>
          <p class="alert-description">
            很高兴见到你！但很抱歉，这个页面目前还在施工中。你可以先寻找其他你感兴趣的内容来阅读，谢谢！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.under-construction {
  margin: 2rem 0;
}

.construction-alert {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  border-left: 4px solid #a855f7;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.construction-alert::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 70%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.alert-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

.alert-icon img {
  filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%)
    hue-rotate(246deg) brightness(104%) contrast(97%);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.alert-text {
  flex: 1;
}

.alert-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #581c87;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.alert-description {
  margin: 0;
  color: #6b21a8;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .construction-alert {
    padding: 1rem;
  }

  .alert-content {
    flex-direction: column;
    text-align: center;
  }

  .alert-icon {
    align-self: center;
  }

  .alert-title {
    font-size: 1.1rem;
  }

  .alert-description {
    font-size: 0.9rem;
  }
}

/* 深色主题适配 */
:root[class*="dark"] .construction-alert {
  background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%);
  border-left-color: #a855f7;
}

:root[class*="dark"] .construction-alert::before {
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 70%
  );
}

:root[class*="dark"] .alert-icon {
  background: rgba(168, 85, 247, 0.2);
}

:root[class*="dark"] .alert-icon img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(93deg) brightness(103%) contrast(103%);
}

:root[class*="dark"] .alert-title {
  color: #e2e8f0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

:root[class*="dark"] .alert-description {
  color: #a0aec0;
}
</style>
