/**
 * 标签点击处理工具函数
 * 点击标签时触发 VitePress 搜索功能
 */

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

      // 延迟填入搜索词
      setTimeout(() => {
        const searchInput = document.querySelector(
          '.DocSearch-Input, input[type="search"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.value = tagName;
          searchInput.focus();
          // 触发输入事件
          const event = new Event("input", { bubbles: true });
          searchInput.dispatchEvent(event);
        }
      }, 100);
    } else {
      // 使用键盘快捷键作为备选
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);

      // 延迟填入搜索词
      setTimeout(() => {
        const searchInput = document.querySelector(
          '.DocSearch-Input, input[type="search"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.value = tagName;
          searchInput.focus();
        }
      }, 200);
    }
  }
};

/**
 * 为静态标签添加点击事件监听器
 */
export const setupTagListeners = (): void => {
  if (typeof window !== "undefined") {
    // 延迟执行以确保DOM已加载
    setTimeout(() => {
      const tagElements = document.querySelectorAll(
        ".tag:not([data-clickable])"
      );
      tagElements.forEach((tag) => {
        // 标记为已处理，避免重复绑定
        tag.setAttribute("data-clickable", "true");
        // 添加点击事件
        tag.addEventListener("click", (e) => {
          e.preventDefault();
          const tagText = tag.textContent?.trim();
          if (tagText) {
            handleTagClick(tagText);
          }
        });
      });
    }, 100);
  }
};
