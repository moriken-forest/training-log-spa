<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <input type="range" v-model.number="pageSize" min="10" max="100" step="10" />
        <span>{{ pageSize }}</span> 件
      </label>
      <label v-if="variants.length" class="category-select">
        種別:
        <select v-model="variantModel">
          <option value="">すべて</option>
          <option v-for="v in variants" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>
    </div>
    <LogList :logs="filteredLogs" :page-size="pageSize" />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'
import { getStoredDates, getStoredLog } from '../utils/logStorage'
import { parseCategory } from '../utils/category'

export default {
  components: { LogList },
  data() {
    return {
      logs: [],
      pageSize: 10
    }
  },
  computed: {
    base() {
      return this.$route.params.base
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
    variants() {
      const set = new Set()
      for (const log of this.logs) {
        for (const s of log.sessions || []) {
          const { base, variant } = parseCategory(s.type || '')
          if (base === this.base && variant) set.add(variant)
        }
      }
      return Array.from(set)
    },
    filteredLogs() {
      const variant = this.variantModel
      const base = this.base
      const out = []
      for (const log of this.logs) {
        const sessions = (log.sessions || []).filter(s => {
          const pc = parseCategory(s.type || '')
          if (pc.base !== base) return false
          if (variant && pc.variant !== variant) return false
          return true
        })
        if (sessions.length) {
          out.push({ ...log, sessions })
        }
      }
      return out
    }
  },
  created() {
    const base = import.meta.env.BASE_URL
    fetch(`${base}logs/index.json`).then(r => r.json())
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
        arr.sort((a, b) => b.date.localeCompare(a.date))
        this.logs = arr
      })
  }
}
</script>



