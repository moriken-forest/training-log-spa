export function addScheduleCalcFields(sched) {
  for (const block of sched.blocks || []) {
    for (const week of block.weeks || []) {
      for (const day of week.days || []) {
        for (const session of day.sessions || []) {
          const type = session.type || ''
          const isAccessory = type.includes('アクセサリー')
          if (isAccessory) continue
          for (const set of session.sets || []) {
            const w = set.weight
            const r = set.reps
            let calc = null
            if (w != null && r != null) {
              if (type.includes('ベンチ')) {
                calc = w * r / 40 + w
              } else {
                calc = w * r / 33.3 + w
              }
            }
            set['1RM'] = calc != null ? Math.floor(calc) : null
          }
        }
      }
    }
  }
}

export function fetchSchedule(user, base = import.meta.env.BASE_URL) {
  const ts = Date.now()
  const url = `${base}schedule/${user}/training-schedule.json?ts=${ts}`
  return fetch(url, { cache: 'no-store' }).then(r => r.json())
}

