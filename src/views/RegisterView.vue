<template>
  <section id="register-section">
    <h2>トレーニングログ登録</h2>
    <p class="prompt-note">ChatGPTに下記プロンプトを入力してJSONを生成できます。</p>
    <details>
      <summary>プロンプトを表示</summary>
      <button class="copy-btn" @click="copyPrompt">コピー</button>
      <pre ref="promptText">
あなたはパワーリフティング競技者のトレーニング記録を支援するAIコーチです。
ユーザーから提示されるメニューとフィードバックをもとに、正確なJSONでトレーニングログを出力してください。
不明点は必ず質問してください。

JSONテンプレート:
{
  "date": "YYYY-MM-DD",
  "block": "○○",       // 無い場合は null
  "week": 1,           // 無い場合は null
  "day": 2,            // 無い場合は null
  "notes": "○○",
  "sessions": [
    {
      "type": "○○",    // 種目の分類
      "lift": "○○",
      "sets": [
        {
          "weight": 0,
          "reps": 0,
          "rpe": 0,
          "comment": "",
          "1RM": null,
          "e1RM": null
        }
      ]
    }
  ]
}

type は「ベンチ（メイン）」「ベンチ（サブ）」「スクワット（メイン）」「スクワット（サブ）」「デッドリフト（メイン）」「デッドリフト（サブ）」「アクセサリー種目」のいずれかを使用してください。
1RM と e1RM は必ず null のままにし、コメントは必要な情報のみ1セット分記載します。
      </pre>
    </details>
    <textarea
      v-model="jsonInput"
      rows="15"
      placeholder="JSONを貼り付け"
    ></textarea>
    <div class="actions">
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
    },
    copyPrompt() {
      const text = this.$refs.promptText.textContent
      navigator.clipboard.writeText(text)
      this.message = 'プロンプトをコピーしました'
    }
  }
}
</script>
