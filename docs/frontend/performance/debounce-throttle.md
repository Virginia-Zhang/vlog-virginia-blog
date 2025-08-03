---
title: 防抖与节流：前端性能优化的利器
date: 2025-03-10
author: Virginia
category: frontend
tags: [JavaScript, 性能优化, 防抖, 节流]
description: 深入解析防抖(Debounce)和节流(Throttle)技术，从原理到实现，从基础应用到高级优化，帮助开发者掌握这两种重要的性能优化技巧
---

# 防抖与节流：前端性能优化的利器

## 前言

在前端开发中，我们经常需要处理用户输入、窗口调整、滚动等高频触发的事件。这些事件如果不加控制，会导致性能问题，影响用户体验。防抖(Debounce)和节流(Throttle)是两种重要的性能优化技术，能够有效控制函数的执行频率。本文将深入解析这两种技术的原理、实现和应用场景。

## 什么是防抖和节流？

### 防抖(Debounce)

防抖是指在一定时间内，多次触发同一个函数，只执行最后一次。就像电梯等待乘客一样，等待一段时间后才关门运行。

```javascript
// 防抖的基本概念
function debounce(func, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### 节流(Throttle)

节流是指在一定时间内，多次触发同一个函数，按照固定的时间间隔执行。就像游戏中的技能冷却时间，无论按多少次，都要等待冷却结束。

```javascript
// 节流的基本概念
function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
```

## 防抖的实现与应用

### 基础实现

```javascript
function debounce(func, delay, immediate = false) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      func.apply(context, args);
    }

    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}
```

### 高级实现（支持取消和立即执行）

```javascript
function debounce(func, delay, options = {}) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  const { leading = false, trailing = true, maxWait } = options;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = null;
    lastCallTime = time;

    return func.apply(thisArg, args);
  }

  function startTimer(pendingFunc, delay) {
    return setTimeout(pendingFunc, delay);
  }

  function cancelTimer(id) {
    clearTimeout(id);
  }

  function leadingEdge(time) {
    lastCallTime = time;
    timer = startTimer(timerExpired, delay);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = delay - timeSinceLastCall;

    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastCall)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;

    return (
      lastCallTime === 0 ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastCall >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timer = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timer = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = null;
    return result;
  }

  function cancel() {
    if (timer !== undefined) {
      cancelTimer(timer);
    }
    lastCallTime = 0;
    lastArgs = lastThis = timer = undefined;
  }

  function flush() {
    return timer === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timer !== undefined;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timer === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxWait !== undefined) {
        timer = startTimer(timerExpired, delay);
        return invokeFunc(lastCallTime);
      }
    }
    if (timer === undefined) {
      timer = startTimer(timerExpired, delay);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}
