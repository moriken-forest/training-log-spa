<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <input type="range" v-model.number="pageSize" min="10" max="100" step="10" />
        <span>{{ pageSize }}</span> 件
      </label>
      <label v-if="bases.length" class="category-select modern-select">
        種目:
        <select v-model="baseModel">
          <option v-for="b in bases" :key="b" :value="b">{{ b }}</option>
        </select>
      </label>
      <label v-if="variants.length" class="category-select modern-select">
        種別:
        <select v-model="variantModel">
          <option value="">すべて</option>
          <option v-for="v in variants" :key="v" :value="v">{{ categoryLabel(v) }}</option>
        </select>
      </label>
    </div>
    <SessionList :sessions="filteredSessions" :page-size="pageSize" />
  </div>
</template>

<script>
import SessionList from '../components/SessionList.vue'
import { getStoredDates, getStoredLog } from '../utils/logStorage'
import { parseCategory } from '../utils/category'

export default {
  components: { SessionList },
  data() {
    return {
      logs: [],
      pageSize: 10
    }
  },
  computed: {
    baseModel: {
      get() { return this.$route.params.base },
      set(v) {
        this.$router.push({ path: `/category/${encodeURIComponent(v)}`, query: { ...this.$route.query } })
      }
    },
    bases() {
      const set = new Set()
      for (const log of this.logs) {
        for (const s of log.sessions || []) {
          const { base } = parseCategory(s.type || '')
          set.add(base)
        }
      }
      return Array.from(set)
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
          if (base === this.baseModel && variant) set.add(variant)
        }
      }
      return Array.from(set)
    },
    filteredSessions() {
      const variant = this.variantModel
      const base = this.baseModel
      const groups = {}
      for (const log of this.logs) {
        for (const session of log.sessions || []) {
          const pc = parseCategory(session.type || '')
          if (pc.base !== base) continue
          if (variant && pc.variant !== variant) continue
          const key = `${log.date}:${session.type || ''}`
          if (!groups[key]) {
            groups[key] = {
              id: key,
              date: log.date,
              notes: log.notes,
              block: log.block,
              week: log.week,
              day: log.day,
              session: {
                ...session,
                sets: []
              }
            }
          }
          groups[key].session.sets.push(...(session.sets || []))
        }
      }
      const out = Object.values(groups)
      out.sort((a, b) => b.date.localeCompare(a.date))
      return out
    }
  },
  watch: {
    baseModel() {
      if (!this.variants.includes(this.variantModel)) {
        this.variantModel = ''
      }
    }
  },
  methods: {
    categoryLabel(v) {
      return v ? `${this.baseModel}（${v}）` : this.baseModel
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



