<template>
  <section class="visual-guide">
    <h2 class="title">華やかJSONガイド</h2>
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="step"
      ref="stepEls"
      :style="{ animationDelay: `${i * 0.2}s` }"
    >
      <span class="material-icons icon">{{ step.icon }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.text }}</p>
      <div class="art" v-html="step.art"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VisualChatGPTGuideView',
  data() {
    return {
      observer: null,
      steps: [
        {
          icon: 'assignment',
          title: 'STEP 1',
          text: 'プロンプトと全体のメニューをChatGPTに渡します。',
          art: `
            <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
                </marker>
              </defs>
              <rect x="5" y="15" width="40" height="30" rx="5" fill="#d1eaff" />
              <line x1="45" y1="30" x2="75" y2="30" stroke="#333" stroke-width="2" marker-end="url(#arrow)" />
              <rect x="75" y="10" width="40" height="40" rx="5" fill="#ffe4d1" />
            </svg>`
        },
        {
          icon: 'event',
          title: 'STEP 2',
          text: 'その日のメニュー内容と日付を伝えます。',
          art: `
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="100" height="40" rx="8" fill="#fff4cc" stroke="#333"/>
              <path d="M10 25h100" stroke="#333"/>
              <circle cx="30" cy="35" r="3" fill="#333"/>
              <circle cx="60" cy="35" r="3" fill="#333"/>
              <circle cx="90" cy="35" r="3" fill="#333"/>
            </svg>`
        },
        {
          icon: 'chat',
          title: 'STEP 3',
          text: 'セット終了ごとに所感やRPEを送ります。',
          art: `
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="80" height="30" rx="5" fill="#e1ffd7" />
              <polygon points="30,40 30,50 40,40" fill="#e1ffd7" />
            </svg>`
        },
        {
          icon: 'code',
          title: 'STEP 4',
          text: 'トレーニングが終わったらJSONを出力させます。',
          art: `
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="15" width="60" height="30" rx="5" fill="#e8e8e8" />
              <text x="60" y="35" text-anchor="middle" fill="#333" font-size="14">{...}</text>
            </svg>`
        },
        {
          icon: 'save',
          title: 'STEP 5',
          text: '生成されたJSONを登録画面に貼り付けて保存してください。',
          art: `
            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="15" width="40" height="30" rx="5" fill="#d9d9ff" />
              <path d="M60 45 v10" stroke="#333" stroke-width="2" />
              <polygon points="55,55 65,55 60,60" fill="#333" />
            </svg>`
        }
      ]
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
          this.observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })

    this.$refs.stepEls.forEach(el => this.observer.observe(el))
  },
  beforeUnmount() {
    this.observer && this.observer.disconnect()
  }
}
</script>

<style scoped>
.visual-guide {
  padding: var(--spacing);
  background: linear-gradient(135deg, #f3f8ff, #fff);
}
.title {
  text-align: center;
  margin-bottom: var(--spacing);
}
.step {
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  animation: fadeUp 0.8s forwards;
  background: var(--card-bg);
  padding: var(--spacing);
  margin-bottom: var(--spacing);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px var(--shadow);
  text-align: center;
}
.step.show {
  opacity: 1;
  transform: translateY(0);
}
.step .icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 8px;
  color: var(--primary-dark);
}
.art {
  margin-top: 8px;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
