<!-- src/components/LogDetail.vue -->
<template>
  <div class="log-detail" v-if="log">
      <div class="log-title">
        <h2>{{ log.date }}</h2>
        <div class="meta">
          <span v-if="log.block != null">ブロック: {{ log.block }}</span>
          <span v-if="log.week != null && log.day != null">Week{{ log.week }}-{{ log.day }}</span>
        </div>
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
        <span
          v-if="session.type"
          class="type-tag"
          @click.stop="goCategory(session.type)"
        >{{ session.type }}</span>
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
  emits: ['delete-log'],
  props: {
    log: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmDelete() {
      if (confirm('本当に削除しますか？')) {
        this.$emit('delete-log', this.log.date)
      }
    },
    goCategory(cat) {
      this.$router.push({ path: '/list', query: { category: cat } })
    }
  }
}
</script>
