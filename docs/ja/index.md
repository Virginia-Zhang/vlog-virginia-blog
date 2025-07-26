---
layout: home

hero:
  name: "Vlog-Virginia's Blog"
  text: "技術成長と生活の洞察を記録"
  tagline: "歩みは遅くとも、決して諦めない"
  image:
    src: /images/hero-image.svg
    alt: Virginia's Blog
  actions:
    - theme: brand
      text: 読み始める
      link: /ja/frontend/
    - theme: alt
      text: 私について
      link: /ja/about

features:
  - icon: 🚀
    title: フロントエンド開発
    details: HTML/CSS、JavaScript、Vue、Reactなどのフロントエンド技術を深く探求し、ベストプラクティスとパフォーマンス最適化テクニックをシェア
    link: /ja/frontend/
  - icon: ⚡
    title: バックエンド開発
    details: Java、Node.js、データベース設計などのバックエンド技術をカバーし、高性能でスケーラブルなサーバーサイドアプリケーションを構築
    link: /ja/backend/
  - icon: 🛠️
    title: DevOps浅談
    details: デプロイメント経験、Nginx設定、Dockerコンテナ化、Linuxシステム管理などのDevOps実践をシェア
    link: /ja/devops/
  - icon: 💡
    title: プロジェクト雑談
    details: 開発中に遭遇した落とし穴を記録し、優れた開発実践とソリューションをまとめる
    link: /ja/projects/
  - icon: 🌍
    title: 言語学習
    details: 英語と日本語の学習心得、技術文書の読み方、国際化開発経験のシェア
    link: /ja/languages/
  - icon: 🌱
    title: 生活シェア
    details: 仕事以外の生活の洞察、旅行の見聞、読書ノート、そして美しい生活への思考
    link: /ja/life/
---

## 最新記事

<div class="recent-posts">
  <div class="blog-card fade-in-up">
    <h3><a href="/ja/frontend/vue/vue3-composition-api">Vue 3 Composition API 深度解析</a></h3>
    <div class="meta">
      <span>2024-01-15</span> · <span>フロントエンド開発</span> · <span>5分読了</span>
    </div>
    <p class="excerpt">Vue 3 Composition APIの設計理念、コア機能、そして実際のプロジェクトでの応用実践を深く理解...</p>
    <div class="tags">
      <span class="tag">Vue3</span>
      <span class="tag">Composition API</span>
      <span class="tag">JavaScript</span>
    </div>
  </div>

  <div class="blog-card fade-in-up">
    <h3><a href="/ja/backend/nodejs/express-middleware">Express ミドルウェア機構深度剖析</a></h3>
    <div class="meta">
      <span>2024-01-12</span> · <span>バックエンド開発</span> · <span>8分読了</span>
    </div>
    <p class="excerpt">Express.jsミドルウェアの動作原理を包括的に解析し、ソースコードの観点からリクエスト処理フローを理解...</p>
    <div class="tags">
      <span class="tag">Node.js</span>
      <span class="tag">Express</span>
      <span class="tag">ミドルウェア</span>
    </div>
  </div>

  <div class="blog-card fade-in-up">
    <h3><a href="/ja/devops/docker/container-optimization">Docker コンテナパフォーマンス最適化実践</a></h3>
    <div class="meta">
      <span>2024-01-10</span> · <span>DevOps浅談</span> · <span>6分読了</span>
    </div>
    <p class="excerpt">本番環境でのDockerコンテナパフォーマンス最適化の実用的なテクニックとベストプラクティスをシェア...</p>
    <div class="tags">
      <span class="tag">Docker</span>
      <span class="tag">パフォーマンス最適化</span>
      <span class="tag">コンテナ化</span>
    </div>
  </div>
</div>

## ブログについて

ここは Virginia の個人技術ブログで、ソフトウェア開発の道のりでの学習心得と実践経験を記録しています。初心者でも経験豊富な開発者でも、ここでのコンテンツがお役に立てればと思います。

### 🎯 ブログの特色

- **技術の深さ**：技術紹介だけでなく、原理解析と実践応用により重点を置く
- **実用性の強さ**：各記事が実際のプロジェクト経験と結びつき、実行可能なソリューションを提供
- **継続的な更新**：最新の技術トレンドと学習心得を定期的にシェア
- **多言語サポート**：中国語、英語、日本語の 3 言語をサポートし、異なる背景の読者に便利

### 📫 連絡先

記事内容についてご質問やご提案がございましたら、以下の方法でお気軽にお連絡ください：

- **GitHub**: [your-username](https://github.com/your-username)
- **メール**: your-email@example.com
- **WeChat**: your-wechat-id

技術の道で一緒に成長しましょう！

<style>
.recent-posts {
  margin-top: 2rem;
}

.recent-posts .blog-card {
  margin-bottom: 1.5rem;
}

.recent-posts .blog-card:nth-child(2) {
  animation-delay: 0.1s;
}

.recent-posts .blog-card:nth-child(3) {
  animation-delay: 0.2s;
}

.recent-posts a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.recent-posts a:hover {
  color: var(--vp-c-brand-1);
}
</style>
