<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <input type="range" v-model.number="pageSize" min="10" max="100" step="10" />
        <span>{{ pageSize }}</span> 件
      </label>
      <div class="segmented-control category-tabs">
        <button
          v-for="b in bases"
          :key="b"
          :class="{ active: baseModel === b }"
          @click="baseModel = b"
        >{{ b }}</button>
      </div>
      <div v-if="variants.length" class="segmented-control variant-tabs">
        <button
          :class="{ active: variantModel === '' }"
          @click="variantModel = ''"
        >すべて</button>
        <button
          v-for="v in variants"
          :key="v"
          :class="{ active: variantModel === v }"
          @click="variantModel = v"
        >{{ categoryLabel(v) }}</button>
      </div>
    </div>
    <LogList :logs="filteredLogs" :page-size="pageSize" />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'
import { getStoredDates, getStoredLog } from '../utils/logStorage'
import { parseCategory, sortBases, sortVariants } from '../utils/category'

export default {
  components: { LogList },
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
        this.$router.replace({ path: `/category/${encodeURIComponent(v)}`, query: this.$route.query })
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
      const set = new Set()
      for (const log of this.logs) {
        for (const s of log.sessions || []) {
          const { base } = parseCategory(s.type || '')
          if (base) set.add(base)
        }
      }
      return sortBases(Array.from(set))
    },
    variants() {
      const set = new Set()
      for (const log of this.logs) {
        for (const s of log.sessions || []) {
          const { base, variant } = parseCategory(s.type || '')
          if (base === this.baseModel && variant) set.add(variant)
        }
      }
      return sortVariants(Array.from(set))
    },
    filteredLogs() {
      const variant = this.variantModel
      const base = this.baseModel
      const out = []
      for (const log of this.logs) {
        const sessions = []
        for (const session of log.sessions || []) {
          const pc = parseCategory(session.type || '')
          if (pc.base !== base) continue
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
      if (!this.variants.includes(this.variantModel)) {
        const q = { ...this.$route.query }
        delete q.variant
        this.$router.replace({ query: q })
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



