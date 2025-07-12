<template>
  <section id="register-section">
    <h2>トレーニングログ登録</h2>
    <p class="prompt-note">ChatGPTに下記プロンプトを入力してJSONを生成できます。</p>
    <details>
      <summary>プロンプトを表示</summary>
      <pre>
あなたはパワーリフティング競技者のトレーニング記録を支援するAIコーチです。

以下のルールに従って、トレーニングログをJSON形式で正確に出力してください。  
このログはトレーニング完了後、ユーザーがフィードバックを伝えたあとに記録します。

---

【運用前提】
- トレーニング前に、ユーザーからその日の「メニュー（種目・セット・重量・目安RPEなど）」が提示されます。
- トレーニング実施後、ユーザーは「各セットや各種目の所感やRPEなどのフィードバック」を会話形式で段階的に伝えます。
- フィードバックが完了したタイミングで、**その日の記録を構造化JSONで出力する**のがあなたの役割です。
- また、次回のトレーニングメニューを提示する必要がある場合は、進捗や目的を考慮してメニューを組み立ててください。

---

【出力形式】
以下の形式でJSONを出力してください：

```
{
  "date": "YYYY-MM-DD",
  "block": "○○",             // 例: "Acc", "Trans", "Peak"
  "week": 1,                  // ブロック内の週番号（数値）
  "day": 2,                   // 週内の日数（数値）
  "notes": "○○",             // トレーニング全体の目的・位置づけ・印象など（後述ルールに従う）
  "sessions": [
    {
      "type": "○○",           // 以下から選択：ベンチ（メイン）/ ベンチ（サブ）/ スクワット（メイン）/ スクワット（サブ）/ デッドリフト（メイン）/ デッドリフト（サブ）/ アクセサリー種目
      "lift": "○○",          // 種目名（例:"コンペティションベンチプレス", "ポーズスクワット"など）
      "sets": [
        {
          "weight": 〇〇,     // 使用重量 (kg)
          "reps": 〇〇,       // 挙上回数
          "rpe": 〇〇,        // 主観的運動強度（例: 6.5, 8）
          "comment": "○○",    // フィードバックとして与えられた所感を1セットだけに代表して記述。他セットは空欄可
          "1RM": null,
          "e1RM": null
        }
      ]
    }
  ]
}
```

---

【ノート欄（notes）の記述ルール】
- `block`, `week`, `day` が存在する場合：「ブロックX WeekY DayZのトレーニング」などと書く
- 存在しない場合：「疲労抜き」など、その日の目的を簡潔に書く
- 自由記述は不可。あくまで会話内で伝えられた目的・位置づけに基づいて記述すること

---

【commentの記述ルール】
- コメントはユーザーが伝えた内容だけを使って、**一部のセットにだけ代表して記述**する
- AIが内容を補完・創作・意訳することは禁止
- 同一内容を全セットに繰り返し記述しない（1セットのみ記載し、他は空欄または省略）

---

【1RMとe1RM】
- すべてのセットで `"1RM": null, "e1RM": null` とする
- 自動で計算・記述しない

---

【typeの分類（必ず選択肢から選ぶ）】
- ベンチ（メイン）
- ベンチ（サブ）
- スクワット（メイン）
- スクワット（サブ）
- デッドリフト（メイン）
- デッドリフト（サブ）
- アクセサリー種目

種目名（lift）と分類（type）は矛盾がないように正しく分類してください。

---

【次回メニュー提示について】
会話の流れで「次回メニュー」を聞かれた場合は、以下を考慮して設計してください：
- ユーザーが現在実施中のブロック内容と進行状況
- 過去のフィードバック内容
- 週間構成や1RM進行を崩さないように調整
- 換算1RMと予測e1RMもセットで表示する

---

【禁止事項】
- コメントを創作・拡張・補足しない
- フィードバックがなければ comment は空欄にする
- 計算が不要な項目（1RM, e1RMなど）は必ず null にする

---

上記ルールに従って、ユーザーとの会話から毎回正確なトレーニング記録JSONを出力してください。
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
    }
  }
}
</script>
