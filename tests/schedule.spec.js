import { describe, it, expect } from 'vitest'
import { addScheduleCalcFields } from '../src/utils/schedule'

const sample = {
  blocks: [
    {
      weeks: [
        {
          days: [
            {
              sessions: [
                {
                  type: 'スクワット（メイン）',
                  sets: [{ weight: 100, reps: 5, sets: 1, percent: 80 }]
                },
                {
                  type: 'アクセサリー',
                  sets: [{ weight: 50, reps: 8, sets: 3, percent: null }]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

describe('addScheduleCalcFields', () => {
  it('calculates 1RM from percent', () => {
    addScheduleCalcFields(sample)
    const set = sample.blocks[0].weeks[0].days[0].sessions[0].sets[0]
    expect(set['1RM']).toBe(125)
  })

  it('ignores accessory session', () => {
    const set = sample.blocks[0].weeks[0].days[0].sessions[1].sets[0]
    expect(set['1RM']).toBeUndefined()
  })

  it('calculates from reps when percent missing', () => {
    const sch = {
      blocks: [{ weeks: [{ days: [{ sessions: [{ type: 'ベンチプレス（メイン）', sets: [{ weight: 100, reps: 5, sets: 1, percent: null }] }] }] }] }]
    }
    addScheduleCalcFields(sch)
    const set = sch.blocks[0].weeks[0].days[0].sessions[0].sets[0]
    expect(set['1RM']).toBe(Math.floor(100 * 5 / 40 + 100))
  })
})
