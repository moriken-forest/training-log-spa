# 5. ロジック変換のポイント

- `logStorage.js` の `addCalcFields` と同じ計算式を Dart で実装します。
- 1RM 計算例:

```dart
int bench1RM(num w, num r) => (w * r / 40 + w).floor();
int benchE1RM(num w, num r, num rpe) => (w * (r + 10 - rpe) / 40 + w).floor();
int sd1RM(num w, num r) => (w * r / 33.3 + w).floor();
int sdE1RM(num w, num r, num rpe) => (w * (r + 10 - rpe) / 33.3 + w).floor();
```

- ログ保存時に上記計算を実行し、表示でも同様の値を利用します。

`saveLog` や `deleteLog` も同名のメソッドとして `log_storage.dart` に実装し、インデックス管理を `SharedPreferences` で行います。計算ロジックはユニットテストで検証し、Vue 版と同じ数値になることを確認してください。

アプリ起動時には `assets` から読み込んだログ一覧と `SharedPreferences` 内のインデックスを突き合わせ、重複しないよう統合します。スケジュールも同様に未実施分とユーザーが追加した予定を合わせ、一覧画面で表示できるようにします。
