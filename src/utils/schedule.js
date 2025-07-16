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
            const percent = set.percent
            let calc = null
            if (w != null && percent != null) {
              const pct = Number(percent)
              if (!Number.isNaN(pct) && pct !== 0) {
                calc = w / (pct / 100)
              }
            }
            if (calc == null && w != null && r != null) {
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
