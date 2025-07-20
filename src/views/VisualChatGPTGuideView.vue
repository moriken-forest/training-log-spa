<template>
  <section class="apple-guide">
    <div class="hero" :style="heroStyle">
      <h1 class="logo">Training Log</h1>
      <p class="catch">すべてのワークアウトを、一つに。</p>
      <div class="hero-img" :style="heroImgStyle"></div>
    </div>
    <div class="features">
      <div class="feature" v-for="(f, i) in features" :key="i">
        <span class="material-icons icon">{{ f.icon }}</span>
        <h2>{{ f.title }}</h2>
        <p>{{ f.text }}</p>
      </div>
    </div>
    <div class="cta">
      <router-link to="/guide" class="btn">今すぐ始める</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VisualChatGPTGuideView',
  data() {
    return {
      scrollY: 0,
      features: [
        { icon: 'flash_on', title: '素早い記録', text: 'ChatGPTで作ったJSONを貼るだけでログが完成。' },
        { icon: 'calendar_today', title: 'スマートに整理', text: 'カレンダーで進捗を簡単チェック。' },
        { icon: 'lock', title: 'あなた専用', text: 'データはあなたのブラウザに保存されます。' }
      ]
    }
  },
  computed: {
    heroStyle() {
      return {
        transform: `translateY(${this.scrollY * 0.2}px)`
      }
    },
    heroImgStyle() {
      return {
        transform: `translateY(${this.scrollY * 0.1}px)`
      }
    }
  },
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    this.$el.querySelectorAll('.feature').forEach(el => observer.observe(el))
    this.observer = observer
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.observer) this.observer.disconnect()
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY || window.pageYOffset
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
  padding: 80px 16px 60px;
  background: linear-gradient(135deg, #111, #333);
  transition: transform 0.3s ease-out;
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
.hero-img {
  width: 100%;
  height: 300px;
  background: radial-gradient(circle at center, #444, #111);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  transition: transform 0.3s ease-out;
}
.features {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 800px;
  margin: 60px auto;
  padding: 0 16px;
}
.feature {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.feature.visible {
  opacity: 1;
  transform: none;
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
</style>
