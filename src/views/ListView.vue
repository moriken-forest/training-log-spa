<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <input
          type="range"
          v-model.number="pageSize"
          min="10"
          max="100"
          step="10"
        />
        <span>{{ pageSize }}</span> 件
      </label>
      <div class="segmented-control">
        <button :class="{ active: view === 'logs' }" @click="view = 'logs'">ログ</button>
        <button :class="{ active: view === 'schedule' }" @click="view = 'schedule'">スケジュール</button>
      </div>
      <div class="toggle-wrapper" v-if="view === 'schedule'">
        <span :class="{ active: flatView }">一覧</span>
        <label class="toggle-switch">
          <input type="checkbox" v-model="flatView" />
          <span class="toggle-slider"></span>
        </label>
        <a :href="scheduleUrl" download class="icon-button">
          <span class="material-icons">download</span>
        </a>
        <button class="copy-btn icon-button" @click="copySchedule">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
      <label v-if="view === 'logs'" class="category-select">
        カテゴリー:
        <select v-model="categoryModel">
          <option value="">すべて</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
    </div>
    <p v-if="view === 'logs' && $route.query.category" class="filter-info">
      カテゴリー: {{ $route.query.category }}
    </p>
    <LogList
      v-if="view === 'logs'"
      :logs="filteredLogs"
      :page-size="pageSize"
      @delete-log="deleteLogEntry"
    />
    <ScheduleList
      v-if="view === 'schedule'"
      :plans="plans"
      :page-size="pageSize"
      :flat="flatView"
    />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'
import ScheduleList from '../components/ScheduleList.vue'
import { getStoredDates, getStoredLog, deleteLog } from '../utils/logStorage'
import { sortCategories } from '../utils/category'
import { getUser } from '../utils/user'

const user = getUser()

export default {
  components: { LogList, ScheduleList },
  data() {
    return {
      logs: [],
      plans: [],
      pageSize: 10,
      view: 'logs',
      flatView: false,
      scheduleData: null,
      scheduleUrl: import.meta.env.BASE_URL + `schedule/${user}/training-schedule.json`
    }
  },
  computed: {
    categoryModel: {
      get() { return this.$route.query.category || '' },
      set(v) {
        const q = { ...this.$route.query }
        if (v) q.category = v
        else delete q.category
        this.$router.replace({ query: q })
      }
    },
    categories() {
      const set = new Set()
      for (const log of this.logs) {
        for (const s of log.sessions || []) {
          if (s.type) set.add(s.type)
        }
      }
      return sortCategories(Array.from(set))
    },
    filteredLogs() {
      const category = this.categoryModel
      if (!category) return this.logs
      return this.logs.filter(l =>
        l.sessions.some(s => s.type === category)
      )
    }
  },
  watch: {
    '$route.query.category'(val) {
      if (val) this.view = 'logs'
    }
  },
  created() {
    const base = import.meta.env.BASE_URL
    const indexReq = fetch(`${base}logs/${user}/index.json`).then(r => r.json())
    const schedReq = fetch(this.scheduleUrl).then(r => r.json())

    indexReq
      .then(dates => {
        const extra = getStoredDates()
        const allDates = Array.from(new Set([...dates, ...extra])).sort()
        return Promise.all(allDates.map(d => {
          const stored = getStoredLog(d)
          if (stored) return Promise.resolve(stored)
          return fetch(`${base}logs/${user}/${d}.json`).then(r => r.json())
        }))
      })
      .then(arr => {
        // sort logs in descending order so the newest appears first
        arr.sort((a, b) => b.date.localeCompare(a.date))
        this.logs = arr
        return schedReq
      })
      .then(sched => {
        this.scheduleData = sched
        this.processSchedule(sched)
      })
  },
  methods: {
    deleteLogEntry(date) {
      deleteLog(date)
      this.logs = this.logs.filter(l => l.date !== date)
    },
    processSchedule(sched) {
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
      this.plans = plans.filter(p => !this.logs.some(l => l.block === p.block && l.week == p.week && l.day == p.day && within30(l.date, p.date)))
      this.plans.sort((a,b) => a.date.localeCompare(b.date))
    },
    copySchedule() {
      if (!this.scheduleData) return
      const text = JSON.stringify(this.scheduleData, null, 2)
      navigator.clipboard.writeText(text)
      alert('JSONをコピーしました')
    }
  }
}
</script>

