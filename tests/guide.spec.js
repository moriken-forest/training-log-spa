import { describe, it, expect, vi } from 'vitest'
import ChatGPTGuideView from '../src/views/ChatGPTGuideView.vue'
import { mount } from '@vue/test-utils'

describe('ChatGPTGuideView', () => {
  it('provides jsonTemplate text', () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ blocks: [] }) })
    )
    const wrapper = mount(ChatGPTGuideView)
    expect(wrapper.vm.jsonTemplate).toContain('"date"')
  })
})
