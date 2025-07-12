<!-- src/components/LogDetail.vue -->
<template>
  <div class="log-detail" v-if="log">
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
        <span v-if="session.type" class="type-tag">{{ session.type }}</span>
      </h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>重量(kg)</th>
              <th>回数</th>
              <th>RPE</th>
              <th>1RM</th>
              <th>e1RM</th>
              <th>コメント</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(set, si) in session.sets" :key="si">
              <td>{{ set.weight }}</td>
              <td>{{ set.reps }}</td>
              <td>{{ set.rpe }}</td>
              <td>{{ set['1RM'] ?? '-' }}</td>
              <td>{{ set.e1RM ?? '-' }}</td>
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
