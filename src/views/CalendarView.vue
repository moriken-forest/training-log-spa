<template>
  <section id="calendar-section">
    <Calendar :available-dates="dates" @select-date="fetchLog" />
    <section id="logContainer">
      <p v-if="!selectedLog">カレンダーの日付をクリックして、詳細を表示してください。</p>
      <LogDetail v-else :log="selectedLog" />
    </section>
  </section>
</template>

<script>
import Calendar from '../components/Calendar.vue'
import LogDetail from '../components/LogDetail.vue'
import { getStoredDates, getStoredLog } from '../utils/logStorage'

export default {
  components: { Calendar, LogDetail },
  data() {
    return { dates: [], selectedLog: null }
  },
    created() {
      const base = import.meta.env.BASE_URL
      fetch(`${base}logs/index.json`)
        .then(r => r.json())
        .then(d => {
          const extra = getStoredDates()
          this.dates = Array.from(new Set([...d, ...extra])).sort()
        })
  },
  methods: {
    fetchLog(date) {
      const base = import.meta.env.BASE_URL
      const stored = getStoredLog(date)
      if (stored) {
        this.selectedLog = stored
        return
      }
      fetch(`${base}logs/${date}.json`)
        .then(r => r.json())
        .then(j => this.selectedLog = j)
    }
  }
}
</script>
