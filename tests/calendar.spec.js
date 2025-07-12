import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Calendar from '../src/components/Calendar.vue';

describe('Calendar daysInMonth', () => {
  it('returns 29 for February 2024', () => {
    const wrapper = mount(Calendar);
    wrapper.vm.viewYear = 2024;
    wrapper.vm.viewMonth = 1; // February (0-based)
    expect(wrapper.vm.daysInMonth).toBe(29);
  });

  it('returns 28 for February 2023', () => {
    const wrapper = mount(Calendar);
    wrapper.vm.viewYear = 2023;
    wrapper.vm.viewMonth = 1;
    expect(wrapper.vm.daysInMonth).toBe(28);
  });
});
