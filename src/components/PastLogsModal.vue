<template>
  <div v-if="state.visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <h3>{{ state.lift }} の過去ログ</h3>
        <button class="close-btn" @click="close">×</button>
      </header>
      <table>
        <thead>
          <tr><th>日付</th><th>セット</th></tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in state.sessions" :key="i">
            <td>{{ s.date }}</td>
            <td class="sets">{{ formatSets(s.sets) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useLiftModal, hideLiftModal } from '../utils/liftModal'
export default {
  name: 'PastLogsModal',
  setup() {
    const state = useLiftModal()
    const close = () => hideLiftModal()
    const formatSets = sets =>
      sets.map(set => {
        const w = set.weight != null ? set.weight + 'kg' : ''
        const r = set.reps != null ? set.reps + 'rep' : ''
        return [w, r].filter(Boolean).join('×')
      }).join(', ')
    return { state, close, formatSets }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}
.modal {
  background: var(--card-bg);
  color: var(--text);
  padding: var(--spacing);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px var(--shadow);
  max-height: 80vh;
  overflow-y: auto;
  width: 280px;
}
.modal header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.modal header h3 {
  margin: 0;
  font-size: 1rem;
}
.close-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
}
.modal table {
  width: 100%;
  border-collapse: collapse;
}
.modal th,
.modal td {
  padding: 4px;
  border-bottom: 1px solid var(--border);
  text-align: left;
}
.modal td.sets {
  white-space: pre-wrap;
}
</style>
