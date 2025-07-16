# 4. UI 構成と画面遷移

1. **CalendarPage** – カレンダー表示とログ詳細・予定詳細の切替を担当
2. **ListPage** – ログ一覧とスケジュール一覧の切替、カテゴリー・ページサイズ指定を管理
3. **CategoryPage** – 種目カテゴリーごとのログ一覧
4. **RegisterPage** – JSON 登録フォームとプロンプト表示
5. **NavigationBar** – カレンダー・一覧・登録・カテゴリー・ユーザー切替を提供

各ページの日本語テキストは Vue 版から流用し、ナビゲーションは `BottomNavigationBar` を基本とします。

ルーティングは `Navigator` と `MaterialPageRoute` を組み合わせ、`/calendar`、`/list`、`/category`、`/register` の4画面を名前付きルートとして登録します。ユーザー変更後は `setState` で画面を再構築する仕組みを採用してください。
