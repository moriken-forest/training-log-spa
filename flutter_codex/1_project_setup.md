# 1. プロジェクトセットアップ

1. Flutter 3.x 以降をインストールして新規プロジェクトを作成します。
   ```bash
   flutter create training_log_flutter
   ```
2. ルート直下に `assets` ディレクトリを配置し、元リポジトリの `public/logs` と `public/schedule` をそのままコピーします。
3. `pubspec.yaml` に上記 `assets` フォルダを登録し、`shared_preferences` パッケージを追加します。
4. テストには `flutter_test` と `mockito` を利用します。
5. 依存関係を取得したら `flutter pub get` を実行してプロジェクトを同期します。
6. エミュレーターや実機で動作確認する際は `flutter run` を使います。
7. 作業単位ごとに日本語のコミットメッセージを残してください。
