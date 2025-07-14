<template>
  <div id="listContainer">
    <!-- ログカードリスト -->
    <div
      v-for="log in pagedLogs"
      :key="log.date"
      class="log-card"
      :class="{ open: expanded || openDates.includes(log.date) }"
    >
      <div class="summary" :class="{ clickable: !expanded }" @click="expanded || toggle(log.date)">
        <div class="top-line">
          <span class="date">{{ log.date }}</span>
          <span class="meta" v-if="log.block || (log.week && log.day)">
            {{ summaryMeta(log) }}
          </span>
        </div>
        <span class="note">{{ summaryLifts(log).join('\n') }}</span>
      </div>
      <div class="details">
        <div v-for="session in log.sessions" :key="session.lift" class="session">
          <h2>
            {{ session.lift }}
            <span v-if="session.variation"> ({{ session.variation }})</span>
            <span
              v-if="session.type"
              class="type-tag"
              @click.stop="goCategory(session.type)"
            >{{ session.type }}</span>
          </h2>
          <div class="table-wrapper">
            <table>
              <tr>
                <th>重量(kg)</th><th>回数</th><th>RPE</th>
                <th>1RM</th><th>e1RM</th><th>コメント</th>
              </tr>
              <tr v-for="(s, i) in session.sets" :key="i">
                <td>{{ s.weight }}</td>
                <td>{{ s.reps }}</td>
                <td>{{ s.rpe }}</td>
                <td>{{ s['1RM'] ?? '-' }}</td>
                <td>{{ s.e1RM ?? '-' }}</td>
                <td class="comment">{{ s.comment }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="copy-btn" @click.stop="copyLog(log)">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>

    <!-- ページネーション -->
    <div id="pagination">
      <button @click="prevPage" :disabled="currentPage===1">前へ</button>
      <span> {{ currentPage }} / {{ totalPages }} ページ ({{ logs.length }} 件中 {{ rangeStart }}-{{ rangeEnd }})</span>
      <button @click="nextPage" :disabled="currentPage===totalPages">次へ</button>
    </div>
  </div>
</template>

<script>
import { parseCategory } from '../utils/category'
export default {
  name: 'LogList',
  emits: ['delete-log'],
  props: {
    logs: {
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
      openDates: []
    };
  },
  watch: {
    expanded(val) {
      if (val) this.openDates = [];
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.logs.length / this.pageSize) || 1;
    },
    pagedLogs() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.logs.slice(start, start + this.pageSize);
    },
    rangeStart() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    rangeEnd() {
      return Math.min(this.currentPage * this.pageSize, this.logs.length);
    }
  },
  methods: {
    summaryLifts(log) {
      const lifts = (log.sessions || []).map(s => {
        return s.variation ? `${s.lift} (${s.variation})` : s.lift
      })
      return lifts
    },
    summaryMeta(log) {
      const parts = []
      if (log.block) parts.push(log.block)
      if (log.week != null && log.day != null) parts.push(`${log.week}-${log.day}`)
      return parts.join(" ")
    },
    toggle(date) {
      const i = this.openDates.indexOf(date);
      if (i >= 0) this.openDates.splice(i, 1);
      else this.openDates.push(date);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.openDates = [];
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.openDates = [];
      }
    },
    copyLog(log) {
      const text = JSON.stringify(log, null, 2);
      navigator.clipboard.writeText(text);
      alert('JSONをコピーしました');
    },
    goCategory(cat) {
      const { base, variant } = parseCategory(cat)
      const query = {}
      if (variant) query.variant = variant
      this.$router.push({ path: `/category/${encodeURIComponent(base)}`, query })
    },
    confirmDelete(date) {
      if (confirm('本当に削除しますか？')) {
        this.$emit('delete-log', date)
      }
    }
  }
};
</script>
