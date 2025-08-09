# Google スプレッドシート連携アーキテクチャ

## 概要
トレーニングスケジュールを Google スプレッドシートで管理し、変更があればこのリポジトリへ自動的に取り込む仕組みを整える。Google Apps Script がシートの更新を検知して GitHub の `repository_dispatch` イベントを送信し、GitHub Actions がスケジュール JSON を生成して保存する。

## コンポーネントと役割

### Google スプレッドシート
- スケジュールの編集・閲覧用のデータストア。
- 日付、種目、重量、目標回数などの列を持つ。

### Google Apps Script
- シートの更新または定期実行トリガーで発火。
- シートの内容を JSON 形式に変換。
- GitHub API で `repository_dispatch` イベント `update-schedule` を送信し、ペイロードとしてユーザー名とスケジュールを渡す。
- 認証には GitHub のパーソナルアクセストークン (PAT) をスクリプトプロパティに保存して利用する。

### GitHub リポジトリ (本プロジェクト)
- `.github/workflows/receive-schedule.yml` (要実装): `repository_dispatch` の `update-schedule` イベントを受信して処理を開始する。
- `scripts/saveSchedule.mjs` (要実装): 受信したスケジュールを `public/schedule/<user>/` 以下に保存し、`index.json` を更新する。
- ワークフローはコミットを作成し、`main` ブランチへプッシュする。

## 設定手順

### Google 側
1. スケジュール用のスプレッドシートを作成する。
2. Apps Script プロジェクトを作成し、上記の処理を実装する。
3. GitHub PAT をスクリプトプロパティに登録する。
4. シートの編集時に Apps Script が発火するようトリガーを設定する。

### GitHub 側
1. PAT をリポジトリシークレット `GH_PAT_FOR_SHEET` として登録する。
2. `.github/workflows/receive-schedule.yml` と `scripts/saveSchedule.mjs` を追加する。
3. ワークフロー内で `GH_PAT_FOR_SHEET` を使用してコミットを作成する。

## 今後の拡張
- 複数ユーザーを扱うためシートにユーザー列を追加し、Apps Script でユーザー単位の JSON を生成する。
- スケジュールの変更履歴を GitHub Issues に記録する自動化を追加する。
