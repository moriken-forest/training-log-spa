<template>
  <div id="listContainer">
    <!-- ログカードリスト -->
    <div
      v-for="log in pagedLogs"
      :key="log.date"
      class="log-card"
      :class="{ open: openDates.includes(log.date) }"
    >
      <div class="summary" @click="toggle(log.date)">
        <span class="date">{{ log.date }}</span>
        <span class="note">{{ log.notes || '' }}</span>
      </div>
      <div class="details">
        <div class="meta" v-if="log.block != null || (log.week != null && log.day != null)">
          <span v-if="log.block != null">ブロック: {{ log.block }}</span>
          <span v-if="log.week != null && log.day != null">Week{{ log.week }}-{{ log.day }}</span>
        </div>
        <div v-for="session in log.sessions" :key="session.lift" class="session">
          <h2>
            {{ session.lift }}
            <span v-if="session.variation"> ({{ session.variation }})</span>
            <span v-if="session.type" class="type-tag">{{ session.type }}</span>
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
                <td>{{ s.comment }}</td>
              </tr>
            </table>
          </div>
        </div>
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
    }
  },
  data() {
    return {
      currentPage: 1,
      openDates: []
    };
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
    confirmDelete(date) {
      if (confirm('本当に削除しますか？')) {
        this.$emit('delete-log', date)
      }
    }
  }
};
</script>
