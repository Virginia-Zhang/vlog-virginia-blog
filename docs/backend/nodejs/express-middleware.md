---
title: Express 中间件机制深度剖析
date: 2024-01-12
author: Virginia
category: backend
tags: [Node.js, Express, 中间件]
description: 全面解析 Express.js 中间件的工作原理，从源码角度理解请求处理流程
---

# Express 中间件机制深度剖析

Express.js 的中间件机制是其核心特性之一，理解中间件的工作原理对于构建高质量的 Node.js 应用至关重要。

## 🤔 什么是中间件？

中间件（Middleware）是一个函数，它可以访问请求对象（req）、响应对象（res）以及应用程序请求-响应循环中的下一个中间件函数（next）。

```js
const middleware = (req, res, next) => {
  // 中间件逻辑
  console.log("Middleware executed");
  next(); // 调用下一个中间件
};

app.use(middleware);
```

## 🔄 中间件执行流程

Express 中间件按照注册顺序依次执行，形成一个管道：

```js
const express = require("express");
const app = express();

// 中间件 1
app.use((req, res, next) => {
  console.log("Middleware 1 - Before");
  next();
  console.log("Middleware 1 - After");
});

// 中间件 2
app.use((req, res, next) => {
  console.log("Middleware 2 - Before");
  next();
  console.log("Middleware 2 - After");
});

// 路由处理器
app.get("/", (req, res) => {
  console.log("Route handler");
  res.send("Hello World");
});

// 输出顺序：
// Middleware 1 - Before
// Middleware 2 - Before
// Route handler
// Middleware 2 - After
// Middleware 1 - After
```

## 📚 中间件类型

### 1. 应用级中间件

```js
// 应用于所有路由
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// 应用于特定路径
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});
```

### 2. 路由级中间件

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router middleware");
  next();
});

router.get("/profile", (req, res) => {
  res.send("User profile");
});

app.use("/user", router);
```

### 3. 错误处理中间件

```js
// 错误处理中间件必须有 4 个参数
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

### 4. 内置中间件

```js
// 静态文件服务
app.use(express.static("public"));

// JSON 解析
app.use(express.json());

// URL 编码解析
app.use(express.urlencoded({ extended: true }));
```

### 5. 第三方中间件

```js
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
```

## 🛠️ 自定义中间件实战

### 1. 请求日志中间件

```js
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};

app.use(requestLogger);
```

### 2. 身份验证中间件

```js
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// 保护路由
app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});
```

### 3. 缓存中间件

```js
const cache = new Map();

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < duration * 1000) {
      return res.json(cached.data);
    }

    // 重写 res.json 方法
    const originalJson = res.json;
    res.json = function (data) {
      cache.set(key, {
        data,
        timestamp: Date.now(),
      });
      originalJson.call(this, data);
    };

    next();
  };
};

app.get("/api/data", cacheMiddleware(600), (req, res) => {
  // 模拟数据库查询
  const data = { message: "Expensive operation result" };
  res.json(data);
});
```

## 🔍 源码分析

Express 中间件的核心实现在 `Layer` 类中：

```js
// 简化版的 Layer 实现
class Layer {
  constructor(path, fn) {
    this.path = path;
    this.handle = fn;
  }

  match(path) {
    return this.path === path || this.path === "*";
  }

  handleRequest(req, res, next) {
    try {
      this.handle(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

// 简化版的 Router 实现
class Router {
  constructor() {
    this.stack = [];
  }

  use(path, fn) {
    if (typeof path === "function") {
      fn = path;
      path = "*";
    }

    const layer = new Layer(path, fn);
    this.stack.push(layer);
  }

  handle(req, res, out) {
    let idx = 0;

    const next = (err) => {
      if (idx >= this.stack.length) {
        return out(err);
      }

      const layer = this.stack[idx++];

      if (!layer.match(req.path)) {
        return next(err);
      }

      if (err) {
        // 错误处理中间件
        if (layer.handle.length === 4) {
          layer.handle(err, req, res, next);
        } else {
          next(err);
        }
      } else {
        // 普通中间件
        if (layer.handle.length < 4) {
          layer.handleRequest(req, res, next);
        } else {
          next();
        }
      }
    };

    next();
  }
}
```

## ⚡ 性能优化

### 1. 中间件顺序优化

```js
// ❌ 低效的顺序
app.use(heavyMiddleware);
app.use("/api", apiRouter);
app.use(express.static("public"));

// ✅ 优化的顺序
app.use(express.static("public")); // 静态文件优先
app.use("/api", apiRouter); // API 路由
app.use(heavyMiddleware); // 重型中间件放后面
```

### 2. 条件性中间件

```js
// 只在生产环境使用压缩
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

// 只在开发环境使用详细日志
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
```

### 3. 异步中间件优化

```js
// ❌ 阻塞式异步操作
app.use(async (req, res, next) => {
  try {
    const result = await heavyAsyncOperation();
    req.result = result;
    next();
  } catch (error) {
    next(error);
  }
});

// ✅ 非阻塞式异步操作
app.use((req, res, next) => {
  // 将异步操作推迟到需要时执行
  req.getResult = () => heavyAsyncOperation();
  next();
});
```

## 🚨 常见陷阱

### 1. 忘记调用 next()

```js
// ❌ 错误：没有调用 next()
app.use((req, res, next) => {
  console.log("Middleware executed");
  // 请求被卡住，不会继续执行
});

// ✅ 正确：调用 next()
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});
```

### 2. 错误处理顺序

```js
// ❌ 错误：错误处理中间件放在前面
app.use((err, req, res, next) => {
  res.status(500).send("Error");
});

app.get("/", (req, res) => {
  throw new Error("Something went wrong");
});

// ✅ 正确：错误处理中间件放在最后
app.get("/", (req, res) => {
  throw new Error("Something went wrong");
});

app.use((err, req, res, next) => {
  res.status(500).send("Error");
});
```

## 📝 总结

Express 中间件机制提供了强大而灵活的请求处理能力：

1. **模块化**：将应用逻辑分解为可复用的中间件
2. **可组合**：通过组合不同中间件构建复杂功能
3. **可扩展**：易于添加新的功能模块
4. **可测试**：每个中间件都可以独立测试

掌握中间件机制是 Express 开发的基础，合理使用中间件能够显著提高代码的可维护性和可扩展性。
