<template>
  <div class="log-detail schedule-detail" v-if="plan">
    <div v-for="(session, idx) in plan.sessions" :key="idx" class="session">
      <h3 class="session-title">
        <span class="session-name">{{ session.lift }}</span>
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
import { parseCategory } from '../utils/category'
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
      const { base, variant } = parseCategory(cat)
      const query = {}
      if (variant) query.variant = variant
      this.$router.push({ path: `/category/${encodeURIComponent(base)}`, query })
    }
  }
}
</script>
