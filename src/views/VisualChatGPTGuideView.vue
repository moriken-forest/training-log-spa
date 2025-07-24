<template>
  <section class="apple-guide">
    <div class="hero" v-scroll-animation>
      <h1 class="logo">JSONガイド</h1>
      <p class="catch">ChatGPTで記録する手順をまとめました</p>
    </div>
    <div class="features">
      <div class="feature" v-for="(f, i) in features" :key="i" v-scroll-animation>
        <span class="material-icons icon">{{ f.icon }}</span>
        <h2>{{ f.title }}</h2>
        <p>{{ f.text }}</p>
      </div>
    </div>
    <div class="cta" v-scroll-animation>
      <router-link to="/guide" class="btn">今すぐ始める</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VisualChatGPTGuideView',
  data() {
    return {
      features: [
        { icon: 'flash_on', title: '素早い記録', text: 'ChatGPTで作ったJSONを貼るだけでログが完成。' },
        { icon: 'calendar_today', title: 'スマートに整理', text: 'カレンダーで進捗を簡単チェック。' },
        { icon: 'lock', title: 'あなた専用', text: 'データはあなたのブラウザに保存されます。' }
      ]
    }
  }
}
</script>

<style scoped>
.apple-guide {
  text-align: center;
  color: var(--text);
}
.hero {
  padding: 60px 16px;
  background: linear-gradient(135deg, #111, #333);
}
.hero .logo {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.hero .catch {
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: var(--primary-light);
}
.features {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 800px;
  margin: 60px auto;
  padding: 0 16px;
}
.feature .icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: var(--primary-light);
}
.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}
.feature p {
  color: var(--muted);
}
.cta {
  margin-bottom: 80px;
}
.btn {
  display: inline-block;
  background: var(--primary);
  color: var(--bg);
  padding: 12px 32px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}
.btn:hover {
  background: var(--primary-dark);
}
.before-enter {
  opacity: 0;
  transform: translateY(40px);
}
.enter {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
