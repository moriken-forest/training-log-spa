import { describe, it, expect } from 'vitest'
import ChatGPTGuideView from '../src/views/ChatGPTGuideView.vue'
import { mount } from '@vue/test-utils'

describe('ChatGPTGuideView', () => {
  it('provides jsonTemplate text', () => {
    const wrapper = mount(ChatGPTGuideView)
    expect(wrapper.vm.jsonTemplate).toContain('"date"')
  })
})
