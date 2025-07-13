<template>
  <div id="listContainer" :class="{ 'flat-grid': expanded }">
    <div
      v-for="plan in displayPlans"
      :key="plan.date"
      class="log-card"
      :class="{ open: expanded || openDates.includes(plan.date) }"
    >
      <div class="summary" :class="{ clickable: !expanded }" @click="expanded || toggle(plan.date)">
        <span class="date">{{ plan.date }}</span>
        <span class="note">{{ plan.block }} Week{{ plan.week }} Day{{ plan.day }}</span>
      </div>
      <div class="details">
        <ScheduleDetail :plan="plan" />
      </div>
    </div>

    <div id="pagination" v-if="!expanded">
      <button @click="prevPage" :disabled="currentPage===1">前へ</button>
      <span>{{ currentPage }} / {{ totalPages }} ページ ({{ plans.length }} 件中 {{ rangeStart }}-{{ rangeEnd }})</span>
      <button @click="nextPage" :disabled="currentPage===totalPages">次へ</button>
    </div>
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
    expanded: {
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
  watch: {
    expanded(val) {
      if (val) this.openDates = []
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.plans.length / this.pageSize) || 1
    },
    displayPlans() {
      if (this.expanded) return this.plans
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
      if (this.currentPage > 1) {
        this.currentPage--
        this.openDates = []
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.openDates = []
      }
    }
  }
}
</script>
