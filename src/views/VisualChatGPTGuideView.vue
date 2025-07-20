<template>
  <section class="visual-guide">
    <h2 class="title">ワクワクJSONガイド</h2>
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="step"
      ref="stepEls"
      :style="{ animation: `${step.anim} 1.2s forwards`, animationDelay: `${i * 0.1}s` }"
    >
      <span class="material-icons icon">{{ step.icon }}</span>
      <h3>{{ step.title }}</h3>
      <p v-html="step.text"></p>
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
        { icon: 'auto_awesome', title: 'ステップ1', anim: 'anim1', text: 'ステップ1ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ2', anim: 'anim2', text: 'ステップ2ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ3', anim: 'anim3', text: 'ステップ3ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ4', anim: 'anim4', text: 'ステップ4ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ5', anim: 'anim5', text: 'ステップ5ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ6', anim: 'anim6', text: 'ステップ6ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ7', anim: 'anim7', text: 'ステップ7ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ8', anim: 'anim8', text: 'ステップ8ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ9', anim: 'anim9', text: 'ステップ9ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ10', anim: 'anim10', text: 'ステップ10ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ11', anim: 'anim11', text: 'ステップ11ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ12', anim: 'anim12', text: 'ステップ12ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ13', anim: 'anim13', text: 'ステップ13ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ14', anim: 'anim14', text: 'ステップ14ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ15', anim: 'anim15', text: 'ステップ15ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ16', anim: 'anim16', text: 'ステップ16ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ17', anim: 'anim17', text: 'ステップ17ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ18', anim: 'anim18', text: 'ステップ18ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ19', anim: 'anim19', text: 'ステップ19ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ20', anim: 'anim20', text: 'ステップ20ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ21', anim: 'anim21', text: 'ステップ21ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ22', anim: 'anim22', text: 'ステップ22ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ23', anim: 'anim23', text: 'ステップ23ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ24', anim: 'anim24', text: 'ステップ24ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ25', anim: 'anim25', text: 'ステップ25ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ26', anim: 'anim26', text: 'ステップ26ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ27', anim: 'anim27', text: 'ステップ27ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ28', anim: 'anim28', text: 'ステップ28ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ29', anim: 'anim29', text: 'ステップ29ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ30', anim: 'anim30', text: 'ステップ30ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ31', anim: 'anim31', text: 'ステップ31ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ32', anim: 'anim32', text: 'ステップ32ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ33', anim: 'anim33', text: 'ステップ33ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ34', anim: 'anim34', text: 'ステップ34ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ35', anim: 'anim35', text: 'ステップ35ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ36', anim: 'anim36', text: 'ステップ36ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ37', anim: 'anim37', text: 'ステップ37ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ38', anim: 'anim38', text: 'ステップ38ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ39', anim: 'anim39', text: 'ステップ39ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ40', anim: 'anim40', text: 'ステップ40ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ41', anim: 'anim41', text: 'ステップ41ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ42', anim: 'anim42', text: 'ステップ42ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ43', anim: 'anim43', text: 'ステップ43ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ44', anim: 'anim44', text: 'ステップ44ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ45', anim: 'anim45', text: 'ステップ45ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ46', anim: 'anim46', text: 'ステップ46ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ47', anim: 'anim47', text: 'ステップ47ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ48', anim: 'anim48', text: 'ステップ48ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ49', anim: 'anim49', text: 'ステップ49ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
        { icon: 'auto_awesome', title: 'ステップ50', anim: 'anim50', text: 'ステップ50ではJSON活用の幅を更に広げ、細部にまで気を配りながら応用テクニックを学びます。実例を交えて丁寧に確認し、記録の一貫性を守る重要性を繰り返し意識しましょう。'},
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

    this.$refs.stepEls.forEach(el => {
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
.step.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.step .icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 8px;
}
@keyframes anim1 { from { opacity: 0; transform: translateY(2px) rotate(3deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim2 { from { opacity: 0; transform: translateY(4px) rotate(6deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim3 { from { opacity: 0; transform: translateY(6px) rotate(9deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim4 { from { opacity: 0; transform: translateY(8px) rotate(12deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim5 { from { opacity: 0; transform: translateY(10px) rotate(15deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim6 { from { opacity: 0; transform: translateY(12px) rotate(18deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim7 { from { opacity: 0; transform: translateY(14px) rotate(21deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim8 { from { opacity: 0; transform: translateY(16px) rotate(24deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim9 { from { opacity: 0; transform: translateY(18px) rotate(27deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim10 { from { opacity: 0; transform: translateY(20px) rotate(30deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim11 { from { opacity: 0; transform: translateY(22px) rotate(33deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim12 { from { opacity: 0; transform: translateY(24px) rotate(36deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim13 { from { opacity: 0; transform: translateY(26px) rotate(39deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim14 { from { opacity: 0; transform: translateY(28px) rotate(42deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim15 { from { opacity: 0; transform: translateY(30px) rotate(45deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim16 { from { opacity: 0; transform: translateY(32px) rotate(48deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim17 { from { opacity: 0; transform: translateY(34px) rotate(51deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim18 { from { opacity: 0; transform: translateY(36px) rotate(54deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim19 { from { opacity: 0; transform: translateY(38px) rotate(57deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim20 { from { opacity: 0; transform: translateY(40px) rotate(60deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim21 { from { opacity: 0; transform: translateY(42px) rotate(63deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim22 { from { opacity: 0; transform: translateY(44px) rotate(66deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim23 { from { opacity: 0; transform: translateY(46px) rotate(69deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim24 { from { opacity: 0; transform: translateY(48px) rotate(72deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim25 { from { opacity: 0; transform: translateY(50px) rotate(75deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim26 { from { opacity: 0; transform: translateY(52px) rotate(78deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim27 { from { opacity: 0; transform: translateY(54px) rotate(81deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim28 { from { opacity: 0; transform: translateY(56px) rotate(84deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim29 { from { opacity: 0; transform: translateY(58px) rotate(87deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim30 { from { opacity: 0; transform: translateY(60px) rotate(90deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim31 { from { opacity: 0; transform: translateY(62px) rotate(93deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim32 { from { opacity: 0; transform: translateY(64px) rotate(96deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim33 { from { opacity: 0; transform: translateY(66px) rotate(99deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim34 { from { opacity: 0; transform: translateY(68px) rotate(102deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim35 { from { opacity: 0; transform: translateY(70px) rotate(105deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim36 { from { opacity: 0; transform: translateY(72px) rotate(108deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim37 { from { opacity: 0; transform: translateY(74px) rotate(111deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim38 { from { opacity: 0; transform: translateY(76px) rotate(114deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim39 { from { opacity: 0; transform: translateY(78px) rotate(117deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim40 { from { opacity: 0; transform: translateY(80px) rotate(120deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim41 { from { opacity: 0; transform: translateY(82px) rotate(123deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim42 { from { opacity: 0; transform: translateY(84px) rotate(126deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim43 { from { opacity: 0; transform: translateY(86px) rotate(129deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim44 { from { opacity: 0; transform: translateY(88px) rotate(132deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim45 { from { opacity: 0; transform: translateY(90px) rotate(135deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim46 { from { opacity: 0; transform: translateY(92px) rotate(138deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim47 { from { opacity: 0; transform: translateY(94px) rotate(141deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim48 { from { opacity: 0; transform: translateY(96px) rotate(144deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim49 { from { opacity: 0; transform: translateY(98px) rotate(147deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
@keyframes anim50 { from { opacity: 0; transform: translateY(100px) rotate(150deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
</style>