```

### 实际应用场景

#### 1. 搜索框输入

```javascript
// 搜索框防抖
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const debouncedSearch = debounce(async (query) => {
  if (query.trim() === "") {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    displaySearchResults(data);
  } catch (error) {
    console.error("搜索失败:", error);
  }
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

function displaySearchResults(results) {
  searchResults.innerHTML = results
    .map((item) => `<div class="search-item">${item.title}</div>`)
    .join("");
}
```

#### 2. 窗口大小调整

```javascript
// 窗口大小调整防抖
const debouncedResize = debounce(() => {
  // 重新计算布局
  updateLayout();

  // 重新绘制图表
  redrawCharts();

  console.log("窗口大小已调整");
}, 250);

window.addEventListener("resize", debouncedResize);

function updateLayout() {
  const container = document.querySelector(".container");
  const width = window.innerWidth;

  if (width < 768) {
    container.classList.add("mobile-layout");
  } else {
    container.classList.remove("mobile-layout");
  }
}

function redrawCharts() {
  // 重新绘制图表逻辑
  charts.forEach((chart) => chart.resize());
}
```

#### 3. 表单验证

```javascript
// 表单验证防抖
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const debouncedValidate = debounce(async (email) => {
  if (!email) {
    emailError.textContent = "";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "邮箱格式不正确";
    return;
  }

  // 检查邮箱是否已存在
  try {
    const response = await fetch(
      `/api/check-email?email=${encodeURIComponent(email)}`
    );
    const { exists } = await response.json();

    if (exists) {
      emailError.textContent = "该邮箱已被注册";
    } else {
      emailError.textContent = "";
    }
  } catch (error) {
    emailError.textContent = "验证失败，请重试";
  }
}, 500);

emailInput.addEventListener("input", (e) => {
  debouncedValidate(e.target.value);
});
```

## 节流的实现与应用

### 基础实现

```javascript
function throttle(func, delay, options = {}) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  const { leading = true, trailing = true } = options;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = null;
    lastCallTime = time;

    return func.apply(thisArg, args);
  }

  function startTimer(pendingFunc, delay) {
    return setTimeout(pendingFunc, delay);
  }

  function cancelTimer(id) {
    clearTimeout(id);
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = delay - timeSinceLastCall;

    return timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    return timeSinceLastCall >= delay;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timer = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timer = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = null;
    return result;
  }

  function leadingEdge(time) {
    lastCallTime = time;
    timer = startTimer(timerExpired, delay);
    return leading ? invokeFunc(time) : result;
  }

  function cancel() {
    if (timer !== undefined) {
      cancelTimer(timer);
    }
    lastCallTime = 0;
    lastArgs = lastThis = timer = undefined;
  }

  function flush() {
    return timer === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timer !== undefined;
  }

  function throttled(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;

    if (isInvoking) {
      if (timer === undefined) {
        return leadingEdge((lastCallTime = time));
      }
    }
    if (timer === undefined) {
      timer = startTimer(timerExpired, delay);
    }
    return result;
  }

  throttled.cancel = cancel;
  throttled.flush = flush;
  throttled.pending = pending;

  return throttled;
}
```

### 实际应用场景

#### 1. 滚动事件处理

```javascript
// 滚动事件节流
const throttledScroll = throttle(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // 更新导航栏样式
  updateNavbar(scrollTop);

  // 懒加载图片
  checkLazyLoad(scrollTop);

  // 更新进度条
  updateProgressBar(scrollTop);
}, 100);

window.addEventListener("scroll", throttledScroll);

function updateNavbar(scrollTop) {
  const navbar = document.querySelector(".navbar");
  if (scrollTop > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function checkLazyLoad(scrollTop) {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const windowHeight = window.innerHeight;

  lazyImages.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top <= windowHeight + 100) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  });
}

function updateProgressBar(scrollTop) {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = `${progress}%`;
}
```

#### 2. 按钮点击防重复提交

```javascript
// 按钮点击节流
const submitButton = document.getElementById("submit-btn");

const throttledSubmit = throttle(async (event) => {
  event.preventDefault();

  const form = event.target.closest("form");
  const formData = new FormData(form);

  // 显示加载状态
  submitButton.disabled = true;
  submitButton.textContent = "提交中...";

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      showMessage("提交成功！", "success");
    } else {
      showMessage(result.message || "提交失败", "error");
    }
  } catch (error) {
    showMessage("网络错误，请重试", "error");
  } finally {
    // 恢复按钮状态
    submitButton.disabled = false;
    submitButton.textContent = "提交";
  }
}, 1000); // 1秒内只能提交一次

submitButton.addEventListener("click", throttledSubmit);
```

#### 3. 游戏中的按键处理

```javascript
// 游戏按键节流
class GameController {
  constructor() {
    this.keys = {};
    this.player = { x: 0, y: 0 };

    // 移动按键节流
    this.throttledMove = throttle((direction) => {
      this.movePlayer(direction);
    }, 50); // 50ms间隔，确保流畅移动

    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          this.throttledMove("up");
          break;
        case "ArrowDown":
        case "KeyS":
          this.throttledMove("down");
          break;
        case "ArrowLeft":
        case "KeyA":
          this.throttledMove("left");
          break;
        case "ArrowRight":
        case "KeyD":
          this.throttledMove("right");
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }

  movePlayer(direction) {
    const speed = 5;

    switch (direction) {
      case "up":
        this.player.y -= speed;
        break;
      case "down":
        this.player.y += speed;
        break;
      case "left":
        this.player.x -= speed;
        break;
      case "right":
        this.player.x += speed;
        break;
    }

    this.updatePlayerPosition();
  }

