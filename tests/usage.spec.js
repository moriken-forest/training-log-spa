import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UsageGuideView from '../src/views/UsageGuideView.vue'

describe('UsageGuideView', () => {
  it('renders heading', () => {
    const wrapper = mount(UsageGuideView)
    expect(wrapper.text()).toContain('サイトの使い方')
  })
})
