<template>
  <section id="usage-section">
    <h2>サイトの使い方</h2>
    <p>PowerLog の機能と操作方法をまとめています。</p>
    <h3>1. 基本操作</h3>
    <ul>
      <li>GitHub Issues から <strong>Training Log</strong> テンプレートを使ってログを登録します。</li>
      <li>削除したい場合は <code>delete-training-log</code> ラベルを付け、ユーザー名と日付を記載した issue を作成します。</li>
      <li>登録された JSON は <code>public/logs/&lt;user&gt;</code> に保存され、カレンダーや一覧に反映されます。</li>
    </ul>
    <h3>2. 各画面の概要</h3>
    <ul>
      <li><strong>カレンダー</strong> : 日付ごとのログとスケジュールを確認できます。クリックすると詳細を表示します。</li>
      <li><strong>一覧</strong> : ログやスケジュールを表形式で閲覧できます。カテゴリや件数を切り替え可能です。</li>
      <li><strong>登録</strong> : ChatGPT などで作成した JSON を貼り付けてローカルに保存します。</li>
      <li><strong>ガイド</strong> : ChatGPT を使った記録方法を説明しています。</li>
    </ul>
    <h3>3. ユーザー切り替えとキャッシュ</h3>
    <ul>
      <li>ヘッダーの人物アイコンからユーザーを選択できます。</li>
      <li>更新が反映されない場合はリフレッシュアイコンでキャッシュを削除してください。</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'UsageGuideView'
}
</script>
