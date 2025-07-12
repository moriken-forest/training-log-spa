<template>
  <section>
    <Calendar :available-dates="dates" @select-date="fetchLog" />
    <LogDetail :log="selectedLog" />
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
      fetch('/index.json')
        .then(r => r.json())
        .then(d => { this.dates = d })
  },
  methods: {
    fetchLog(date) {
      fetch(`/${date}.json`)
        .then(r => r.json())
        .then(j => this.selectedLog = j)
    }
  }
}
</script>