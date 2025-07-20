<template>
  <section class="visual-guide">
    <h2 class="title">ワクワクJSONガイド</h2>
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="step"
      ref="stepEls"
    >
      <span class="material-icons icon">{{ step.icon }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.text }}</p>
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
        { icon: 'file_copy', title: 'プロンプトをコピー', text: 'まずは既存のガイドからプロンプトをコピーします。' },
        { icon: 'send', title: 'メニューを送信', text: '今日の種目や重量をChatGPTに伝えましょう。' },
        { icon: 'chat', title: 'セット毎に報告', text: 'RPEや所感を送って会話を続けます。' },
        { icon: 'code', title: 'JSON化を依頼', text: 'トレーニング終了後、ログをJSONで出力してもらいます。' },
        { icon: 'save_alt', title: 'アプリに貼り付け', text: '生成されたJSONを登録ページに貼り付けて保存します。' }
      ]
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
        }
      })
    }, { threshold: 0.1 })

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
}
.title {
  text-align: center;
  margin-bottom: var(--spacing);
}
.step {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s, transform 0.6s;
  background: var(--card-bg);
  padding: var(--spacing);
  margin-bottom: var(--spacing);
  border-radius: var(--radius);
  box-shadow: 0 4px 8px var(--shadow);
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
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
