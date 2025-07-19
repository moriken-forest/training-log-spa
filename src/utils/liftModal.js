import { reactive } from 'vue'

const state = reactive({
  visible: false,
  lift: '',
  sessions: [],
  maxWeight: null,
  max1RM: null
})

export function showLiftModal(lift, logs = []) {
  const sessions = []
  let maxWeight = null
  let max1RM = null
  for (const log of logs) {
    for (const sess of log.sessions || []) {
      if (sess.lift === lift) {
        sessions.push({
          date: log.date,
          type: sess.type,
          sets: sess.sets
        })
        for (const set of sess.sets || []) {
          if (maxWeight == null || set.weight > maxWeight) {
            maxWeight = set.weight
          }
          const oneRm = set['1RM']
          if (oneRm != null && (max1RM == null || oneRm > max1RM)) {
            max1RM = oneRm
          }
        }
      }
    }
  }
  sessions.sort((a, b) => b.date.localeCompare(a.date))
  state.lift = lift
  state.sessions = sessions
  state.maxWeight = maxWeight
  state.max1RM = max1RM
  state.visible = true
}

export function hideLiftModal() {
  state.visible = false
}

export function useLiftModal() {
  return state
}
