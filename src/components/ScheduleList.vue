<template>
  <div id="listContainer">
    <template v-if="flat">
      <table class="flat-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in pagedPlans" :key="plan.date">
            <td>{{ plan.date }}</td>
            <td><pre class="flat-md">{{ planMarkdown(plan) }}</pre></td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <div
        v-for="plan in pagedPlans"
        :key="plan.date"
        class="log-card"
        :class="{ open: openDates.includes(plan.date) }"
      >
        <div class="summary" @click="toggle(plan.date)">
          <span class="date">{{ plan.date }}</span>
          <span class="note">{{ plan.block }} Week{{ plan.week }} Day{{ plan.day }}</span>
        </div>
        <div class="details">
          <ScheduleDetail :plan="plan" />
        </div>
      </div>

      <div id="pagination">
        <button @click="prevPage" :disabled="currentPage===1">前へ</button>
        <span>{{ currentPage }} / {{ totalPages }} ページ ({{ plans.length }} 件中 {{ rangeStart }}-{{ rangeEnd }})</span>
        <button @click="nextPage" :disabled="currentPage===totalPages">次へ</button>
      </div>
    </template>
  </div>
</template>

<script>
import ScheduleDetail from './ScheduleDetail.vue'

export default {
  name: 'ScheduleList',
  components: { ScheduleDetail },
  props: {
    plans: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 10
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      openDates: []
    }
  },
  computed: {
    totalPages() {
      if (this.flat) return 1
      return Math.ceil(this.plans.length / this.pageSize) || 1
    },
    pagedPlans() {
      if (this.flat) return this.plans
      const start = (this.currentPage - 1) * this.pageSize
      return this.plans.slice(start, start + this.pageSize)
    },
    rangeStart() {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    rangeEnd() {
      return Math.min(this.currentPage * this.pageSize, this.plans.length)
    }
  },
  methods: {
    toggle(date) {
      const i = this.openDates.indexOf(date)
      if (i >= 0) this.openDates.splice(i, 1)
      else this.openDates.push(date)
    },
    prevPage() {
      if (this.flat) return
      if (this.currentPage > 1) {
        this.currentPage--
        this.openDates = []
      }
    },
    nextPage() {
      if (this.flat) return
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.openDates = []
      }
    },
    planMarkdown(plan) {
      const lines = [`${plan.block} Week${plan.week} Day${plan.day}`]
      for (const session of plan.sessions) {
        let line = `- ${session.lift}`
        if (session.type) line += ` [${session.type}]`
        const sets = session.sets
          .map(s => `${s.weight}x${s.reps}x${s.sets}@${s.percent}`)
          .join(', ')
        if (sets) line += ` ${sets}`
        lines.push(line)
      }
      return lines.join('\n')
    }
  }
}
</script>
