<!-- src/components/LogDetail.vue -->
<template>
  <div class="log-detail">
    <!-- メタ情報 -->
    <div class="meta">
      <span>ブロック: {{ log.block || '-' }}</span>
      <span>Week: {{ log.week || '-' }}</span>
      <span>Day: {{ log.day || '-' }}</span>
    </div>
    <p v-if="log.notes" class="notes">{{ log.notes }}</p>

    <!-- セッションごとにテーブル -->
    <div
      v-for="(session, idx) in log.sessions"
      :key="idx"
      class="session"
    >
      <h3 class="session-title">
        {{ session.lift }}
        <small v-if="session.variation">({{ session.variation }})</small>
      </h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>重量(kg)</th>
              <th>回数</th>
              <th>RPE</th>
              <th>コメント</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(set, si) in session.sets" :key="si">
              <td>{{ set.weight }}</td>
              <td>{{ set.reps }}</td>
              <td>{{ set.rpe }}</td>
              <td class="comment">{{ set.comment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogDetail',
  props: {
    log: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.log-detail {
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* メタ情報 */
.meta {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}
.meta span + span {
  margin-left: 1rem;
}

/* ノート */
.notes {
  font-style: italic;
  margin-bottom: 1rem;
}

/* セッションタイトル */
.session {
  margin-bottom: 1.5rem;
}
.session-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

/* テーブルのラッパーで横スクロール許可 */
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background: #f4f4f4;
  font-weight: 600;
}
.comment {
  text-align: left;
  white-space: pre-wrap;
}

/* モバイル時の文字サイズ調整 */
@media (max-width: 600px) {
  th,
  td {
    padding: 6px;
    font-size: 0.85rem;
  }
  .session-title {
    font-size: 1rem;
  }
}
</style>
