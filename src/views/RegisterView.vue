<template>
  <section id="register-section">
    <h2>トレーニングログ登録</h2>
    <textarea v-model="jsonInput" rows="15" style="width:100%" placeholder="JSONを貼り付け"></textarea>
    <div>
      <button @click="register">登録</button>
      <span class="message">{{ message }}</span>
    </div>
  </section>
</template>

<script>
import { saveLog, addCalcFields } from '../utils/logStorage'

export default {
  data() {
    return { jsonInput: '', message: '' }
  },
  methods: {
    register() {
      this.message = ''
      let obj
      try {
        obj = JSON.parse(this.jsonInput)
      } catch (e) {
        this.message = 'JSONが正しくありません'
        return
      }
      if (!obj.date) {
        this.message = 'dateフィールドが必要です'
        return
      }
      addCalcFields(obj)
      saveLog(obj)
      this.jsonInput = ''
      this.message = '登録しました'
    }
  }
}
</script>
