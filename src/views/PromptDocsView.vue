<template>
  <section id="prompt-docs">
    <h2>ChatGPTでトレーニングログJSONを生成する方法</h2>
    <div v-html="html" class="markdown"></div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import parseMarkdown from '../utils/markdown'

export default {
  setup() {
    const html = ref('')
    onMounted(() => {
      fetch(`${import.meta.env.BASE_URL}CHATGPT_JSON_PROMPT.md`)
        .then(r => r.text())
        .then(t => {
          html.value = parseMarkdown(t)
        })
    })
    return { html }
  }
}
</script>

<style scoped>
#prompt-docs {
  max-width: 800px;
  margin: 0 auto;
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: var(--spacing);
  box-shadow: 0 2px 6px var(--shadow);
}
#prompt-docs h2 {
  text-align: center;
  margin-bottom: var(--spacing);
  font-size: 1.5rem;
  color: var(--primary-dark);
}
.markdown {
  white-space: normal;
  line-height: 1.5;
}
</style>
