# 3. データ構造と保存形式

- `assets/logs/<user>/<date>.json` を読み込み、初回起動時にログ一覧を生成します。
- ユーザーが登録したログは `SharedPreferences` に `log:YYYY-MM-DD` の形式で保存し、アセットのログと結合して扱います。
- スケジュールは `assets/schedule/<user>/training-schedule.json` を利用し、未実施の予定のみ表示対象とします。

各ユーザーのログ一覧は `assets/logs/<user>/index.json` をベースにし、起動時に `SharedPreferences` 側のインデックスとマージしてください。保存形式を揃えることで、Vue 版と同じデータ構造で扱えます。インデックスの例は以下の通りです。

```json
[
  "2025-09-05",
  "2025-09-06"
]
```

保存するログは 1 ファイルにつき 1 日分で、キー `log:YYYY-MM-DD` で検索できるようにします。ログ削除時はインデックスから日付を除外し、該当ファイルも削除してください。
