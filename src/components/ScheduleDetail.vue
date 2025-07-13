<template>
  <div class="log-detail schedule-detail" v-if="plan">
    <div class="log-title">
      <h2>{{ plan.date }}</h2>
      <div class="meta">
        <span v-if="plan.block">ブロック: {{ plan.block }}</span>
        <span v-if="plan.week && plan.day">Week{{ plan.week }}-{{ plan.day }}</span>
      </div>
    </div>
    <div v-for="(session, idx) in plan.sessions" :key="idx" class="session">
      <h3 class="session-title">
        {{ session.lift }}
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
              <th>セット</th>
              <th>%1RM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(set, si) in session.sets" :key="si">
              <td>{{ set.weight }}</td>
              <td>{{ set.reps }}</td>
              <td>{{ set.sets }}</td>
              <td>{{ set.percent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleDetail',
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  methods: {
    goCategory(cat) {
      this.$router.push({ path: '/list', query: { category: cat } })
    }
  }
}
</script>
