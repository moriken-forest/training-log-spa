<template>
  <div id="listContainer">
    <div
      v-for="s in pagedSessions"
      :key="s.id"
      class="log-card"
      :class="{ open: expanded || openIds.includes(s.id) }"
    >
      <div class="summary" :class="{ clickable: !expanded }" @click="expanded || toggle(s.id)">
        <span class="date">{{ s.date }}</span>
        <span class="note">
          {{ s.session.lift }}<span v-if="s.session.variation"> ({{ s.session.variation }})</span>
        </span>
      </div>
      <div class="details">
        <div class="meta" v-if="s.block != null || (s.week != null && s.day != null)">
          <span v-if="s.block != null">ブロック: {{ s.block }}</span>
          <span v-if="s.week != null && s.day != null">Week{{ s.week }}-{{ s.day }}</span>
        </div>
        <div class="session">
          <h2>
            {{ s.session.lift }}
            <span v-if="s.session.variation"> ({{ s.session.variation }})</span>
            <span
              v-if="s.session.type"
              class="type-tag"
              @click.stop="goCategory(s.session.type)"
            >{{ s.session.type }}</span>
          </h2>
          <div class="table-wrapper">
            <table>
              <tr>
                <th>重量(kg)</th><th>回数</th><th>RPE</th>
                <th v-if="!isAccessoryType(s.session.type)">1RM</th>
                <th v-if="!isAccessoryType(s.session.type)">e1RM</th>
                <th>コメント</th>
              </tr>
              <tr v-for="(set, i) in s.session.sets" :key="i">
                <td>{{ set.weight }}</td>
                <td>{{ set.reps }}</td>
                <td>{{ set.rpe }}</td>
                <td v-if="!isAccessoryType(s.session.type)">{{ set['1RM'] ?? '-' }}</td>
                <td v-if="!isAccessoryType(s.session.type)">{{ set.e1RM ?? '-' }}</td>
                <td class="comment">{{ set.comment }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="copy-btn" @click.stop="copySession(s)">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>

    <div id="pagination">
      <button @click="prevPage" :disabled="currentPage===1">前へ</button>
      <span> {{ currentPage }} / {{ totalPages }} ページ ({{ sessions.length }} 件中 {{ rangeStart }}-{{ rangeEnd }})</span>
      <button @click="nextPage" :disabled="currentPage===totalPages">次へ</button>
    </div>
  </div>
</template>

<script>
import { parseCategory, isAccessoryType } from '../utils/category'
export default {
  name: 'SessionList',
  props: {
    sessions: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 10
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      openIds: []
    }
  },
  watch: {
    expanded(val) {
      if (val) this.openIds = []
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.sessions.length / this.pageSize) || 1
    },
    pagedSessions() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.sessions.slice(start, start + this.pageSize)
    },
    rangeStart() {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    rangeEnd() {
      return Math.min(this.currentPage * this.pageSize, this.sessions.length)
    }
  },
  methods: {
    toggle(id) {
      const i = this.openIds.indexOf(id)
      if (i >= 0) this.openIds.splice(i, 1)
      else this.openIds.push(id)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.openIds = []
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.openIds = []
      }
    },
    copySession(s) {
      const text = JSON.stringify(s, null, 2)
      navigator.clipboard.writeText(text)
      alert('JSONをコピーしました')
    },
    goCategory(cat) {
      const { base, variant } = parseCategory(cat)
      const query = {}
      if (variant) query.variant = variant
      this.$router.push({ path: `/list/${encodeURIComponent(base)}`, query })
    },
    isAccessoryType
  }
}
</script>
