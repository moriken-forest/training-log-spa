<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <input type="range" v-model.number="pageSize" min="10" max="100" step="10" />
        <span>{{ pageSize }}</span> 件
      </label>
      <div class="segmented-control category-tabs">
        <button
          v-for="opt in bases"
          :key="opt.value || 'all'"
          :class="{ active: baseModel === opt.value }"
          @click="baseModel = opt.value"
        >{{ opt.label }}</button>
      </div>
      <div class="segmented-control variant-tabs" v-if="showVariant">
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
    <LogList :logs="filteredLogs" :page-size="pageSize" />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'
import { getStoredDates, getStoredLog } from '../utils/logStorage'
import { parseCategory } from '../utils/category'
import { getUser } from '../utils/user'

const user = getUser()

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
      get() { return this.$route.params.base || '' },
      set(v) {
        const path = v ? `/category/${encodeURIComponent(v)}` : '/category'
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
  methods: {
    categoryLabel(v) {
      return v ? `${this.baseModel}（${v}）` : this.baseModel
    }
  },
  created() {
    const base = import.meta.env.BASE_URL
    fetch(`${base}logs/${user}/index.json`).then(r => r.json())
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
        arr.sort((a, b) => b.date.localeCompare(a.date))
        this.logs = arr
      })
  }
}
</script>



