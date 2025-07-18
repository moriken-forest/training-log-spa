import { reactive } from 'vue'

const state = reactive({
  visible: false,
  lift: '',
  sessions: []
})

export function showLiftModal(lift, logs = []) {
  const sessions = []
  for (const log of logs) {
    for (const sess of log.sessions || []) {
      if (sess.lift === lift) {
        sessions.push({ date: log.date, sets: sess.sets })
      }
    }
  }
  sessions.sort((a, b) => b.date.localeCompare(a.date))
  state.lift = lift
  state.sessions = sessions
  state.visible = true
}

export function hideLiftModal() {
  state.visible = false
}

export function useLiftModal() {
  return state
}