  updatePlayerPosition() {
    const playerElement = document.querySelector(".player");
    playerElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }
}

// 初始化游戏控制器
const gameController = new GameController();
```

## React Hooks 实现

### 自定义防抖 Hook

```javascript
import { useCallback, useRef } from "react";

function useDebounce(callback, delay, deps = []) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps]
  );

  return debouncedCallback;
}

// 使用示例
function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchAPI = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("搜索失败:", error);
    }
  }, []);

  const debouncedSearch = useDebounce(searchAPI, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="搜索..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 自定义节流 Hook

```javascript
import { useCallback, useRef } from "react";

function useThrottle(callback, delay, deps = []) {
  const lastCallTime = useRef(0);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastCallTime.current >= delay) {
        callback(...args);
        lastCallTime.current = now;
      }
    },
    [callback, delay, ...deps]
  );

  return throttledCallback;
}

// 使用示例
function ScrollComponent() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const throttledScroll = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);

  return (
    <div>
      <p>当前滚动位置: {scrollY}px</p>
    </div>
  );
}
```

## 性能对比与选择

### 何时使用防抖？

- **搜索输入**：用户输入时延迟搜索
- **窗口调整**：调整完成后重新布局
- **表单验证**：输入完成后验证
- **API 调用**：避免频繁请求

### 何时使用节流？

- **滚动事件**：定期更新 UI
- **按钮点击**：防止重复提交
- **游戏控制**：控制移动频率
- **实时更新**：定期同步数据

### 性能测试

```javascript
// 性能测试函数
function performanceTest() {
  const iterations = 10000;

  // 测试防抖
  console.time("debounce");
  const debouncedFn = debounce(() => {}, 100);
  for (let i = 0; i < iterations; i++) {
    debouncedFn();
  }
  console.timeEnd("debounce");

  // 测试节流
  console.time("throttle");
  const throttledFn = throttle(() => {}, 100);
  for (let i = 0; i < iterations; i++) {
    throttledFn();
  }
  console.timeEnd("throttle");
}

// 执行测试
performanceTest();
```

## 最佳实践

### 1. 合理设置延迟时间

```javascript
// 不同场景的推荐延迟时间
const DELAYS = {
  SEARCH: 300, // 搜索输入
  RESIZE: 250, // 窗口调整
  SCROLL: 100, // 滚动事件
  CLICK: 1000, // 按钮点击
  VALIDATION: 500, // 表单验证
  API_CALL: 1000, // API调用
};
```

### 2. 内存管理

```javascript
// 组件卸载时清理定时器
useEffect(() => {
  const debouncedFn = debounce(callback, delay);

  return () => {
    debouncedFn.cancel(); // 清理定时器
  };
}, [callback, delay]);
```

### 3. 错误处理

```javascript
// 带错误处理的防抖函数
function safeDebounce(func, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        func.apply(this, args);
      } catch (error) {
        console.error("防抖函数执行错误:", error);
        // 错误处理逻辑
      }
    }, delay);
  };
}
```

## 总结

防抖和节流是前端性能优化的重要技术，它们能够有效控制函数的执行频率，提升用户体验。通过本文的学习，我们了解了：

1. **防抖和节流的基本概念和区别**
2. **详细的实现原理和代码**
3. **实际应用场景和最佳实践**
4. **React Hooks 的实现方式**
5. **性能优化和错误处理**

在实际开发中，合理使用防抖和节流技术，能够显著提升应用的性能和用户体验。选择合适的技术和参数，是成功应用这些技术的关键。

## 参考资料

- [Lodash Debounce](https://lodash.com/docs/4.17.15#debounce)
- [Lodash Throttle](https://lodash.com/docs/4.17.15#throttle)
- [MDN - Event Handling](https://developer.mozilla.org/en-US/docs/Web/Events)
- [React Hooks Documentation](https://react.dev/reference/react)

---

_本文深入探讨了防抖和节流技术的各个方面，从基础概念到高级应用，希望能帮助读者更好地理解和运用这两种重要的性能优化技巧。_
