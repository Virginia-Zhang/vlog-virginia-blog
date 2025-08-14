/**
 * 标签点击处理工具函数
 * 点击标签时触发 VitePress 搜索功能
 */

/**
 * 等待搜索框出现并设置值，以确保网站初次加载完成时，点击标签也能正常触发搜索功能，标签文本可回显到搜索框里
 * 使用轮询机制，每50ms检查一次搜索框是否加载出来，最多检查20次，避免无限循环
 * 如果搜索框加载出来，则设置值并触发事件
 * 如果搜索框没有加载出来，则继续等待
 * 如果超过20次都没有加载出来，则返回false
 *
 *
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

      return true;
    }

    if (attempts >= maxAttempts) {
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
    // 触发VitePress搜索功能
    const searchButton = document.querySelector(
      '.DocSearch-Button, .VPNavBarSearchButton, [aria-label="Search"]'
    ) as HTMLElement;

    if (searchButton) {
      // 点击搜索按钮打开搜索
      searchButton.click();

      // 使用更可靠的方式等待搜索框出现
      waitForSearchInput(tagName);
    } else {
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
    const setupListeners = () => {
      const tagElements = document.querySelectorAll(
        ".tag:not([data-clickable]), .hot-tag:not([data-clickable])"
      );

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
        handleTagClick(tagText);
      }
    };

    // 延迟执行以确保DOM已加载
    setTimeout(setupListeners, 100);

    // 如果页面还在加载中，等待DOMContentLoaded事件
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupListeners);
    }
  }
};
