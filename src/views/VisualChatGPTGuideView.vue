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
        { icon: 'file_copy', title: 'プロンプトを豪快にコピー', text: 'ガイドのプロンプトをまるごとコピーし、準備万端の気持ちでスタート。' },
        { icon: 'send', title: 'メニューを丁寧に送信', text: '今日の種目や重量はもちろん、狙いまで細かくChatGPTに届けます。' },
        { icon: 'edit', title: '目的をしっかり共有', text: '各セットの意図やポイントを付け加え、理解を深めてもらいます。' },
        { icon: 'chat', title: 'セット毎に熱く報告', text: '感触やRPEを逐一伝え、ChatGPTとの会話を盛り上げていきます。' },
        { icon: 'check_circle', title: '記録内容を再確認', text: '抜けや誤記がないか、もったいないほど念入りにチェックします。' },
        { icon: 'code', title: 'JSON化を依頼', text: 'トレーニング終了後、まとめとしてログをJSON形式で出力してもらいます。' },
        { icon: 'search', title: 'JSONをじっくり確認', text: '項目や値の漏れがないか、細部までくどいくらい見直します。' },
        { icon: 'save_alt', title: 'アプリに貼り付け', text: '完璧なJSONを登録画面へコピペし、あなたのデータとして保存。' },
        { icon: 'rocket_launch', title: '次のステップへ', text: '蓄積したログをもとに、さらなる成長へ向けて走り出しましょう。' }
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
    }, { threshold: 0.1 })

    this.$refs.stepEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.2}s`
      this.observer.observe(el)
    })
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
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: opacity 0.8s ease, transform 0.8s ease;
  background: var(--card-bg);
  padding: var(--spacing);
  margin-bottom: var(--spacing);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px var(--shadow);
  text-align: center;
}
.step::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: skewX(-20deg);
}
.step.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.step.show::before {
  animation: shine 1s forwards;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
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
