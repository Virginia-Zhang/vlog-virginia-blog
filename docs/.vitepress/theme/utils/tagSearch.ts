/**
 * 标签点击处理工具函数
 * 点击标签时触发 VitePress 搜索功能
 */

/**
 * 等待搜索框出现并设置值
 * @param tagName 标签名称
 * @param maxAttempts 最大尝试次数
 */
const waitForSearchInput = (
  tagName: string,
  maxAttempts: number = 20
): void => {
  let attempts = 0;

  const trySetValue = () => {
    attempts++;
    const searchInput = document.querySelector(
      '.DocSearch-Input, input[type="search"], .DocSearch-Input input'
    ) as HTMLInputElement;

    if (searchInput) {
      // 设置值并触发事件
      searchInput.value = tagName;
      searchInput.focus();

      // 触发输入事件以确保搜索功能正常工作
      const inputEvent = new Event("input", { bubbles: true });
      searchInput.dispatchEvent(inputEvent);

      // 触发change事件
      const changeEvent = new Event("change", { bubbles: true });
      searchInput.dispatchEvent(changeEvent);

      console.log(`搜索框值设置成功: ${tagName}`);
      return true;
    }

    if (attempts >= maxAttempts) {
      console.warn(`搜索框未找到，已尝试 ${maxAttempts} 次`);
      return false;
    }

    // 继续尝试
    setTimeout(trySetValue, 50);
  };

  trySetValue();
};

/**
 * 处理标签点击事件，触发站内搜索
 * @param tagName 标签名称
 */
export const handleTagClick = (tagName: string): void => {
  if (typeof window !== "undefined") {
    console.log(`点击标签: ${tagName}`);

    // 触发VitePress搜索功能
    const searchButton = document.querySelector(
      '.DocSearch-Button, .VPNavBarSearchButton, [aria-label="Search"]'
    ) as HTMLElement;

    if (searchButton) {
      // 点击搜索按钮打开搜索
      searchButton.click();
      console.log("搜索按钮点击成功");

      // 使用更可靠的方式等待搜索框出现
      waitForSearchInput(tagName);
    } else {
      console.log("未找到搜索按钮，使用键盘快捷键");
      // 使用键盘快捷键作为备选
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);

      // 使用更可靠的方式等待搜索框出现
      waitForSearchInput(tagName);
    }
  }
};

/**
 * 为静态标签添加点击事件监听器
 */
export const setupTagListeners = (): void => {
  if (typeof window !== "undefined") {
    console.log("开始设置标签监听器");

    const setupListeners = () => {
      const tagElements = document.querySelectorAll(
        ".tag:not([data-clickable]), .hot-tag:not([data-clickable])"
      );

      console.log(`找到 ${tagElements.length} 个标签元素`);

      tagElements.forEach((tag) => {
        // 标记为已处理，避免重复绑定
        tag.setAttribute("data-clickable", "true");

        // 移除可能存在的旧事件监听器
        tag.removeEventListener("click", tagClickHandler);

        // 添加点击事件
        tag.addEventListener("click", tagClickHandler);
      });
    };

    // 标签点击处理函数
    const tagClickHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const tag = e.currentTarget as HTMLElement;
      const tagText = tag.textContent?.trim();

      if (tagText) {
        console.log(`标签被点击: ${tagText}`);
        handleTagClick(tagText);
      }
    };

    // 延迟执行以确保DOM已加载
    setTimeout(setupListeners, 100);

    // 如果页面还在加载中，等待DOMContentLoaded事件
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupListeners);
    }

    // 监听动态内容变化（如果有的话）
    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        let shouldSetup = false;
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (
                  element.querySelector &&
                  element.querySelector(".tag, .hot-tag")
                ) {
                  shouldSetup = true;
                }
              }
            });
          }
        });

        if (shouldSetup) {
          setTimeout(setupListeners, 50);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
};
