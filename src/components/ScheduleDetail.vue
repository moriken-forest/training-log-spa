<template>
  <div class="log-detail schedule-detail" v-if="plan">
    <div v-if="showMeta" class="log-title">
      <h2>{{ plan.date }}</h2>
      <div class="meta" v-if="plan.block || (plan.week && plan.day)">
        <span v-if="plan.block != null">ブロック: {{ plan.block }}</span>
        <span v-if="plan.week != null && plan.day != null">Week{{ plan.week }}-{{ plan.day }}</span>
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
<th v-if="!isAccessoryType(session.type)">1RM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(set, si) in session.sets" :key="si">
              <td>{{ set.weight }}</td>
              <td>{{ set.reps }}</td>
              <td>{{ set.sets }}</td>
              <td>{{ set.percent }}</td>
              <td v-if="!isAccessoryType(session.type)">{{ set['1RM'] ?? '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { parseCategory, isAccessoryType } from '../utils/category'
export default {
  name: 'ScheduleDetail',
  props: {
    plan: {
      type: Object,
      required: true
    },
    showMeta: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goCategory(cat) {
      const { base, variant } = parseCategory(cat)
      const query = {}
      if (variant) query.variant = variant
      this.$router.push({ path: `/category/${encodeURIComponent(base)}`, query })
    },
    isAccessoryType
  }
}
</script>
