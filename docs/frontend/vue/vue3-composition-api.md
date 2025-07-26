---
title: Vue 3 Composition API 深度解析
date: 2024-01-15
author: Virginia
category: frontend
tags: [Vue3, Composition API, JavaScript]
description: 深入了解 Vue 3 Composition API 的设计理念、核心特性以及在实际项目中的应用实践
---

# Vue 3 Composition API 深度解析

Vue 3 的 Composition API 是一个重要的特性，它为组件逻辑组织提供了全新的方式。本文将深入探讨其设计理念、核心特性以及实际应用。

## 🎯 为什么需要 Composition API？

### 传统 Options API 的局限性

在 Vue 2 中，我们使用 Options API 来组织组件逻辑：

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>
```

虽然这种方式简单直观，但随着组件复杂度增加，会遇到以下问题：

1. **逻辑分散**：相关逻辑分布在不同的选项中
2. **复用困难**：逻辑复用主要依赖 mixins，容易产生命名冲突
3. **类型推断**：TypeScript 支持不够友好

### Composition API 的优势

Composition API 解决了这些问题：

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>
```

## 🚀 核心 API 详解

### 1. reactive 和 ref

```js
import { reactive, ref } from "vue";

// 使用 reactive 处理对象
const state = reactive({
  count: 0,
  name: "Virginia",
});

// 使用 ref 处理基本类型
const count = ref(0);
const name = ref("Virginia");

// 访问 ref 的值需要使用 .value
console.log(count.value); // 0
count.value++;
```

### 2. computed 计算属性

```js
import { ref, computed } from "vue";

const count = ref(1);
const doubleCount = computed(() => count.value * 2);

// 带有 getter 和 setter 的计算属性
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(" ");
  },
});
```

### 3. watch 和 watchEffect

```js
import { ref, watch, watchEffect } from "vue";

const count = ref(0);
const name = ref("Virginia");

// 侦听单个数据源
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});

// 侦听多个数据源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log("Multiple values changed");
});

// watchEffect 自动收集依赖
watchEffect(() => {
  console.log(`Count is ${count.value}`);
});
```

## 🛠️ 实际应用场景

### 1. 逻辑组合

```js
// composables/useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

// 在组件中使用
<script setup>
  import {useCounter} from '@/composables/useCounter' const{" "}
  {(count, increment, decrement, reset)} = useCounter(10)
</script>;
```

### 2. 生命周期钩子

```js
import { onMounted, onUnmounted, ref } from "vue";

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const updateMouse = (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", updateMouse);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateMouse);
  });

  return { x, y };
}
```

### 3. 异步数据获取

```js
// composables/useApi.js
import { ref, toRefs } from "vue";

export function useApi(url) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
```

## 🎨 最佳实践

### 1. 合理使用 ref 和 reactive

```js
// ✅ 好的做法
const count = ref(0); // 基本类型使用 ref
const user = reactive({
  // 对象使用 reactive
  name: "Virginia",
  age: 25,
});

// ❌ 避免的做法
const count = reactive({ value: 0 }); // 不要为基本类型使用 reactive
```

### 2. 组合函数命名规范

```js
// ✅ 使用 use 前缀
export function useCounter() {}
export function useMousePosition() {}
export function useApi() {}

// ❌ 避免的命名
export function counter() {}
export function getMousePosition() {}
```

### 3. 返回值结构

```js
// ✅ 返回对象，便于按需解构
export function useCounter() {
  return {
    count,
    increment,
    decrement,
  };
}

// 使用时
const { count, increment } = useCounter();

// ✅ 也可以返回数组，适合需要重命名的场景
export function useToggle(initialValue = false) {
  const state = ref(initialValue);
  const toggle = () => (state.value = !state.value);

  return [state, toggle];
}

// 使用时
const [isVisible, toggleVisible] = useToggle();
```

## 🔄 与 Options API 对比

| 特性       | Options API | Composition API      |
| ---------- | ----------- | -------------------- |
| 学习曲线   | 较平缓      | 稍陡峭               |
| 代码组织   | 按选项分组  | 按逻辑分组           |
| 逻辑复用   | mixins      | 组合函数             |
| TypeScript | 一般        | 优秀                 |
| 打包体积   | 较大        | 较小（tree-shaking） |

## 📝 总结

Composition API 为 Vue 3 带来了更强大的逻辑组织能力，特别适合以下场景：

1. **复杂组件**：逻辑较多，需要更好的组织方式
2. **逻辑复用**：多个组件间需要共享逻辑
3. **TypeScript 项目**：需要更好的类型推断
4. **大型项目**：需要更好的可维护性

虽然学习成本稍高，但长远来看，Composition API 能够帮助我们构建更健壮、更易维护的 Vue 应用。

---

_本文涵盖了 Vue 3 Composition API 的核心概念和实践技巧，希望对你的 Vue 学习之路有所帮助！_
