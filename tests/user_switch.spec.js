import { describe, it, expect, vi } from 'vitest'
import { setUser, getUser } from '../src/utils/user'
import App from '../src/App.vue'
import { mount } from '@vue/test-utils'

describe('ユーザー切り替え', () => {
  it('clearCache後も選択したユーザーを保持する', async () => {
    setUser('tomoki')
    const reload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload },
      writable: true
    })
    const wrapper = mount(App)
    await wrapper.vm.clearCache()
    expect(getUser()).toBe('tomoki')
  })
})
