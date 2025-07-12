<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <select v-model.number="pageSize">
          <option v-for="n in [10,50,100]" :key="n" :value="n">{{ n }}</option>
        </select> 件
      </label>
    </div>
    <LogList :logs="logs" :page-size="pageSize" @delete-log="deleteLogEntry" />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'
import { getStoredDates, getStoredLog, deleteLog } from '../utils/logStorage'

export default {
  components: { LogList },
  data() {
    return { logs: [], pageSize: 10 }
  },
  created() {
      const base = import.meta.env.BASE_URL
      fetch(`${base}logs/index.json`)
        .then(r => r.json())
        .then(dates => {
          const extra = getStoredDates()
          const allDates = Array.from(new Set([...dates, ...extra])).sort()
          return Promise.all(allDates.map(d => {
            const stored = getStoredLog(d)
            if (stored) return Promise.resolve(stored)
            return fetch(`${base}logs/${d}.json`).then(r => r.json())
          }))
        })
        .then(arr => {
          arr.sort((a, b) => a.date.localeCompare(b.date))
          this.logs = arr
        })
  },
  methods: {
    deleteLogEntry(date) {
      deleteLog(date)
      this.logs = this.logs.filter(l => l.date !== date)
    }
  }
}
</script>

