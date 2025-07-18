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
            <td>
              <ul class="flat-session-list">
                <li
                  v-for="(session, i) in plan.sessions"
                  :key="i"
                  class="flat-session"
                >
                  <strong class="lift-link" @click.stop="showHistory(session.lift)">{{ session.lift }}</strong>
                  <span class="set-detail">
                    <template v-for="(set, si) in session.sets" :key="si">
                      <span>{{ formatSet(set) }}</span>
                      <span v-if="si < session.sets.length - 1">, </span>
                    </template>
                  </span>
                </li>
              </ul>
              <div class="flat-tags" v-if="planTags(plan).length">
                <span
                  class="type-tag"
                  v-for="t in planTags(plan)"
                  :key="t"
                  @click.stop="goCategory(t)"
                >{{ t }}</span>
              </div>
            </td>
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
          <div class="top-line">
            <span class="date">{{ plan.date }}</span>
            <span class="meta" v-if="plan.block || (plan.week && plan.day)">
              {{ summaryMeta(plan) }}
            </span>
          </div>
          <span class="note">{{ summaryLifts(plan).join('\n') }}</span>
        </div>
        <div class="details">
          <ScheduleDetail :plan="plan" :all-logs="allLogs" />
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
import { parseCategory, sortCategories } from '../utils/category'
import { showLiftModal } from '../utils/liftModal'

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
    },
    allLogs: {
      type: Array,
      default: () => []
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
    formatSet(set) {
      const parts = []
      if (set.weight != null) parts.push(`${set.weight}kg`)
      if (set.reps != null) parts.push(`${set.reps}rep`)
      if (set.sets != null) parts.push(`${set.sets}set`)
      return parts.join('×')
    },
    summaryLifts(plan) {
      const lifts = (plan.sessions || []).map(s => s.lift)
      return lifts
    },
    summaryMeta(plan) {
      const parts = []
      if (plan.block) parts.push(plan.block)
      if (plan.week != null && plan.day != null) parts.push(`Week${plan.week}-${plan.day}`)
      return parts.join(' ')
    },
    planTags(plan) {
      const tags = plan.sessions
        .map(s => s.type)
        .filter(t => t)
      return sortCategories(Array.from(new Set(tags)))
    },
    goCategory(cat) {
      const { base, variant } = parseCategory(cat)
      const query = {}
      if (variant) query.variant = variant
      this.$router.push({ path: `/list/${encodeURIComponent(base)}`, query })
    },
    showHistory(lift) {
      showLiftModal(lift, this.allLogs)
    }
  }
}
</script>
