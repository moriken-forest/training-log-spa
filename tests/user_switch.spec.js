import { describe, it, expect, vi } from 'vitest'
import { setUser, getUser } from '../src/utils/user'
import App from '../src/App.vue'
import { mount } from '@vue/test-utils'

describe('ユーザー切り替え', () => {
  it('clearCache後も選択したユーザーを保持する', async () => {
    // set user to tomoki
    setUser('tomoki')
    const wrapper = mount(App)
    // call clearCache
    vi.spyOn(window.location, 'reload').mockImplementation(() => {})
    await wrapper.vm.clearCache()
    expect(getUser()).toBe('tomoki')
  })
})
