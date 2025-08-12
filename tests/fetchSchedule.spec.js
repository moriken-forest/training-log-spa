import { describe, it, expect, vi } from 'vitest'
import { fetchSchedule } from '../src/utils/schedule'

describe('fetchSchedule', () => {
  it('appends timestamp to avoid cache', async () => {
    const mockFetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }))
    global.fetch = mockFetch
    vi.useFakeTimers().setSystemTime(new Date('2024-01-01T00:00:00Z'))
    await fetchSchedule('alice', '')
    const url = mockFetch.mock.calls[0][0]
    expect(url).toBe('schedule/alice/training-schedule.json?ts=1704067200000')
    vi.useRealTimers()
  })
})
