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

describe('Calendar firstDay (Monday start)', () => {
  it('returns 0 when the month starts on Monday', () => {
    const wrapper = mount(Calendar);
    wrapper.vm.viewYear = 2024;
    wrapper.vm.viewMonth = 0; // January 2024 starts on Monday
    expect(wrapper.vm.firstDay).toBe(0);
  });

  it('returns 3 when February 2024 starts on Thursday', () => {
    const wrapper = mount(Calendar);
    wrapper.vm.viewYear = 2024;
    wrapper.vm.viewMonth = 1; // February 2024
    expect(wrapper.vm.firstDay).toBe(3);
  });
});
