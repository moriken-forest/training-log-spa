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

export default {
  components: { Calendar, LogDetail },
  data() {
    return { dates: [], selectedLog: null }
  },
    created() {
      const base = import.meta.env.BASE_URL
      fetch(`${base}logs/index.json`)
        .then(r => r.json())
        .then(d => { this.dates = d })
  },
  methods: {
    fetchLog(date) {
      const base = import.meta.env.BASE_URL
      fetch(`${base}logs/${date}.json`)
        .then(r => r.json())
        .then(j => this.selectedLog = j)
    }
  }
}
</script>