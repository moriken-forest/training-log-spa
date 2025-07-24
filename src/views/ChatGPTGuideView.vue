<template>
  <section id="guide-section">
    <h2>ChatGPT連携ガイド</h2>
    <p>ChatGPTを利用してトレーニングログ用JSONを作成する手順です。</p>
    <ol>
      <li>プロンプトと全体のメニューをChatGPTに渡します。</li>
      <li>その日のメニュー内容と日付を伝えます。</li>
      <li>セット終了ごとに所感やRPEを送ります。</li>
      <li>トレーニングが終わったらJSONを出力させます。</li>
      <li>生成されたJSONを登録画面に貼り付けて保存してください。</li>
    </ol>
    <p class="prompt-note">下記テキストをコピーしてChatGPTに入力します。</p>
    <button aria-label="プロンプトをコピー" class="copy-btn" @click="copyPrompt">コピー</button>
    <button aria-label="今日のプロンプトを作成してコピー" class="copy-btn" @click="copyTodayPrompt">今日のプロンプトを作る</button>
    <pre ref="promptText">
あなたはパワーリフティング競技者のトレーニング記録を支援するAIコーチです。

以下のルールに従って、トレーニングログをJSON形式で正確に出力してください。  
このログはトレーニング完了後、ユーザーがフィードバックを伝えたあとに記録します。

---

【運用前提】
- トレーニング前に、ユーザーからその日の「メニュー（種目・セット・重量・目安RPEなど）」が提示されます。
- トレーニング実施後、ユーザーは「各セットや各種目の所感やRPEなどのフィードバック」を会話形式で段階的に伝えます。
- フィードバックが完了したタイミングで、**その日の記録を構造化JSONで出力する**のがあなたの役割です。
- また、次回のトレーニングメニューを提示する必要がある場合は、進捗や目的を考慮してメニューを組み立ててください。
- jsonに埋めるべき値明確にわからない場合は、必ず出力前にユーザーに確認すること。推測は行わないこと。

---

【出力形式】
以下の形式でJSONを出力してください：

```
{
  "date": "YYYY-MM-DD",
  "block": "○○",
  "week": 1,
  "day": 2,
  "notes": "○○",
  "sessions": [
    {
      "type": "○○",
      "lift": "○○",
      "sets": [
        {
          "weight": 〇〇,
          "reps": 〇〇,
          "rpe": 〇〇,
          "comment": "○○",
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
- すべてのセットで "1RM": null, "e1RM": null とする
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
    <p class="prompt-note">JSONテンプレートのみをコピーする場合はこちら。</p>
    <button aria-label="JSONテンプレートをコピー" class="copy-btn" @click="copyJsonTemplate">テンプレートをコピー</button>
    <pre ref="jsonTemplate">{{ jsonTemplate }}</pre>
  </section>
</template>

<script>
import { getUser } from '../utils/user'
import { addScheduleCalcFields } from '../utils/schedule'

export default {
  data() {
    return {
      todayPlan: null,
      jsonTemplate: `{
  "date": "YYYY-MM-DD",
  "block": "○○",
  "week": 1,
  "day": 2,
  "notes": "○○",
  "sessions": [
    {
      "type": "○○",
      "lift": "○○",
      "sets": [
        {
          "weight": 〇〇,
          "reps": 〇〇,
          "rpe": 〇〇,
          "comment": "○○",
          "1RM": null,
          "e1RM": null
        }
      ]
    }
  ]
}`
    }
  },
  created() {
    const user = getUser()
    const base = import.meta.env.BASE_URL
    fetch(`${base}schedule/${user}/training-schedule.json`)
      .then(r => r.json())
      .then(sched => {
        addScheduleCalcFields(sched)
        this.todayPlan = this.findTodayPlan(sched)
      })
  },
  methods: {
    copyPrompt() {
      const text = this.$refs.promptText.textContent
      navigator.clipboard.writeText(text)
      alert('プロンプトをコピーしました')
    },
    copyJsonTemplate() {
      navigator.clipboard.writeText(this.jsonTemplate)
      alert('JSONテンプレートをコピーしました')
    },
    findTodayPlan(sched) {
      const today = new Date().toISOString().slice(0, 10)
      for (const block of sched.blocks || []) {
        for (const week of block.weeks || []) {
          for (const day of week.days || []) {
            if (day.date === today) {
              return {
                date: day.date,
                block: block.block,
                week: week.week,
                day: Number(String(day.day).replace('Day', '')),
                sessions: day.sessions
              }
            }
          }
        }
      }
      return null
    },
    copyTodayPrompt() {
      const baseText = this.$refs.promptText.textContent
      const today = new Date().toISOString().slice(0, 10)
      let text = `${baseText}\n\n今日は${today}です。`
      if (this.todayPlan) {
        const menu = JSON.stringify(this.todayPlan, null, 2)
        text += `\n本日のメニュー:\n${menu}`
      }
      navigator.clipboard.writeText(text)
      alert('プロンプトをコピーしました')
    }
  }
}
</script>

