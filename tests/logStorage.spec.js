import { describe, it, expect, beforeEach } from 'vitest'
import { addCalcFields, saveLog, deleteLog, getStoredLog, getStoredDates } from '../src/utils/logStorage'

const sampleLog = {
  date: '2024-01-01',
  sessions: [
    {
      type: 'ベンチプレス',
      sets: [{ weight: 100, reps: 5, rpe: 8 }]
    }
  ]
}

beforeEach(() => {
  localStorage.clear()
})

describe('addCalcFields', () => {
  it('calculates bench press 1RM and e1RM correctly', () => {
    addCalcFields(sampleLog)
    const set = sampleLog.sessions[0].sets[0]
    expect(set['1RM']).toBe(112)
    expect(set.e1RM).toBe(117)
  })
})

describe('saveLog and deleteLog', () => {
  it('saves and deletes logs in localStorage', () => {
    saveLog(sampleLog)
    expect(getStoredDates()).toEqual(['2024-01-01'])
    expect(getStoredLog('2024-01-01').date).toBe('2024-01-01')

    deleteLog('2024-01-01')
    expect(getStoredDates()).toEqual([])
    expect(getStoredLog('2024-01-01')).toBeNull()
  })
})
