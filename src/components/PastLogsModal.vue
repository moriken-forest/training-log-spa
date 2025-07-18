<template>
  <div v-if="state.visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <h3>
          {{ state.lift }}
          <small v-if="extras">({{ extras }})</small>
        </h3>
        <button class="close-btn" @click="close">×</button>
      </header>
      <div v-for="(s, i) in state.sessions" :key="i" class="session">
        <h4 class="date" @click="goDate(s.date)">{{ s.date }}</h4>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>重量(kg)</th>
                <th>回数</th>
                <th>RPE</th>
                <th v-if="!isAccessoryType(s.type)">1RM</th>
                <th v-if="!isAccessoryType(s.type)">e1RM</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(set, si) in s.sets" :key="si">
                <td>{{ set.weight }}</td>
                <td>{{ set.reps }}</td>
                <td>{{ set.rpe }}</td>
                <td v-if="!isAccessoryType(s.type)">{{ set['1RM'] ?? '-' }}</td>
                <td v-if="!isAccessoryType(s.type)">{{ set.e1RM ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLiftModal, hideLiftModal } from '../utils/liftModal'
import { isAccessoryType } from '../utils/category'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'PastLogsModal',
  setup() {
    const state = useLiftModal()
    const router = useRouter()
    const close = () => hideLiftModal()
    const goDate = (date) => {
      hideLiftModal()
      router.push({ path: '/calendar', query: { date } })
    }
    const extras = computed(() => {
      const parts = []
      if (state.maxWeight != null) parts.push(`Max重量:${state.maxWeight}kg`)
      if (state.max1RM != null) parts.push(`Max1RM:${state.max1RM}kg`)
      return parts.join('  ')
    })
    return { state, close, goDate, extras, isAccessoryType }
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
  width: 480px;
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
.modal header h3 small {
  font-size: 0.8rem;
}
.close-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
}
.session .date {
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 4px;
}
.session .date:hover {
  color: var(--primary-light);
}
</style>
