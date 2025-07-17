<template>
  <div>
    <div id="controls">
      <label class="page-size">
        <span class="material-icons">format_list_numbered</span>
        <input
          type="range"
          v-model.number="pageSize"
          min="10"
          max="100"
          step="10"
        />
        <span class="current">{{ pageSize }}</span>
      </label>
      <div class="segmented-pill">
        <div class="slider" :style="viewSliderStyle"></div>
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
      <div class="segmented-control category-tabs" v-if="view === 'logs'">
        <button
          v-for="opt in bases"
          :key="opt.value || 'all'"
          :class="{ active: baseModel === opt.value, all: opt.value === '' }"
          @click="baseModel = opt.value"
        >{{ opt.label }}</button>
      </div>
      <div class="segmented-pill variant-tabs" v-if="view === 'logs' && showVariant">
        <div class="slider" :style="variantSliderStyle"></div>
        <button
          :class="{ active: variantModel === '' }"
          @click="variantModel = ''"
        >全て</button>
        <button
          :class="{ active: variantModel === 'メイン' }"
          @click="variantModel = 'メイン'"
        >メイン</button>
        <button
          :class="{ active: variantModel === 'サブ' }"
          @click="variantModel = 'サブ'"
        >サブ</button>
      </div>
    </div>
    
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
import { parseCategory } from '../utils/category'
import { addScheduleCalcFields } from '../utils/schedule'
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
    baseModel: {
      get() { return this.$route.params.base || '' },
      set(v) {
        const path = v ? `/list/${encodeURIComponent(v)}` : '/list'
        this.$router.replace({ path, query: this.$route.query })
      }
    },
    variantModel: {
      get() { return this.$route.query.variant || '' },
      set(v) {
        const q = { ...this.$route.query }
        if (v) q.variant = v
        else delete q.variant
        this.$router.replace({ query: q })
      }
    },
    bases() {
      return [
        { value: '', label: 'All' },
        { value: 'スクワット', label: 'Squat' },
        { value: 'ベンチプレス', label: 'Bench' },
        { value: 'デッドリフト', label: 'Dead' },
        { value: 'アクセサリー種目', label: 'Accessory' }
      ]
    },
    showVariant() {
      return this.baseModel &&
        !['アクセサリー種目', 'アクセサリー'].includes(this.baseModel)
    },
    variants() {
      return ['メイン', 'サブ']
    },
    viewSliderStyle() {
      const idx = this.view === 'logs' ? 0 : 1
      return { transform: `translateX(${idx * 100}%)` }
    },
    variantSliderStyle() {
      const opts = ['', 'メイン', 'サブ']
      const idx = opts.indexOf(this.variantModel)
      const w = 100 / opts.length
      return { width: `${w}%`, transform: `translateX(${idx * w}%)` }
    },
    filteredLogs() {
      const variant = this.variantModel
      const base = this.baseModel
      const out = []
      for (const log of this.logs) {
        const sessions = []
        for (const session of log.sessions || []) {
          const pc = parseCategory(session.type || '')
          if (base && pc.base !== base) continue
          if (variant && pc.variant !== variant) continue
          sessions.push(session)
        }
        if (sessions.length) {
          out.push({
            ...log,
            sessions
          })
        }
      }
      out.sort((a, b) => b.date.localeCompare(a.date))
      return out
    }
  },
  watch: {
    baseModel() {
      const q = { ...this.$route.query }
      if (!this.showVariant || !this.variants.includes(this.variantModel)) {
        delete q.variant
        this.$router.replace({ query: q })
      }
    }
  },
  created() {
    const base = import.meta.env.BASE_URL
    const indexReq = fetch(`${base}logs/${user}/index.json`)
      .then(r => (r.ok ? r.json() : []))
      .catch(() => [])
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
        addScheduleCalcFields(sched)
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

