<template>
  <section id="calendar-section">
    <Calendar
      :log-dates="logDates"
      :schedule-dates="scheduleDates"
      :selected-date="selectedDate"
      @select-date="selectEntry"
    />
    <section id="logContainer">
      <p v-if="!selectedLog && !selectedPlan">カレンダーの日付をクリックして、詳細を表示してください。</p>
      <LogDetail v-if="selectedLog" :log="selectedLog" :all-logs="logs" @delete-log="handleDelete" />
      <ScheduleDetail v-else-if="selectedPlan" :plan="selectedPlan" :all-logs="logs" show-meta />
    </section>
  </section>
</template>

<script>
import Calendar from '../components/Calendar.vue'
import LogDetail from '../components/LogDetail.vue'
import ScheduleDetail from '../components/ScheduleDetail.vue'
import { getStoredDates, getStoredLog, deleteLog } from '../utils/logStorage'
import { addScheduleCalcFields } from '../utils/schedule'
import { getUser } from '../utils/user'

const user = getUser()

export default {
  components: { Calendar, LogDetail, ScheduleDetail },
  data() {
    return {
      logDates: [],
      scheduleDates: [],
      logs: [],
      scheduleMap: {},
      selectedLog: null,
      selectedPlan: null,
      selectedDate: null
    }
  },
  watch: {
    '$route.query.date'(v) {
      if (!v) {
        this.selectedDate = null
        this.selectedLog = null
        this.selectedPlan = null
      } else if (v !== this.selectedDate) {
        this.selectEntry(v)
      }
    }
  },
  created() {
    const base = import.meta.env.BASE_URL
    const indexReq = fetch(`${base}logs/${user}/index.json`)
      .then(r => (r.ok ? r.json() : []))
      .catch(() => [])
    const schedReq = fetch(`${base}schedule/${user}/training-schedule.json`).then(r => r.json())

    indexReq
      .then(d => {
        const extra = getStoredDates()
        this.logDates = Array.from(new Set([...d, ...extra])).sort()
        return Promise.all(this.logDates.map(dt => {
          const stored = getStoredLog(dt)
          if (stored) return Promise.resolve(stored)
          return fetch(`${base}logs/${user}/${dt}.json`).then(r => r.json())
        }))
      })
      .then(arr => {
        this.logs = arr
        return schedReq
      })
      .then(sched => {
        this.processSchedule(sched)
      })
      .then(() => {
        const q = this.$route.query.date
        if (q) {
          this.selectedDate = q
          this.selectEntry(q)
        }
      })
  },
  methods: {
    processSchedule(sched) {
      addScheduleCalcFields(sched)
      const plans = []
      for (const block of sched.blocks || []) {
        for (const week of block.weeks || []) {
          for (const day of week.days || []) {
            plans.push({
              date: day.date,
              block: block.block,
              week: week.week,
              day: Number(String(day.day).replace('Day','')),
              sessions: day.sessions
            })
          }
        }
      }
      const within30 = (a,b) => Math.abs(new Date(a) - new Date(b)) <= 30*86400000
      const filtered = plans.filter(p => !this.logs.some(l => l.block === p.block && l.week == p.week && l.day == p.day && within30(l.date, p.date)))
      this.scheduleMap = {}
      this.scheduleDates = filtered.map(p => {
        this.scheduleMap[p.date] = p
        return p.date
      })
    },
    selectEntry(date) {
      this.selectedDate = date
      this.$router.replace({ query: { ...this.$route.query, date } })
      this.selectedPlan = null
      this.selectedLog = null
      if (this.logDates.includes(date)) {
        const stored = getStoredLog(date)
        if (stored) {
          this.selectedLog = stored
          return
        }
        const base = import.meta.env.BASE_URL
        fetch(`${base}logs/${user}/${date}.json`)
          .then(r => r.json())
          .then(j => this.selectedLog = j)
      } else if (this.scheduleMap[date]) {
        this.selectedPlan = this.scheduleMap[date]
      }
    },
    handleDelete(date) {
      deleteLog(date)
      this.logDates = this.logDates.filter(d => d !== date)
      if (this.selectedLog && this.selectedLog.date === date) {
        this.selectedLog = null
      }
    }
  }
}
</script>
