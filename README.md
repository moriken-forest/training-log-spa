# training-log-spa

https://moriken-forest.github.io/training-log-spa/#/calendar

サイトの操作方法は以下のページにまとめています。

https://moriken-forest.github.io/training-log-spa/#/usage


This repository manages daily training logs using GitHub Issues.

Open the **Issues** tab and click **New issue**. Choose **Training Log** to add or update a log.
To delete a log, create an issue with the label `delete-training-log` and include the username followed by the date:

```
test-user2025/09/01 13:52
```
The date portion can use `/` or `-` as separators and any time segment is ignored.
When adding a log, prefix the JSON with the username like `kenta{...}` in the description.

The automation workflow extracts the username and JSON block and saves it under `public/logs/<user>/`.
Training schedules are organized the same way and live under `public/schedule/<user>/`.

Computed `1RM` and `e1RM` values are rounded down to the nearest whole number when the log is processed.

The workflow deletes the specified log file from `public/logs/<user>/` and updates `index.json` automatically.

## 開発手順

1. 依存パッケージをインストールします。
   ```bash
   npm install
   ```
2. 開発用サーバーを起動してアプリを確認します。
   ```bash
   npm run dev
   ```
3. 本番ビルドは次のコマンドで作成できます。
   ```bash
   npm run build
   ```
4. テストを実行する場合は以下を実行してください。
   ```bash
   npm run test
   ```



## Flutter 移植向け資料

本 SPA を Flutter で再実装する場合は、`flutter_codex` ディレクトリ以下にある各種 Markdown ドキュメントを参照してください。プロジェクトのセットアップからテスト方針まで段階的に解説しています。また、Codex へそのまま渡せる総合プロンプトとして `FLUTTER_REIMPLEMENT_PROMPT.md` も用意しました。
